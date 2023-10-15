"use client"

import dayjs from "dayjs"
import {
    LegacyRef,
    MutableRefObject,
    Ref,
    RefObject,
    useEffect,
    useMemo,
    useState,
} from "react"
import Image from "next/image"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"

import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { serviceBarters } from "@/services/barters"
import { GeoTagging } from "@/components/common/GeoTagging"
import { useOffersCategories } from "@/store/state/useOffersCategories"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import styles from "./styles/notice-barter.module.scss"
import { BadgeServices } from "@/components/common/Badge"

export const NoticeBarter = ({ idBarter }: { idBarter: number }) => {
    const { userId, user } = useAuth()
    const { categories } = useOffersCategories()
    const [loading, setLoading] = useState(false)
    const { data, refetch } = useQuery({
        queryFn: () => serviceBarters.getId(idBarter),
        queryKey: ["barters", `id=${idBarter}`],
        enabled: !!idBarter,
    })

    const idUser: number | null = useMemo(() => {
        if (!data?.res || !userId) {
            return null
        }
        if (Number(data?.res?.initiator?.userId) === Number(userId)) {
            return Number(data?.res?.consigner?.userId)
        } else {
            return Number(data?.res?.initiator?.userId)
        }
    }, [data?.res, userId])

    const isMeInitiator = useMemo(() => {
        return userId && data?.res?.initiator?.userId === userId
    }, [data?.res, userId])

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(idUser!),
        queryKey: ["user", idUser],
        enabled: !!idUser,
    })

    const infoOffers = useMemo(() => {
        if (!categories.length || !data?.res) {
            return null
        }

        return {
            initiator: categories?.find(
                (item) =>
                    Number(item.id) ===
                    Number(data?.res?.initiator?.categoryId),
            ),
            consigner: categories?.find(
                (item) =>
                    Number(item.id) ===
                    Number(data?.res?.consigner?.categoryId),
            ),
        }
    }, [categories, data?.res])

    const geo = useMemo(() => {
        return (
            dataUser?.res?.addresses?.find(
                (item) => item?.addressType === "main",
            ) || null
        )
    }, [dataUser])

    function handleSuccess() {
        if (!loading) {
            setLoading(true)
            serviceBarters
                .patch(
                    {
                        updatedById: userId,
                        status: "executed",
                    },
                    idBarter!,
                )
                .then((response) => {
                    console.log("response barters: ", response)
                    refetch().finally(() => setLoading(false))
                })
        }
    }

    function handleCanceled() {
        if (!loading) {
            setLoading(true)
            serviceBarters
                .patch(
                    {
                        updatedById: userId,
                        status: "canceled",
                    },
                    idBarter!,
                )
                .then((response) => {
                    console.log("response barters: ", response)
                    refetch().finally(() => setLoading(false))
                })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, visibility: "hidden" }}
            className={styles.wrapper}
            data-destroyed={["canceled", "destroyed"]?.includes(
                data?.res?.status!,
            )}
            id="id-barter-header"
        >
            <div data-sub-header>
                {data?.res?.timestamp ? (
                    <section data-time>
                        <Image
                            src="/svg/calendar-black.svg"
                            alt="calendar"
                            width={14}
                            height={14}
                        />
                        <p>
                            {dayjs(data?.res?.timestamp).format("DD/MM/YYYY")}
                        </p>
                    </section>
                ) : null}
                {geo ? (
                    <section data-time>
                        <GeoTagging
                            location={geo?.additional}
                            fontSize={12}
                            size={14}
                        />
                    </section>
                ) : null}
            </div>
            <section data-inform>
                {infoOffers && data?.res?.status === "initiated" ? (
                    isMeInitiator ? (
                        <p>
                            Вы предлагаете{" "}
                            <span>
                                {infoOffers?.initiator?.title?.toLowerCase()}
                            </span>{" "}
                            взамен вы хотите{" "}
                            <span>
                                {infoOffers?.consigner?.title?.toLowerCase()}
                            </span>
                        </p>
                    ) : (
                        <p>
                            <span>{dataUser?.res?.profile?.firstName}</span>{" "}
                            предлагает вам{" "}
                            <span>
                                {infoOffers?.consigner?.title?.toLowerCase()}
                            </span>{" "}
                            взамен на{" "}
                            <span>
                                {infoOffers?.initiator?.title?.toLowerCase()}
                            </span>
                        </p>
                    )
                ) : null}
                {data?.res?.status === "executed" ? (
                    <p>
                        В настоящее время у вас есть обмен с{" "}
                        {dataUser?.res?.profile?.firstName}
                    </p>
                ) : null}
                {data?.res?.status === "completed" ? (
                    <p>
                        Ваш обмен с {dataUser?.res?.profile?.firstName} был
                        успешно завершён!
                    </p>
                ) : null}
                {data?.res?.status === "destroyed" ? (
                    <p>
                        Ваш обмен с {dataUser?.res?.profile?.firstName} не
                        состоялся!
                    </p>
                ) : null}
                {data?.res?.status === "canceled" ? (
                    <p>
                        Ваш обмен с {dataUser?.res?.profile?.firstName} был
                        отклонён!
                    </p>
                ) : null}
            </section>
            {["executed", "completed", "destroyed"]?.includes(
                data?.res?.status!,
            ) ? (
                <footer data-executed>
                    <BadgeServices
                        photo="/mocks/Nail.png"
                        label={infoOffers?.initiator?.title!}
                        type={data?.res?.initiator?.provider!}
                    />
                    <Image
                        src="/svg/repeat-white.svg"
                        alt="barter"
                        width={24}
                        height={24}
                    />
                    <BadgeServices
                        photo="/mocks/Nail.png"
                        label={infoOffers?.consigner?.title!}
                        type={data?.res?.consigner?.provider!}
                    />
                </footer>
            ) : null}
            {isMeInitiator === false && data?.res?.status === "initiated" ? (
                <footer>
                    <section>
                        <ButtonFill
                            label="Принять"
                            handleClick={handleSuccess}
                            classNames={styles.fill}
                            suffix={
                                <Image
                                    src="/svg/check-white.svg"
                                    alt="check-white"
                                    width={16}
                                    height={16}
                                />
                            }
                        />
                        <ButtonDefault
                            classNames={styles.fill}
                            label="Отказаться"
                            handleClick={handleCanceled}
                            suffix={
                                <Image
                                    src="/svg/x-close-primary.svg"
                                    alt="check-white"
                                    width={16}
                                    height={16}
                                />
                            }
                        />
                    </section>
                </footer>
            ) : null}
        </motion.div>
    )
}
