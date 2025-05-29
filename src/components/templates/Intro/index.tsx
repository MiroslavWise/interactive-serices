"use client"

import { type ReactNode } from "react"
import { useSwipeable } from "react-swipeable"

import { EnumSign } from "@/types/enum"

import { ScreenOne } from "./components/1"
import { ScreenTwo } from "./components/2"
import { ScreenFour } from "./components/4"
import { ScreenFive } from "./components/5"
import { ScreenZero } from "./components/0"
import { ScreenThree } from "./components/3"
import { StartPage } from "./components/StartPage"
import { TimeTrack } from "./components/TimeTrack"
import { ItemsPages } from "./components/ItemsPages"
import { PhotoContainer } from "./components/PhotoContainer"
import { ButtonClose, ButtonsSwipePage } from "./components/Buttons"

import { cx } from "@/lib/cx"
import { SCREENS } from "./constants/screens"
import { dispatchPage, useIntro, dispatchAuthModal, dispatchIntro, dispatchPrevIntro, dispatchNextIntro } from "@/store"

import styles from "./styles/style.module.scss"

const SCREENS_IMAGES: Record<number, ReactNode> = {
  0: <StartPage />,
  1: <ScreenZero />,
  2: <ScreenOne />,
  3: <ScreenTwo />,
  4: <ScreenThree />,
  5: <ScreenFour />,
  6: <ScreenFive />,
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
    onSwipedRight(event) {
      if (event.deltaX > 120) {
        dispatchPrevIntro()
      }
    },
    onSwipedLeft(event) {
      if (event.deltaX < 120) {
        dispatchNextIntro()
      }
    },
  })

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section {...handlers} onClick={dispatchPage}>
        <TimeTrack />
        <ItemsPages page={page}>
          <PhotoContainer>{SCREENS_IMAGES[page]}</PhotoContainer>
          <footer>
            <h3>{SCREENS[page].title}</h3>
            {SCREENS[page].description.length
              ? SCREENS[page].description.map((item, index) => <p key={index + "-description-intro"}>{item}</p>)
              : null}
            {page === 6 ? (
              <button onClick={() => dispatchAuthModal({ visible: true, type: EnumSign.SignUp })}>
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
