import { type SyntheticEvent } from "react"
import { useForm } from "react-hook-form"

import { ItemProfile } from "./components/ItemProfile"
import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { useReciprocalExchange, dispatchReciprocalExchange, useOffersCategories } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ReciprocalExchange = () => {
    const offer = useReciprocalExchange(({ offer }) => offer)
    const visible = useReciprocalExchange(({ visible }) => visible)
    const profile = useReciprocalExchange(({ profile }) => profile)
    const categories = useOffersCategories(({ categories }) => categories)
    const {
        reset,
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>({
        defaultValues: {},
    })

    function submit(values: IFormValues) {}

    const onSubmit = handleSubmit(submit)

    const geo = offer?.addresses?.[0]

    const categoriesWants = categories?.filter((item) => offer?.categories?.includes(item?.id!))

    console.log("categoriesWants: ", categoriesWants)

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section>
                <ButtonClose position={{}} onClick={() => dispatchReciprocalExchange({ visible: false })} />
                <header>
                    <h3>Выберите параметры обмена</h3>
                </header>
                <ul>
                    <form onSubmit={onSubmit}>
                        <section>
                            <ItemProfile profile={profile!} geo={geo!} />
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
                                    <div data-wants>
                                        {categoriesWants?.map((item) => (
                                            <a key={`::${item?.id}::want::`}>
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
                                            </a>
                                        ))}
                                    </div>
                                </fieldset>
                                {/* <fieldset>
                                    <p>Опишите, что именно вы можете предложить</p>
                                    <div data-text-area>
                                        <textarea {...register("description", { required: true })} placeholder="Описание предложения..." />
                                        <sup>{watch("description")?.length || 0}/400</sup>
                                    </div>
                                </fieldset> */}
                            </div>
                        </section>
                        <Button
                            type="submit"
                            typeButton="fill-primary"
                            label="Предложить обмен"
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
}
