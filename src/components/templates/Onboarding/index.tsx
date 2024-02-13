"use client"

import { isMobile } from "react-device-detect"

import { PreClose } from "./components/PreClose"
import { CreateOnboarding } from "./components/CreateOnboarding"
import { ArticleOnboarding } from "./components/ArticleOnboarding"

import { cx } from "@/lib/cx"
import { ITEMS_START } from "./constants/items-start"
import { dispatchOnboardingStart, useOnboarding } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Onboarding = () => {
  const step = useOnboarding(({ step }) => step)
  const type = useOnboarding(({ type }) => type)
  const isPreClose = useOnboarding(({ isPreClose }) => isPreClose)
  const visible = useOnboarding(({ visible }) => visible)

  if (type === null) {
    return (
      <div className={cx("wrapper-fixed", styles.wrapperStart)} data-visible={visible}>
        <section>
          <ul>
            <h2>Добро пожаловать в Sheira!</h2>
            <article>
              <img src="/svg/heart.svg" alt="h" width={60} height={53} />
              <h5>C чего вы хотите начать обучение?</h5>
            </article>
            <article data-grid>
              {ITEMS_START.map((item, index) => (
                <div
                  data-item
                  key={`::${index}::item::start::`}
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchOnboardingStart(item.action)
                  }}
                >
                  <p>{item.sub}</p>
                  {item?.footer ? (
                    <div data-footer>
                      <b>{item.footer.title}</b>
                      <img src={item.footer.icon} alt="item-icon" width={24} height={24} />
                    </div>
                  ) : null}
                </div>
              ))}
            </article>
          </ul>
        </section>
      </div>
    )
  }

  return (
    <>
      {isPreClose && visible && <PreClose />}
      {step === 0 && !!type && <CreateOnboarding />}
      {step >= 1 && !!type && visible && !isMobile && <ArticleOnboarding />}
    </>
  )
}
