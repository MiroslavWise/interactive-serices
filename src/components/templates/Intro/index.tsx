"use client"

import { TimeTrack } from "./components/TimeTrack"

import { ItemsPages } from "./components/ItemsPages"

import { cx } from "@/lib/cx"
import { SCREENS } from "./constants/screens"
import { dispatchPage, useIntro, dispatchAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Intro = () => {
    const visible = useIntro(({ visible }) => visible)
    const page = useIntro(({ page }) => page)

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section onClick={dispatchPage}>
                <TimeTrack />
                <ItemsPages>
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
            </section>
        </div>
    )
}
