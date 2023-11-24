"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import type { TContent } from "../types/types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { useAddress } from "@/helpers"
import { serviceOffers } from "@/services/offers"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"
import { ListOffersBarter } from "@/components/common/ListOffersBarter"
import { useAuth, useUpdateProfile, useVisibleModalBarter } from "@/store/hooks"
import { GroupSelectorDate } from "./GroupSelectorDate"

import styles from "./styles/style.module.scss"
import { Button } from "@/components/common"

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
                        />
                    }
                />
            </div>
        </section>
    )
}
