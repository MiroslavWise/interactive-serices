import { EnumTypeProvider } from "@/types/enum"

import Button from "@/components/common/Button"
import { ButtonClose } from "@/components/common"
import IconWarn from "@/components/icons/IconWarn"

import { cx } from "@/lib/cx"
import { dispatchOnboarding, dispatchOnboardingContinue, useOnboarding } from "@/store"

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

  const title = new Map([
    [EnumTypeProvider.offer, "Прервать обучение по созданию Предложения?"],
    [EnumTypeProvider.alert, "Прервать обучение по созданию SOS-сообщения?"],
    [EnumTypeProvider.discussion, "Прервать обучение по созданию Обсуждения?  "],
  ])

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section>
        <ButtonClose position={{}} onClick={dispatchOnboardingContinue} />
        <article>
          <div data-img>
            <img
              src={
                type === EnumTypeProvider.offer
                  ? "/svg/3d/3d-speaker.svg"
                  : type === EnumTypeProvider.alert
                  ? "/svg/3d/3d-sos.svg"
                  : type === EnumTypeProvider.discussion
                  ? "/svg/3d/3d-message.svg"
                  : ""
              }
              alt="pre-close"
              width={40}
              height={40}
            />
            <div data-warn>
              <IconWarn />
            </div>
          </div>
          <h3>{title.has(type as EnumTypeProvider) ? title.get(title as unknown as EnumTypeProvider) : null}</h3>
          <p>Заполненные поля не сохранятся</p>
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
