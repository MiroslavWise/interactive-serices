"use client"

import { RefObject, useEffect, useMemo, useRef, useState } from "react"
import { useQuery } from "react-query"
import Image from "next/image"
import type { TContent } from "../types/types"

import { ButtonFill } from "@/components/common/Buttons"
import { ImageStatic } from "@/components/common/Image"
import { CustomDatePicker } from "@/components/common/custom"

import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/style.module.scss"

export const ContentTitleCarousel: TContent = ({
    register,
    setValue,
    watch,
    address,
}) => {
    const { dataOffer, isVisible } = useVisibleModalBarter()
    const { userId } = useAuth()
    const { categories } = useOffersCategories()
    const refUL: RefObject<HTMLUListElement> = useRef(null)
    const [left, setLeft] = useState(0)
    const { data } = useQuery({
        queryFn: () =>
            serviceOffer.getUserId(userId!, {
                provider: dataOffer?.provider === "offer" ? "request" : "offer",
            }),
        queryKey: [
            "offers",
            `user=${userId}`,
            `provider=${dataOffer?.provider === "offer" ? "request" : "offer"}`,
        ],
    })

    const widthUL: number = useMemo(() => {
        if (!data?.res) {
            return 0
        }
        return data?.res?.length * 280 + data?.res?.length * 16 + 16
    }, [data?.res])

    function handleCarousel(value: boolean) {
        if (refUL.current) {
            let width = Number(refUL.current.style.width?.replace("px", ""))
            let x: string | number = Number(
                refUL.current.style.left?.replace("px", ""),
            )

            refUL.current.onscroll = (event) => {
                event.preventDefault()
                event.stopPropagation()

                console.log("event: ", event)
            }

            if (value) {
                //+++
                if (left < 0) setLeft((prev) => prev + 100)
            } else {
                //---
                if (Math.abs(left) < width - 280 * 2)
                    setLeft((prev) => prev - 100)
            }

            console.log("x: ", x)
            console.log("width: ", width)
        }
    }

    return (
        <section className={styles.containerTitleCarousel}>
            <h2>Пожалуйста, выберите параметры бартера</h2>
            <div
                className={styles.itemBarterContainerDIV}
                {...register("offerMyId", { required: true })}
            >
                <ul style={{ width: widthUL, left: left }} ref={refUL}>
                    {data?.res
                        ? data?.res?.map((item) => (
                              <li
                                  data-provider={item.provider}
                                  data-active={watch("offerMyId") == item.id}
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
                <div data-right-shadow onClick={() => handleCarousel(false)}>
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
            <div className={styles.barterContainer}>
                <div
                    className={styles.itemBarterContainer}
                    {...register("date", { required: false })}
                >
                    <p>Предлагаю</p>
                    <CustomDatePicker
                        setDate={(value) => setValue("date", value)}
                    />
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
