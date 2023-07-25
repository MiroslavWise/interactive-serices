import { useState, useMemo, type ReactNode } from "react"

import type { IValueServices } from "../types/types"
import type { TContainerServices } from "./types/types"

import { ButtonRadio } from "@/components/common/Buttons"

import styles from "./styles/style.module.scss"
import { ItemsProposalsRequests } from "./ItemsProposalsRequests"

export const ContainerServices: TContainerServices = ({ }) => {
  const [value, setValue] = useState<IValueServices>("proposals")

  const content: ReactNode = useMemo(() => ({
    proposals: <ItemsProposalsRequests key="proposals" />,
    requests: <ItemsProposalsRequests key="requests" />,
  }[value]), [value])

  return (
    <section className={styles.containerServices}>
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
      {content}
    </section>
  )
}