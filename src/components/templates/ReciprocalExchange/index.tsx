import { useMemo, type SyntheticEvent, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { IPostDataBarter } from "@/services/barters/types"

import { ItemOffer } from "./components/ItemOffer"
import { ItemProfile } from "./components/ItemProfile"
import { Button, ButtonClose } from "@/components/common"
import { ItemImages } from "../BallonOffer/components/ItemImages"

import { cx } from "@/lib/cx"
import { serviceUsers } from "@/services/users"
import { serviceOffers } from "@/services/offers"
import { serviceBarters } from "@/services/barters"
import { useToast } from "@/helpers/hooks/useToast"
import { useReciprocalExchange, dispatchReciprocalExchange, useOffersCategories, useAuth, dispatchBallonOffer } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ReciprocalExchange = () => {
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)
    const [createNew, setCreateNew] = useState(false)
    const offer = useReciprocalExchange(({ offer }) => offer)
    const visible = useReciprocalExchange(({ visible }) => visible)
    const categories = useOffersCategories(({ categories }) => categories)
    const userId = useAuth(({ userId }) => userId)
    const { on } = useToast()
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm<IFormValues>({
        defaultValues: {},
    })

    const { data } = useQuery({
        queryFn: () => serviceOffers.getUserId(userId!, { provider: "offer", order: "DESC" }),
        queryKey: ["offers", `user=${userId}`, `provider=offer`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(offer?.userId!),
        queryKey: ["user", offer?.userId!],
        enabled: !!offer?.userId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const { res } = dataUser ?? {}
    const { profile } = res ?? {}

    function submit(values: IFormValues) {
        if (!values.my_offer) {
            setError("root", { message: "Вы не выбрали то, что хотите предложить взамен" })
            return
        }
        if (!loading) {
            setLoading(true)
            const dataBarter: IPostDataBarter = {
                provider: "barter",
                title: offer?.title!,
                initialId: values.my_offer!,
                consignedId: offer?.id!,
                status: "initiated",
                enabled: true,
                addresses: offer?.addresses?.map((item) => item.id),
            }

            serviceBarters.post(dataBarter).then((response) => {
                console.log("%c ---OFFERS BARTERS---", "color: cyan", response)
                if (response?.ok) {
                    on({
                        message: `${profile?.firstName} получит ваше предложение на обмен!`,
                    })
                    dispatchReciprocalExchange({ visible: false })
                    dispatchBallonOffer({ visible: false })
                    setLoading(false)
                } else {
                    on({
                        message: `Обмен с ${profile?.firstName} не может произойти. У нас какая-то ошибка создания. Мы работаем над исправлением`,
                    })
                    setError("root", { message: response?.error?.message })
                    setLoading(false)
                }
            })
        }
    }

    const onSubmit = handleSubmit(submit)

    const geo = offer?.addresses?.[0]

    const categoriesWants = categories?.filter((item) => offer?.categories?.includes(item?.id!))
    const categoryMyOffer = useCallback((id: number) => categories?.find((item) => item?.id === id!), [categories])

    const categoryMyIds = data?.res?.map((item) => item?.categoryId) || []

    const offersMy = useMemo(() => {
        if (!watch("category")) {
            return data?.res || []
        } else if (watch("category") && data?.res) {
            return data?.res?.filter((item) => item?.categoryId === watch("category"))
        } else {
            return []
        }
    }, [data?.res, watch("category")])

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section>
                <ButtonClose
                    position={{}}
                    onClick={() => {
                        if (loading) {
                            return
                        }
                        dispatchReciprocalExchange({ visible: false })
                    }}
                />
                <header>
                    <h3>Выберите параметры обмена</h3>
                </header>
                <ul>
                    <form onSubmit={onSubmit}>
                        <section>
                            <ItemProfile profile={profile!} geo={geo!} />
                            <ItemOffer />
                        </section>
                        <section>
                            <h4>Ваше предложение</h4>
                            <div data-selection>
                                <fieldset>
                                    <p>
                                        Это категории, интересные для{" "}
                                        <span>{profile?.firstName || profile?.lastName || "Пользователя"}</span>. Выберите категорию для
                                        обмена, по которой у вас есть предложение
                                    </p>
                                    <div data-wants {...register("category", { required: true })}>
                                        {categoriesWants?.map((item) => (
                                            <a
                                                key={`::${item?.id}::want::`}
                                                data-active={watch("category") === item.id}
                                                data-exist={categoryMyIds?.includes(item?.id)}
                                                onClick={(event) => {
                                                    if (loading) {
                                                        return
                                                    }
                                                    event.stopPropagation()
                                                    if (watch("category") !== item.id) {
                                                        setValue("category", item.id)
                                                    } else {
                                                        setValue("category", undefined)
                                                    }
                                                }}
                                            >
                                                <div data-img>
                                                    <img
                                                        src={`/svg/category/${item.id}.svg`}
                                                        alt={`${item.id!}`}
                                                        width={16}
                                                        height={16}
                                                        onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                                                            if (error?.target) {
                                                                try {
                                                                    //@ts-ignore
                                                                    error.target.src = `/svg/category/default.svg`
                                                                } catch (e) {
                                                                    console.log("catch e: ", e)
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <span>{item.title}</span>
                                                {watch("category") === item.id ? (
                                                    <img src="/svg/x-close-white.svg" alt="x" width={16} height={16} />
                                                ) : null}
                                            </a>
                                        ))}
                                    </div>
                                    {/* {offersMy?.length > 0 ? (
                                        <div
                                            data-expand
                                            data-active={expand}
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                if (loading) {
                                                    return
                                                }
                                                setExpand((prev) => !prev)
                                            }}
                                        >
                                            <span>Мои предложения</span>
                                            <img src="/svg/chevron-down.svg" alt="down" width={16} height={16} />
                                        </div>
                                    ) : null} */}
                                    {true ? (
                                        <div data-my-offers {...register("my_offer", { required: offersMy?.length > 0 })}>
                                            {!!watch("category") && offersMy?.length > 0
                                                ? offersMy?.map((item) => (
                                                      <a
                                                          key={`::${item.id}::my::offer::`}
                                                          data-active={watch("my_offer") === item.id}
                                                          onClick={(event) => {
                                                              if (loading) {
                                                                  return
                                                              }
                                                              event.stopPropagation()
                                                              if (watch("my_offer") !== item.id) {
                                                                  setValue("my_offer", item.id)
                                                              } else {
                                                                  setValue("my_offer", undefined)
                                                              }
                                                          }}
                                                      >
                                                          <div data-category>
                                                              <div data-img>
                                                                  <img
                                                                      src={`/svg/category/${item.categoryId}.svg`}
                                                                      alt={`${item.id!}::`}
                                                                      width={16}
                                                                      height={16}
                                                                      onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                                                                          if (error?.target) {
                                                                              try {
                                                                                  //@ts-ignore
                                                                                  error.target.src = `/svg/category/default.svg`
                                                                              } catch (e) {
                                                                                  console.log("catch e: ", e)
                                                                              }
                                                                          }
                                                                      }}
                                                                  />
                                                              </div>
                                                              <span>{categoryMyOffer(item.categoryId!)?.title || ""}</span>
                                                          </div>
                                                          <p>{item.title}</p>
                                                          {item?.images?.length > 0 ? <ItemImages images={item?.images} /> : null}
                                                      </a>
                                                  ))
                                                : null}
                                        </div>
                                    ) : null}
                                </fieldset>
                                {/* {!!watch("category") && !createNew ? (
                                    <div
                                        data-expand
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            if (loading) {
                                                return
                                            }
                                            setCreateNew(true)
                                        }}
                                    >
                                        <span data-primary>Создать новое</span>
                                        <img src="/svg/plus-primary.svg" alt="plus" width={16} height={16} />
                                    </div>
                                ) : null}
                                {createNew ? (
                                    <fieldset>
                                        <p>Опишите, что именно вы можете предложить</p>
                                        <div data-text-area>
                                            <textarea
                                                {...register("description", { required: true })}
                                                placeholder="Описание предложения..."
                                            />
                                            <sup>{watch("description")?.length || 0}/400</sup>
                                        </div>
                                    </fieldset>
                                ) : null} */}
                            </div>
                            {!!errors?.root ? <i data-error>{errors?.root?.message}</i> : null}
                        </section>
                        <Button
                            type="submit"
                            typeButton="fill-primary"
                            label="Предложить обмен"
                            loading={loading}
                            suffixIcon={<img src="/svg/repeat-white.svg" alt="repeat" height={24} width={24} />}
                        />
                    </form>
                </ul>
            </section>
        </div>
    )
}

interface IFormValues {
    description: string
    category?: number
    my_offer?: number
}
