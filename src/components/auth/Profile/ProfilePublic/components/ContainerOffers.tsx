import { useId, useState } from "react"

import { MotionUL } from "@/components/common/Motion"
import { CardRequestsAndProposals } from "@/components/common/Card"
import { ButtonRadio } from "@/components/common/Buttons"

import { MOCKS_PROPOSALS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

type TValueTab = "proposals" | "requests"

export const ContainerOffers = () => {
  const idItem = useId()
  const [value, setValue] = useState<TValueTab>("proposals")

  return (
    <ul className={styles.containerRequestsAndProposals}>
      <div className={styles.tabs}>
        <ButtonRadio
          label="Предложения"
          active={value === "proposals"}
          onClick={() => setValue("proposals")}
        />
        <ButtonRadio
          label="Запросы"
          active={value === "requests"}
          onClick={() => setValue("requests")}
        />
      </div>
      {
        value === "proposals"
          ? (
            <MotionUL>
              {
                MOCKS_PROPOSALS.map((item, index) => (
                  <CardRequestsAndProposals
                    key={item.title + index + idItem + "proposals"}
                    {...item}
                    type="optional-3"
                  />
                ))
              }
            </MotionUL>
          ) : null
      }
      {
        value === "requests"
          ? (
            <MotionUL>
              {
                MOCKS_PROPOSALS.map((item, index) => (
                  <CardRequestsAndProposals
                    key={item.title + index + idItem + "requests"}
                    {...item}
                    type="optional-2"
                  />
                ))
              }
            </MotionUL>
          ) : null
      }
    </ul>
  )
}