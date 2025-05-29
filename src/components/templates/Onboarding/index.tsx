"use client"

import { PreClose } from "./components/PreClose"
import { CreateOnboarding } from "./components/CreateOnboarding"
import { ArticleOnboarding } from "./components/ArticleOnboarding"

import { cx } from "@/lib/cx"
import { useResize } from "@/helpers"
import { mapIconCreateOffer } from "@/utils"
import { ITEMS_START } from "./constants/items-start"
import { dispatchCreatePost, dispatchOnboardingStart, useOnboarding } from "@/store"

import styles from "./styles/style.module.scss"
import { EnumTypeProvider } from "@/types/enum"

export const Onboarding = () => {
  const step = useOnboarding(({ step }) => step)
  const type = useOnboarding(({ type }) => type)
  const isPreClose = useOnboarding(({ isPreClose }) => isPreClose)
  const visible = useOnboarding(({ visible }) => visible)

  const { isTablet } = useResize()

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
                    if (item.action === EnumTypeProvider.POST) {
                      dispatchCreatePost(true)
                    } else {
                      dispatchOnboardingStart(item.action)
                    }
                  }}
                >
                  <p>{item.sub}</p>
                  {item?.footer ? (
                    <div data-footer>
                      <b>{item.footer.title}</b>
                      {mapIconCreateOffer.has(item.action!) ? mapIconCreateOffer.get(item.action!) : null}
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
      {step >= 1 && !!type && visible && !isTablet && <ArticleOnboarding />}
    </>
  )
}
