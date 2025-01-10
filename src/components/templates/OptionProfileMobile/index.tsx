"use client"

import { useSwipeable } from "react-swipeable"

import Button from "@/components/common/Button"

import { cx } from "@/lib/cx"
import { useOptionProfileMobile, dispatchOptionProfileMobile, dispatchMobileChangeAbout, dispatchModal, EModalData } from "@/store"

import styles from "./style.module.scss"

export const OptionProfileMobile = () => {
  const visible = useOptionProfileMobile(({ visible }) => visible)

  // function handleOpen() {
  //   dispatchOnboarding("open")
  //   dispatchOptionProfileMobile(false)
  // }

  function handleChangeAbout() {
    dispatchMobileChangeAbout(true)
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
    <div
      className={cx(styles.wrapper, "wrapper-fixed")}
      data-visible={visible}
      onClick={(event) => dispatchOptionProfileMobile(false)}
      data-test="wrapper-option-profile-mobile"
    >
      <section onClick={(event) => event.stopPropagation()} {...handlers} data-test="section-option-profile-mobile">
        <div data-line-gray />
        <div data-buttons>
          <Button type="button" typeButton="regular-primary" label="Изменить описание обо мне" onClick={handleChangeAbout} />
          {/* <Button
            type="button"
            typeButton="regular-primary"
            label="Обучение"
            prefixIcon={<img src="/svg/graduation-cap-primary.svg" alt="g" width={24} height={24} />}
            onClick={handleOpen}
            data-test="button-option-profile-mobile-on-modal-onboarding"
          /> */}
        </div>
        <article>
          <div>
            <p>Нужна помощь?</p>
            <p>
              Пишите в телеграм:&nbsp;
              <a href="https://t.me/sheirainfo" target="_blank">
                @sheirainfo
              </a>
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              dispatchOptionProfileMobile(false)
              dispatchModal(EModalData.OutAccount)
            }}
            data-test="button-option-profile-mobile-on-modal-out-account"
          >
            <img src="/svg/log-out.svg" alt="out" width={16} height={16} />
          </button>
        </article>
      </section>
    </div>
  )
}
