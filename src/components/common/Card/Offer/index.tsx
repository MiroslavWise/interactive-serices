"use client"

import dayjs from "dayjs"
import { useMemo } from "react"
import Image from "next/image"
import { useQueries } from "react-query"

import type { TCardOffer } from "./types"

import { MotionLI } from "@/components/common/Motion"
import { BlockBarter } from "./components/BlockBarter"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"
import { BlockTitle } from "./components/BlockTitle"

import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./style.module.scss"

export const CardOffer: TCardOffer = ({
    id,
    parentId,
    consignedId,
    threadId,
    initialId,
    title,
    imageId,
    userId,
    updatedById,
    provider,
    created,
    updated,
    timestamp,
    status,
    initiator,
    consigner,
}) => {
    const { userId: myUserId } = useAuth()
    const { handlePush } = usePush()

    const idUser = useMemo(() => {
        if (!initiator || !consigner) return null
        return Number(initiator?.userId) === Number(myUserId)
            ? Number(consigner?.userId)
            : Number(initiator?.userId)
    }, [consigner, initiator, myUserId])

    const [{ data: dataUser }] = useQueries([
        {
            queryFn: () => serviceUsers.getId(idUser!),
            queryKey: ["user", idUser],
            refetchOnMount: false,
            enabled: !!idUser,
        },
    ])

    function handleChatBarter() {
        if (!!threadId) {
            handlePush(`/messages?thread=${threadId}`)
        } else {
            handlePush(`/messages?barter-id=${id}-${idUser}`)
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
                {false ? (
                    <ButtonFill
                        label="посмотреть детали"
                        type="optional_pink"
                        classNames={styles.button}
                    />
                ) : (
                    <div className={styles.end}>
                        {status === "completed" ? (
                            <div className={styles.verification}>
                                <Image
                                    src="/svg/success.svg"
                                    alt="finality"
                                    width={17}
                                    height={17}
                                />
                            </div>
                        ) : null}
                        <ButtonCircleGradient
                            type="primary"
                            icon="/svg/message-dots-circle.svg"
                            size={16}
                            handleClick={handleChatBarter}
                        />
                    </div>
                )}
            </footer>
        </MotionLI>
    )
}
