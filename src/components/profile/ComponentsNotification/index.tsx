"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { TComponentsNotification } from "./types/types"

import {
    ButtonCircleGradient,
    ButtonDefault,
} from "@/components/common/Buttons"
import { MotionLI } from "@/components/common/Motion"

import { usePush } from "@/helpers"
import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { serviceNotifications } from "@/services/notifications"

import styles from "./styles/style.module.scss"

export const ComponentsNotification: TComponentsNotification = (props) => {
    const { userId } = useAuth()
    const { data, created, operation, provider, id } = props ?? {}
    const { handlePush } = usePush()

    const getUser = useMemo(() => {
        if (!userId || !data) return null
        if (userId === data?.consigner?.userId) {
            return data?.initiator?.userId
        } else {
            return data?.consigner?.userId
        }
    }, [userId, data])

    const { data: userData } = useQuery({
        queryFn: () => serviceUsers.getId(getUser!),
        queryKey: ["user", getUser!],
        enabled: !!getUser,
    })

    function handleCancel() {
        serviceNotifications.patch(
            {
                enabled: false,
            },
            id!,
        )
    }

    function handleBarter() {
        if (provider === "barter" && !!userId) {
            handleCancel()
            if (data?.threadId) {
                handlePush(`/messages?thread=${data?.threadId}`)
            } else {
                handlePush(`/messages?barter-id=${data?.id}-${getUser}`)
            }
        }
    }

    const titleBarter = useMemo(() => {
        if (data) {
            if (userId === data?.initiator?.userId) {
                return `Вы предлагаете ${data?.initiator?.title?.toLowerCase()} взамен вы хотите ${data?.consigner?.title?.toLowerCase()}`
            } else {
                return `${userData?.res?.profile
                    ?.firstName} предлагает вам ${data?.consigner?.title?.toLowerCase()} взамен на ${data?.initiator?.title?.toLowerCase()}`
            }
        }
        return null
    }, [data, userId, userData])

    return (
        <MotionLI
            classNames={[styles.container]}
            data={{
                "data-provider": props.provider,
                "data-name": props.provider,
                "data-mobile": isMobile,
            }}
        >
            <div data-block-info>
                <h3>
                    {provider === "barter" &&
                    operation === "create" &&
                    data?.status === "initiated" ? (
                        <span>Предложение обмена: </span>
                    ) : null}
                    {titleBarter}
                </h3>
                <div data-footer>
                    <div data-date>
                        <Image
                            src="/svg/calendar.svg"
                            alt="calendar"
                            width={16}
                            height={16}
                        />
                        <p>{dayjs(created!).format("DD/MM/YYYY")}</p>
                    </div>
                    <div data-buttons>
                        <ButtonDefault
                            label="Посмотреть"
                            handleClick={handleBarter}
                        />
                        <ButtonCircleGradient
                            type="primary"
                            handleClick={handleCancel}
                            icon="/svg/x-close-primary.svg"
                        />
                    </div>
                </div>
            </div>
        </MotionLI>
    )
}
