import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchOnboarding, dispatchOnboardingContinue, useOnboarding } from "@/store/hooks"

import styles from "../styles/pre-close.module.scss"

export const PreClose = () => {
    const type = useOnboarding(({ type }) => type)
    const visible = useOnboarding(({ visible }) => visible)

    function handleContinue() {
        dispatchOnboardingContinue()
    }

    function handleClose() {
        dispatchOnboarding("close")
    }

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section>
                <ButtonClose position={{}} onClick={dispatchOnboardingContinue} />
                <article>
                    {["offer", "alert", "discussion"].includes(type!) ? (
                        <div data-img>
                            <img
                                src={
                                    type === "offer"
                                        ? "/svg/3d/3d-speaker.svg"
                                        : type === "alert"
                                        ? "/svg/3d/3d-sos.svg"
                                        : type === "discussion"
                                        ? "/svg/3d/3d-message.svg"
                                        : ""
                                }
                                alt="pre-close"
                                width={40}
                                height={40}
                            />
                        </div>
                    ) : null}
                    <h3>
                        Прервать обучение по созданию{" "}
                        {type === "offer"
                            ? " Предложения"
                            : type === "alert"
                            ? " SOS-сообщения"
                            : type === "discussion"
                            ? "Обсуждения"
                            : null}
                        ?
                    </h3>
                </article>
                <div data-buttons>
                    <Button type="button" typeButton="regular-primary" label="Нет, остаться" onClick={handleContinue} />
                    <Button type="button" typeButton="fill-primary" label="Да, прервать" onClick={handleClose} />
                </div>
                <footer>
                    <p>Вы можете вернуться в любой момент</p>
                </footer>
            </section>
        </div>
    )
}
