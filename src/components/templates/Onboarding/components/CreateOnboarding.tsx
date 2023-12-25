import { CSSProperties, useEffect, useRef, useState } from "react"

import { cx } from "@/lib/cx"

import { dispatchOnboarding, useOnboarding, useVisibleBannerNewServices } from "@/store/hooks"

import styles from "../styles/style.module.scss"

export const CreateOnboarding = () => {
    const [positionSection, setPositionSection] = useState<CSSProperties>({ top: "50%", left: "50%" })
    const step = useOnboarding(({ step }) => step)
    const visible = useOnboarding(({ visible }) => visible)
    const dispatchNewServicesBanner = useVisibleBannerNewServices(({ dispatchNewServicesBanner }) => dispatchNewServicesBanner)
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (step === 0 && visible) {
            const idCreate = document.getElementById("nav-bar-button-create")
            const getBoundaryCreate = idCreate?.getBoundingClientRect()

            const topCreate = getBoundaryCreate?.top || 0
            const leftCreate = getBoundaryCreate?.left || 0
            const widthCreate = getBoundaryCreate?.width || 0
            const heightCreate = getBoundaryCreate?.height || 0

            if (ref.current) {
                ref.current.style.setProperty("--top-after", `${topCreate}px`)
                ref.current.style.setProperty("--left-after", `${leftCreate}px`)
                ref.current.style.setProperty("--height-after", `${heightCreate}px`)
                ref.current.style.setProperty("--width-after", `${widthCreate}px`)
                ref.current.style.setProperty("--border-radius-after", `${heightCreate / 2}px`)
            }
            setPositionSection({
                top: `calc(${topCreate}px + ${heightCreate}px + 0.625rem)`,
                left: leftCreate + widthCreate,
                transform: `translateX(-100%)`,
            })
        }
    }, [visible, step, ref])

    return (
        <div ref={ref} className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section
                style={positionSection}
                onClick={() => {
                    dispatchNewServicesBanner(true)
                    dispatchOnboarding("next")
                }}
            >
                <article>
                    <div data-header>
                        <h3>Создать</h3>
                        <button
                            onClick={(event) => {
                                event.stopPropagation()
                                dispatchOnboarding("close")
                            }}
                        >
                            <img src="/svg/x-close.svg" alt="x" width={16} height={16} />
                        </button>
                    </div>
                    <p>
                        Нажав на эту кнопку вы сможете создать свое предложение услуг, дискуссию на любую тему или важное предупреждение для
                        других Sheira-жителей. Попробуйте!
                    </p>
                </article>
            </section>
        </div>
    )
}
