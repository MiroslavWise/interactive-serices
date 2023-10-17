"use client"

import { useState } from "react"
import { useQueries } from "react-query"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { IValueServices } from "../types/types"
import type { TContainerServices } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { ButtonRadio } from "@/components/common/Buttons"
import { CardRequestsAndProposals } from "@/components/common/Card"

import { cx } from "@/lib/cx"
import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const ContainerServices: TContainerServices = ({}) => {
    const [value, setValue] = useState<IValueServices>("proposals")
    const id = useSearchParams().get("id")

    const [{ data: dataOffer }, { data: dataRequest }] = useQueries([
        {
            queryFn: () =>
                serviceOffers.getUserId(Number(id), { provider: "offer" }),
            queryKey: ["offers", `user=${Number(id)}`, "provider=offer"],
        },
        {
            queryFn: () =>
                serviceOffers.getUserId(Number(id), { provider: "request" }),
            queryKey: ["offers", `user=${Number(id)}`, "provider=request"],
        },
    ])

    return (
        <section
            className={cx(styles.containerServices, isMobile && styles.mobile)}
        >
            <div className={styles.tabs}>
                <ButtonRadio
                    label="Предложения"
                    active={value === "proposals"}
                    onClick={() => setValue("proposals")}
                />
                <ButtonRadio
                    label="Запросы"
                    active={value === "requests"}
                    onClick={() => setValue("requests")}
                />
            </div>
            <MotionUL
                classNames={[
                    styles.containerRequestsAndProposals,
                    isMobile && styles.mobile,
                ]}
            >
                {value === "proposals"
                    ? Array.isArray(dataOffer?.res)
                        ? dataOffer?.res?.map((item) => (
                              <CardRequestsAndProposals
                                  key={`${item?.id}-item-key-offer`}
                                  {...item}
                                  type="optional-3"
                              />
                          ))
                        : null
                    : null}
                {value === "requests"
                    ? Array.isArray(dataRequest?.res)
                        ? dataRequest?.res?.map((item) => (
                              <CardRequestsAndProposals
                                  key={`${item?.id}-item-key-offer`}
                                  {...item}
                                  type="optional-2"
                              />
                          ))
                        : null
                    : null}
            </MotionUL>
        </section>
    )
}
