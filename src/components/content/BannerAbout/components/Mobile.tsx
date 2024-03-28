"use client"

import { useResize } from "@/helpers"
import { dispatchIntro, useVisibleMobileAbout, dispatchVisibleMobileAbout } from "@/store"

import styles from "../styles/mobile.module.scss"

export function BannerAboutMobile() {
  const { isTablet } = useResize()
  const visible = useVisibleMobileAbout(({ visible }) => visible)

  return isTablet ? (
    <div
      onClick={() => {
        if (!visible) {
          dispatchVisibleMobileAbout(true)
        } else {
          dispatchIntro(true)
        }
      }}
      className={styles.container}
      data-visible={visible}
    >
      {visible ? (
        <>
          <article>
            <h3>Шейра - кто мы и чем можем быть полезны?</h3>
            <button
              onClick={(event) => {
                event.stopPropagation()
                dispatchVisibleMobileAbout(false)
              }}
            >
              <img src="/svg/chevron-down-white.svg" alt="arrow-down" width={20} height={20} />
            </button>
          </article>
          <section>
            <p>Узнать</p>
            <img src="/svg/arrow-right.svg" alt="arrow" width={24} height={24} />
          </section>
        </>
      ) : (
        <h1>?</h1>
      )}
    </div>
  ) : null
}
