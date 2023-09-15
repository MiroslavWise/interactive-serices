import Image from "next/image"

import type { TCardOffer } from "./types"

import { MotionLI } from "@/components/common/Motion"
import { BlockBarter } from "./components/BlockBarter"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"
import { BlockTitle } from "./components/BlockTitle"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "./style.module.scss"

export const CardOffer: TCardOffer = ({
    name,
    photo,
    chatId,
    finality,
    price,
    date,
    geo,
    rating,
    proposals,
}) => {
    const { handlePush } = usePush()

    return (
        <MotionLI classNames={[styles.container]}>
            <section className={styles.main}>
                <BlockTitle {...{ name, photo, geo, price, rating }} />
                <BlockBarter />
            </section>
            <footer>
                <div className={styles.date}>
                    <Image
                        src="/svg/calendar.svg"
                        alt="calendar"
                        width={16}
                        height={16}
                    />
                    <p>{date}</p>
                </div>
                {proposals ? (
                    <ButtonFill
                        label="посмотреть детали"
                        type="optional_pink"
                        classNames={styles.button}
                    />
                ) : (
                    <div className={styles.end}>
                        {finality ? (
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
                            handleClick={() =>
                                handlePush(`/messages?user=${chatId}`)
                            }
                        />
                    </div>
                )}
            </footer>
        </MotionLI>
    )
}
