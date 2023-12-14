"use client"

import { type ReactNode } from "react"
import { useSwipeable } from "react-swipeable"

import { TimeTrack } from "./components/TimeTrack"

import { ScreenZero } from "./components/0"
import { ScreenOne } from "./components/1"
import { ScreenTwo } from "./components/2"
import { ScreenFour } from "./components/4"
import { ScreenFive } from "./components/5"
import { ItemsPages } from "./components/ItemsPages"
import { PhotoContainer } from "./components/PhotoContainer"
import { ButtonClose, ButtonsSwipePage } from "./components/Buttons"

import { cx } from "@/lib/cx"
import { SCREENS } from "./constants/screens"
import { dispatchPage, useIntro, dispatchAuthModal, dispatchIntro } from "@/store/hooks"

import styles from "./styles/style.module.scss"

const SCREENS_IMAGES: Record<number, ReactNode> = {
    0: <ScreenZero />,
    1: <ScreenOne />,
    2: <ScreenTwo />,
    3: <ScreenZero />,
    4: <ScreenFour />,
    5: <ScreenFive />,
}

export const Intro = () => {
    const visible = useIntro(({ visible }) => visible)
    const page = useIntro(({ page }) => page)

    const handlers = useSwipeable({
        onSwipedDown(event) {
            if (event.deltaY > 150) {
                dispatchIntro(false)
            }
        },
    })

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section {...handlers} onClick={dispatchPage}>
                <TimeTrack />
                <ItemsPages>
                    <PhotoContainer>{SCREENS_IMAGES[page]}</PhotoContainer>
                    <footer>
                        <h3>{SCREENS[page].title}</h3>
                        {SCREENS[page].description ? <p>{SCREENS[page].description}</p> : null}
                        {page === 5 ? (
                            <button onClick={() => dispatchAuthModal({ visible: true, type: "SignUp" })}>
                                <span>Зарегистрироваться</span>
                            </button>
                        ) : null}
                    </footer>
                </ItemsPages>
                <ButtonClose />
                <ButtonsSwipePage />
            </section>
        </div>
    )
}
