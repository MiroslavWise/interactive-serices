"use client"

import Image from "next/image"
import { useQuery } from "react-query"

import type { TContent } from "../types/types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { CustomDatePicker } from "@/components/common/custom"

import { useAddress } from "@/helpers"
import { serviceOffers } from "@/services/offers"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"
import { ListOffersBarter } from "@/components/common/ListOffersBarter"
import { useAuth, useUpdateProfile, useVisibleModalBarter } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ContentTitleCarousel: TContent = ({
    register,
    setValue,
    watch,
    address,
    errors,
}) => {
    const { dataOffer, isVisible } = useVisibleModalBarter()
    const { isAddresses } = useAddress()
    const { userId } = useAuth()
    const { setVisible } = useUpdateProfile()
    const { dispatchVisibleTypeCreateOptionals } = useAddCreateModal()
    const { data } = useQuery({
        queryFn: () =>
            serviceOffers.getUserId(userId!, {
                provider: "offer",
                order: "DESC",
            }),
        queryKey: ["offers", `user=${userId}`, `provider=offer`],
        enabled: !!userId && !!dataOffer?.provider && isVisible,
    })

    function updateProfileOffers() {
        if (!isAddresses) {
            setVisible(true)
            return
        }
        if (isAddresses) {
            dispatchVisibleTypeCreateOptionals({
                visible: true,
                type: "offer",
            })
        }
    }

    return (
        <section className={styles.containerTitleCarousel}>
            <h2>Пожалуйста, выберите параметры бартера</h2>
            {data?.res?.length ? (
                <ListOffersBarter
                    {...register("offerMyId", { required: true })}
                    active={watch("offerMyId")!}
                    items={data?.res}
                    onClick={(value) => {
                        setValue("offerMyId", value as number)
                    }}
                />
            ) : (
                <div
                    data-create
                    data-error={errors.offerMyId}
                    {...register("offerMyId", { required: true })}
                >
                    <div>
                        <h3>У вас нет созданных предложений</h3>
                        {!isAddresses ? (
                            <h4>
                                У вас нет адреса, поэтому, для начала добавьте в
                                профиле его!
                            </h4>
                        ) : null}
                        <ButtonDefault
                            handleClick={updateProfileOffers}
                            submit="button"
                            label={
                                !isAddresses
                                    ? "Добавить адрес"
                                    : `Добавить предложение`
                            }
                        />
                    </div>
                </div>
            )}
            {errors?.offerMyId ? (
                <i>Выберите услугу, которую вы хотите предложить взамен</i>
            ) : null}
            <div className={styles.barterContainer} data-time-address>
                <div
                    className={styles.itemBarterContainer}
                    {...register("date", { required: true })}
                >
                    <p>Дата обмена</p>
                    <CustomDatePicker
                        setDate={(value) => setValue("date", value)}
                    />
                    {errors?.date ? <span>Выберите дату</span> : null}
                    <p>По адресу</p>
                    <i>{address}</i>
                </div>
            </div>
            <div className={styles.button}>
                <ButtonFill
                    submit="submit"
                    type="primary"
                    label="Предложить бартер"
                    suffix={
                        <Image
                            src="/svg/arrow-right.svg"
                            alt="arrow-right"
                            width={24}
                            height={24}
                        />
                    }
                />
            </div>
        </section>
    )
}
