import Link from "next/link"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useCallback, useState } from "react"

import type { IReturnData } from "@/services/types/general"
import type { IPostDataBarter } from "@/services/barters/types"
import type { IPostOffers, IResponseCreate } from "@/services/offers/types"

import { ItemOffer } from "./components/ItemOffer"
import { ItemProfile } from "./components/ItemProfile"
import { Button, ButtonClose } from "@/components/common"
import { ItemImages } from "../Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import { transliterateAndReplace } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { ICON_OBJECT_OFFERS } from "@/lib/icon-set"
import { serviceNotifications, serviceBarters, serviceOffers, serviceUser } from "@/services"
import {
    useReciprocalExchange,
    dispatchReciprocalExchange,
    useOffersCategories,
    useAuth,
    dispatchBallonOffer,
    dispatchReciprocalExchangeCollapse,
} from "@/store"
import { useWebSocket } from "@/context"

import styles from "./styles/style.module.scss"
import dayjs from "dayjs"

export const ReciprocalExchange = () => {
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)
    const offer = useReciprocalExchange(({ offer }) => offer)
    const visible = useReciprocalExchange(({ visible }) => visible)
    const isCollapse = useReciprocalExchange(({ isCollapse }) => isCollapse)
    const categories = useOffersCategories(({ categories }) => categories)
    const userId = useAuth(({ userId }) => userId)
    const { socket } = useWebSocket()
    const { on, onBarters } = useToast()
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

    const { data, isLoading } = useQuery({
        queryFn: () => serviceOffers.getUserId(userId!, { provider: "offer", order: "DESC" }),
        queryKey: ["offers", `user=${userId}`, `provider=offer`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUser.getId(offer?.userId!),
        queryKey: ["user", offer?.userId!],
        enabled: !!offer?.userId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    //---
    const { refetch } = useQuery({
        queryFn: () => serviceNotifications.get({ order: "DESC" }),
        queryKey: ["notifications", `user=${userId}`],
        enabled: false,
    })
    //---

    const { res } = dataUser ?? {}
    const { profile } = res ?? {}

    async function submit(values: IFormValues) {
        if (!values.my_offer && !values.description) {
            setError("description", { message: "Введите описание (минимум 5 симвоволов)" })
            setError("root", { message: "Вы не выбрали то, что хотите предложить взамен" })
            return
        }

        if (!loading) {
            setLoading(true)

            const dataNewOffer: IPostOffers = {
                categoryId: watch("category"),
                provider: "offer",
                title: values.description,
                slug: transliterateAndReplace(values.description),
                enabled: true,
                desired: true,
            }

            const socketWith = (idBarter: number) => {
                socket?.emit("barter", {
                    receiverIds: [offer?.userId!],
                    message: `Вам пришла заявка на предложение`,
                    barterId: idBarter,
                    emitterId: userId!,
                    status: "initiated",
                    created: new Date(),
                })
            }

            Promise.all([
                !values.my_offer && values.description ? serviceOffers.post(dataNewOffer) : Promise.resolve({ ok: true, res: { id: values?.my_offer! } }),
            ]).then((response: [IReturnData<IResponseCreate>]) => {
                if (response?.[0]?.ok) {
                    const title = `-${response[0]?.res?.id!}:initiatorUserId:${userId}:consignedUserId:${offer?.userId}:time:${dayjs().format(
                        "HH:mm:ss_DD.MM.YY",
                    )}`

                    const dataBarter: IPostDataBarter = {
                        provider: "barter",
                        title: title,
                        initialId: response[0]?.res?.id!, //number
                        consignedId: offer?.id!, //number
                        status: "initiated",
                        enabled: true,
                        addresses: offer?.addresses?.map((item) => item.id), //[number]
                    }

                    serviceBarters.post(dataBarter).then((response) => {
                        console.log("%c ---OFFERS BARTERS---", "color: cyan", response)
                        if (response?.ok) {
                            const message = `${profile?.firstName || ""} ${profile?.lastName || ""} получила ваше предложение. Мы сообщим вам об её ответе.`
                            flushSync(() => {
                                socketWith(response?.res?.id!)
                                refetch()
                                flushSync(() => {
                                    onBarters({
                                        title: "Предложение на обмен отправлено",
                                        message: message,
                                        status: "initiated",
                                    })
                                    setLoading(false)
                                    dispatchReciprocalExchange({ visible: false, offer: undefined })
                                    dispatchBallonOffer({ visible: false })
                                })
                            })
                        } else {
                            on({
                                message: `Обмен с ${profile?.firstName} не может произойти. У нас какая-то ошибка создания. Мы работаем над исправлением`,
                            })
                            setError("root", { message: response?.error?.message })
                            setLoading(false)
                        }
                    })
                } else {
                    setError("root", { message: response?.[0]?.error?.message! })
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
        if (!!watch("category") && data?.res) {
            return data?.res?.filter((item) => item?.categoryId === watch("category"))?.filter((item) => item?.addresses?.length > 0)
        }
        return data?.res?.filter((item) => item?.addresses?.length > 0) || []
    }, [data?.res, watch("category")])

    if (isCollapse) {
        return <div></div>
    }

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section data-section-modal>
                <ButtonClose
                    position={{}}
                    onClick={() => {
                        if (loading) {
                            return
                        }
                        dispatchReciprocalExchange({ visible: false, offer: undefined })
                    }}
                />
                <header>
                    <h3>Что вы можете предложить?</h3>
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
                                        Это категории, интересные для <span>{profile?.firstName || profile?.lastName || "Пользователя"}</span>. Выберите
                                        категорию для обмена, по которой у вас есть предложение
                                    </p>
                                    <div data-wants {...register("category")}>
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
                                                        src={
                                                            ICON_OBJECT_OFFERS.hasOwnProperty(item.id!)
                                                                ? ICON_OBJECT_OFFERS[item.id!]
                                                                : ICON_OBJECT_OFFERS.default
                                                        }
                                                        alt={`${item.id!}`}
                                                        width={16}
                                                        height={16}
                                                        onError={(error: any) => {
                                                            if (error?.target) {
                                                                try {
                                                                    error.target.src = `/svg/category/default.svg`
                                                                } catch (e) {
                                                                    console.log("catch e: ", e)
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <span>{item.title}</span>
                                                {watch("category") === item.id ? <img src="/svg/x-close-white.svg" alt="x" width={16} height={16} /> : null}
                                            </a>
                                        ))}
                                    </div>
                                </fieldset>
                                {!watch("my_offer") && !!watch("category") ? (
                                    <fieldset>
                                        <p>Опишите, что именно вы можете предложить</p>
                                        <div data-text-area>
                                            <textarea
                                                {...register("description", { required: !watch("my_offer"), minLength: 5 })}
                                                placeholder="Описание предложения..."
                                            />
                                            <sup>{watch("description")?.length || 0}/400</sup>
                                        </div>
                                        {errors.description ? <i>{errors?.description?.message}</i> : null}
                                    </fieldset>
                                ) : null}
                                {offersMy?.length > 0 || isLoading ? (
                                    <div
                                        data-expand
                                        data-active={expand}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            if (loading || isLoading) {
                                                return
                                            }
                                            setExpand((prev) => !prev)
                                        }}
                                        data-is-loading={isLoading}
                                    >
                                        <span>Или предложите из своих ранее созданных</span>
                                        <img
                                            src={isLoading ? "/svg/spinner.svg" : "/svg/chevron-down-primary.svg"}
                                            data-loading-image={isLoading}
                                            alt="down"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                ) : null}
                                {expand ? (
                                    <div data-my-offers {...register("my_offer", { required: offersMy?.length > 0 })}>
                                        {offersMy?.length > 0
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
                                                                  alt={`${item.id!}::`}
                                                                  width={16}
                                                                  height={16}
                                                                  src={
                                                                      ICON_OBJECT_OFFERS.hasOwnProperty(item.categoryId!)
                                                                          ? ICON_OBJECT_OFFERS[item.categoryId!]
                                                                          : ICON_OBJECT_OFFERS.default
                                                                  }
                                                                  onError={(error: any) => {
                                                                      if (error?.target) {
                                                                          try {
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
                            </div>
                            {!!errors?.root ? <i data-error>{errors?.root?.message}</i> : null}
                        </section>
                        <footer>
                            <Button
                                type="submit"
                                typeButton="fill-primary"
                                label="Предложить обмен"
                                loading={loading}
                                suffixIcon={<img src="/svg/repeat-white.svg" alt="repeat" height={24} width={24} />}
                                disabled={!watch("my_offer") && !watch("description")}
                            />
                            <Link
                                href={{
                                    pathname: "/messages",
                                    query: {
                                        user: offer?.userId,
                                    },
                                }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    dispatchReciprocalExchangeCollapse(true)
                                }}
                            >
                                <img src="/svg/message-dots-circle.svg" alt="dots" width={24} height={24} />
                            </Link>
                        </footer>
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
