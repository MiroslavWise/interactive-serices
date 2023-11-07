"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useQueries, useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"

import type { TCardOffer } from "./types"

import { MotionLI } from "@/components/common/Motion"
import { BlockBarter } from "./components/BlockBarter"
import { ButtonDefault } from "@/components/common/Buttons"
import { BlockTitle } from "./components/BlockTitle"

import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./style.module.scss"

export const CardOffer: TCardOffer = ({
    id,
    thread,
    timestamp,
    status,
    initiator,
    consigner,
}) => {
    const { userId: myUserId } = useAuth()
    const { handlePush } = usePush()
    const [loading, setLoading] = useState(false)

    const idUser = useMemo(() => {
        if (!initiator || !consigner) return null
        return Number(initiator?.userId) === Number(myUserId)
            ? Number(consigner?.userId)
            : Number(initiator?.userId)
    }, [consigner, initiator, myUserId])

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(idUser!),
        queryKey: ["user", idUser],
        refetchOnMount: false,
        enabled: !!idUser,
    })

    function handleChatBarter() {
        if (!loading) {
            setLoading(true)
            if (!!thread?.id) {
                handlePush(`/messages?thread=${thread?.id}`)
            } else {
                handlePush(`/messages?barter-id=${id}-${idUser}`)
            }
        }
    }

    return (
        <MotionLI classNames={[styles.container]}>
            <section className={styles.main}>
                <BlockTitle {...dataUser?.res!} />
                <BlockBarter {...{ consigner, initiator }} />
            </section>
            <footer>
                <div className={styles.date}>
                    <Image
                        src="/svg/calendar.svg"
                        alt="calendar"
                        width={16}
                        height={16}
                    />
                    <p>{dayjs(timestamp!).format("DD/MM/YYYY")}</p>
                </div>
                <div className={styles.end}>
                    {!["completed", "destroyed"]?.includes(status) && (
                        <ButtonDefault
                            label="Посмотреть"
                            handleClick={handleChatBarter}
                            classNames={styles.button}
                        />
                    )}
                </div>
            </footer>
        </MotionLI>
    )
}
