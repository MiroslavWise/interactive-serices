"use client"

import { Button } from "@/components/common"
import { useSwipeable } from "react-swipeable"

import { cx } from "@/lib/cx"
import { useOut } from "@/helpers"
import { useOptionProfileMobile, dispatchOptionProfileMobile, dispatchOnboarding } from "@/store"

import styles from "./style.module.scss"

export const OptionProfileMobile = () => {
  const visible = useOptionProfileMobile(({ visible }) => visible)

  const { out } = useOut()

  function handleOpen() {
    dispatchOnboarding("open")
    dispatchOptionProfileMobile(false)
  }

  function handleChangeAbout() {
    dispatchOptionProfileMobile(false)
  }

  const handlers = useSwipeable({
    onSwipedDown(event) {
      if (event.deltaY > 50) {
        dispatchOptionProfileMobile(false)
      }
    },
  })

  return (
    <div className={cx(styles.wrapper, "wrapper-fixed")} data-visible={visible} onClick={(event) => dispatchOptionProfileMobile(false)}>
      <section onClick={(event) => event.stopPropagation()} {...handlers}>
        <div data-line-gray />
        <div data-buttons>
          <Button type="button" typeButton="regular-primary" label="Изменить описание обо мне" onClick={handleChangeAbout} />
          <Button
            type="button"
            typeButton="regular-primary"
            label="Обучение"
            prefixIcon={<img src="/svg/graduation-cap-primary.svg" alt="g" width={24} height={24} />}
            onClick={handleOpen}
          />
        </div>
        <article>
          <div>
            <p>Нужна помощь?</p>
            <p>
              Пишите в телеграм:{" "}
              <a href="https://t.me/sheirainfo" target="_blank">
                @sheirainfo
              </a>
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              dispatchOptionProfileMobile(false)
              out()
            }}
          >
            <img src="/svg/log-out.svg" alt="out" width={16} height={16} />
          </button>
        </article>
      </section>
    </div>
  )
}
