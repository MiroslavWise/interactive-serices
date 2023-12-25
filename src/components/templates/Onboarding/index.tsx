"use client"

import { CreateOnboarding } from "./components/CreateOnboarding"
import { ArticleOnboarding } from "./components/ArticleOnboarding"

import { cx } from "@/lib/cx"
import { dispatchOnboardingStart, useOnboarding } from "@/store/hooks"

import { ITEMS_START } from "./constants/items-start"

import styles from "./styles/style.module.scss"

export const Onboarding = () => {
    const step = useOnboarding(({ step }) => step)
    const type = useOnboarding(({ type }) => type)
    const visible = useOnboarding(({ visible }) => visible)

    if (type === null) {
        return (
            <div className={cx("wrapper-fixed", styles.wrapperStart)} data-visible={visible}>
                <section>
                    <ul>
                        <h2>Добро пожаловать в Sheira!</h2>
                        <article>
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

    if (step === 0 && !!type) {
        return <CreateOnboarding />
    }

    if (step >= 1 && !!type && visible) {
        return <ArticleOnboarding />
    }

    return null
}
