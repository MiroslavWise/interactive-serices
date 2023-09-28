"use client"

import { useQuery } from "react-query"

import type { TPeoples } from "./types/types"

// import { PeopleCard } from "@/components/common/PeopleCard/ServiceBanner"
import { MotionUL } from "@/components/common/Motion"
import { GeneralServiceAllItem } from "@/components/common/Card"

import { serviceOffer } from "@/services/offers"
import { MOCKS_SERVICES } from "@/mocks/components/auth/constants"
// import { serviceProfile } from "@/services/profile"

import styles from "./styles/style.module.scss"

export const Peoples: TPeoples = ({ setDataAndActive }) => {
    const { data } = useQuery({
        queryKey: ["offers"],
        queryFn: () => serviceOffer.get(),
    })

    const { ok, res } = data ?? {}

    return (
        <MotionUL classNames={[styles.peoples]}>
            {ok &&
                res?.map((item) => (
                    <GeneralServiceAllItem
                        key={`${item.id}-all-item-service`}
                        {...item}
                    />
                ))}
        </MotionUL>
    )
}
