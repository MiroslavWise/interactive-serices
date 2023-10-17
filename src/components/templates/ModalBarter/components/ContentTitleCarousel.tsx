"use client"

import { RefObject, useEffect, useMemo, useRef, useState } from "react"
import { useQuery } from "react-query"
import Image from "next/image"
import type { TContent } from "../types/types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { ImageStatic } from "@/components/common/Image"
import { CustomDatePicker } from "@/components/common/custom"

import { useAuth, useUpdateProfile, useVisibleModalBarter } from "@/store/hooks"
import { serviceOffers } from "@/services/offers"
import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/style.module.scss"
import { useAddress } from "@/helpers"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

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
    const { categories } = useOffersCategories()
    const { setVisible } = useUpdateProfile()
    const { dispatchVisibleTypeCreateOptionals, isVisible: isCreateVisible } =
        useAddCreateModal()
    const refUL: RefObject<HTMLUListElement> = useRef(null)
    const [left, setLeft] = useState(0)
    const { data, refetch } = useQuery({
        queryFn: () =>
            serviceOffers.getUserId(userId!, {
                provider: dataOffer?.provider === "offer" ? "request" : "offer",
            }),
        queryKey: [
            "offers",
            `user=${userId}`,
            `provider=${dataOffer?.provider === "offer" ? "request" : "offer"}`,
        ],
        enabled: !!userId && !!dataOffer?.provider && isVisible,
    })

    const widthUL: number = useMemo(() => {
        if (!data?.res) {
            return 0
        }
        return data?.res?.length * 280 + data?.res?.length * 16 + 16
    }, [data?.res])

    function handleCarousel(value: boolean) {
        if (refUL.current) {
            refUL.current.onscroll = (event) => {
                event.preventDefault()
                event.stopPropagation()

                console.log("event: ", event)
            }

            if (value) {
                if (left < 0) setLeft((prev) => prev + 250)
            } else {
                if (Math.abs(left) < widthUL - 280 * 2)
                    setLeft((prev) => prev - 250)
            }
        }
    }

    function updateProfileOffers() {
        if (!isAddresses) {
            setVisible(true)
            return
        }
        if (isAddresses) {
            if (dataOffer?.provider === "offer") {
                dispatchVisibleTypeCreateOptionals({
                    visible: true,
                    type: "request",
                })
            }
            if (dataOffer?.provider === "request") {
                dispatchVisibleTypeCreateOptionals({
                    visible: true,
                    type: "offer",
                })
            }
        }
    }

    useEffect(() => {
        if (
            typeof isCreateVisible !== "undefined" &&
            isCreateVisible === false
        ) {
            requestAnimationFrame(() => {
                refetch()
            })
        }
    }, [isCreateVisible, refetch])

    return (
        <section className={styles.containerTitleCarousel}>
            <h2>Пожалуйста, выберите параметры бартера</h2>
            {data?.res?.length ? (
                <div
                    className={styles.itemBarterContainerDIV}
                    {...register("offerMyId", { required: true })}
                >
                    <ul
                        style={{ width: widthUL, left: left }}
                        ref={refUL}
                        onScroll={(event) => {
                            console.log("onScroll event: ", event)
                        }}
                    >
                        {data?.res
                            ? data?.res?.map((item) => (
                                  <li
                                      data-provider={item.provider}
                                      data-active={
                                          watch("offerMyId") == item.id
                                      }
                                      key={`${item.id}-offer-${item.provider}`}
                                      onClick={() => {
                                          setValue("offerMyId", item.id!)
                                      }}
                                  >
                                      <ImageStatic
                                          src="/map/circle-offers-default.png"
                                          alt="offer"
                                          width={58}
                                          height={58}
                                      />
                                      <h3>
                                          {
                                              categories?.find(
                                                  (item_) =>
                                                      Number(item_.id) ===
                                                      Number(item?.categoryId),
                                              )?.title
                                          }
                                      </h3>
                                  </li>
                              ))
                            : null}
                    </ul>
                    <div
                        data-right-shadow
                        onClick={() => handleCarousel(false)}
                    >
                        <div>
                            <Image
                                src="/svg/chevron-right-white.svg"
                                alt="chevron-right-white"
                                width={16}
                                height={16}
                            />
                        </div>
                    </div>
                    <div data-left-shadow onClick={() => handleCarousel(true)}>
                        <div>
                            <Image
                                src="/svg/chevron-left-white.svg"
                                alt="chevron-left-white"
                                width={16}
                                height={16}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    data-create
                    data-error={errors.offerMyId}
                    {...register("offerMyId", { required: true })}
                >
                    <div>
                        <h3>
                            У вас нет созданных{" "}
                            {dataOffer?.provider === "offer"
                                ? "запросов"
                                : "предложений"}
                        </h3>
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
                                    : `Добавить ${
                                          dataOffer?.provider === "offer"
                                              ? "запрос"
                                              : "предложение"
                                      }`
                            }
                        />
                    </div>
                </div>
            )}
            {errors?.offerMyId ? (
                <i>Выберите услугу, которую вы хотите предложить взамен</i>
            ) : null}
            <div className={styles.barterContainer}>
                <div
                    className={styles.itemBarterContainer}
                    {...register("date", { required: true })}
                >
                    <p>Предлагаю</p>
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
