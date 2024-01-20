import { isMobile } from "react-device-detect"
import { CSSProperties, useEffect, useRef, useState } from "react"

import { cx } from "@/lib/cx"

import { dispatchOnboarding, useOnboarding, useVisibleBannerNewServices } from "@/store/hooks"

import styles from "../styles/create-onboarding.module.scss"

export const CreateOnboarding = () => {
    const [positionSection, setPositionSection] = useState<CSSProperties>({})
    const [positionCreateButton, setPositionCreateButton] = useState<CSSProperties>({})
    const step = useOnboarding(({ step }) => step)
    const visible = useOnboarding(({ visible }) => visible)
    const dispatchNewServicesBanner = useVisibleBannerNewServices(({ dispatchNewServicesBanner }) => dispatchNewServicesBanner)
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (isMobile) {
            if (step === 0 && visible) {
                const idCreate = document.getElementById("id-create-menu-footer")
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
                setPositionCreateButton({
                    top: topCreate,
                    left: leftCreate,
                    width: widthCreate,
                    height: heightCreate,
                    borderRadius: heightCreate / 2,
                })
                setPositionSection({
                    opacity: 1,
                    visibility: "visible",
                    left: "50%",
                    transform: `translate(-50%, -100%)`,
                    top: `calc(${topCreate}px - 0.75rem)`,
                    width: "calc(100% - 1.25rem - 1.25rem)",
                })
            }
        } else {
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
                setPositionCreateButton({
                    top: topCreate,
                    left: leftCreate,
                    width: widthCreate,
                    height: heightCreate,
                    borderRadius: heightCreate / 2,
                })
                setPositionSection({
                    opacity: 1,
                    visibility: "visible",
                    top: `calc(${topCreate}px + ${heightCreate}px + 1.5rem)`,
                    left: leftCreate + widthCreate,
                    transform: `translateX(-100%)`,
                })
            }
        }
    }, [visible, step, ref, isMobile])

    return (
        <div ref={ref} className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <div
                data-create
                style={positionCreateButton}
                onClick={(event) => {
                    event.stopPropagation()
                    dispatchNewServicesBanner(true)
                    dispatchOnboarding("next")
                }}
            />
            <section
                style={positionSection}
                onClick={(event) => {
                    event.stopPropagation()
                    dispatchNewServicesBanner(true)
                    dispatchOnboarding("next")
                }}
            >
                <article>
                    <div data-header>
                        <h3>Создать</h3>
                        <button
                            type="button"
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
