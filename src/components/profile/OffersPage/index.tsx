"use client"

import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { ContainerHeader } from "./components/ContainerHeader"
import { ContainerOffersNow } from "./components/ContainerOffersNow"
import { MobileSegments } from "./components/MobileSegments"

import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"

import styles from "./styles/style.module.scss"

export const OffersPage = () => {
    const { userId } = useAuth()
    const { data } = useQuery({
        queryFn: () =>
            serviceBarters.getReceiverId(userId!, { status: "initiated" }),
        queryKey: ["barters", `receiver=${userId}`, `status=initiated`],
    })

    return isMobile ? (
        <ul className="p-top-5 p-left-5 p-right-5 p-bottom-14 w-100 h-100">
            <MobileSegments />
            <ContainerHeader total={data?.res?.length || 0} />
            <ContainerOffersNow data={data?.res!} />
        </ul>
    ) : (
        <ul className={styles.containerOffersPage}>
            <ContainerHeader total={data?.res?.length || 0} />
            <ContainerOffersNow data={data?.res!} />
        </ul>
    )
}
