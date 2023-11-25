"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import type { TContent } from "../types/types"

import { Button } from "@/components/common"

import { useAddress } from "@/helpers"
import { serviceOffers } from "@/services/offers"
import { ListOffersBarter } from "@/components/common/ListOffersBarter"
import {
    useAuth,
    useUpdateProfile,
    useVisibleModalBarter,
    useAddCreateModal,
} from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ContentTitleCarousel: TContent = ({
    register,
    setValue,
    watch,
    address,
    errors,
}) => {
    const { dataOffer, isVisible } = useVisibleModalBarter((_) => ({
        dataOffer: _.dataOffer,
        isVisible: _.isVisible,
    }))
    const { isAddresses } = useAddress()
    const { userId } = useAuth((_) => ({ userId: _.userId }))
    const { setVisible } = useUpdateProfile((_) => ({
        setVisible: _.setVisible,
    }))
    const { dispatchVisibleTypeCreateOptionals } = useAddCreateModal((_) => ({
        dispatchVisibleTypeCreateOptionals:
            _.dispatchVisibleTypeCreateOptionals,
    }))
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
            <h2 {...register("offerMyId", { required: true })}>
                Пожалуйста, выберите параметры обмена
            </h2>
            {data?.res?.length ? (
                <ListOffersBarter
                    active={watch("offerMyId")!}
                    items={data?.res}
                    onClick={(value) => {
                        setValue("offerMyId", value as number)
                    }}
                />
            ) : (
                <div data-create data-error={errors.offerMyId}>
                    <div>
                        <h3>У вас нет созданных предложений</h3>
                        {!isAddresses ? (
                            <h4>
                                У вас нет адреса, поэтому, для начала добавьте в
                                профиле его!
                            </h4>
                        ) : null}
                        <Button
                            type="submit"
                            typeButton="regular-primary"
                            label={
                                !isAddresses
                                    ? "Добавить адрес"
                                    : `Добавить предложение`
                            }
                            onClick={updateProfileOffers}
                        />
                    </div>
                </div>
            )}
            {errors?.offerMyId ? (
                <i>Выберите услугу, которую вы хотите предложить взамен</i>
            ) : null}
            <div className={styles.barterContainer} data-time-address>
                <div className={styles.itemBarterContainer}>
                    <p>По адресу</p>
                    <i>{address}</i>
                </div>
            </div>
            <div className={styles.button}>
                <Button
                    type="submit"
                    typeButton="fill-primary"
                    label="Предложить обмен"
                    suffixIcon={
                        <Image
                            src="/svg/arrow-right.svg"
                            alt="arrow-right"
                            width={24}
                            height={24}
                            unoptimized
                        />
                    }
                />
            </div>
        </section>
    )
}
