import { useState, useMemo, type ReactNode } from "react"
import { isMobile } from "react-device-detect"

import type { IValueServices } from "../types/types"
import type { TContainerServices } from "./types/types"

import { ButtonRadio } from "@/components/common/Buttons"
import { ItemsProposalsRequests } from "./ItemsProposalsRequests"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ContainerServices: TContainerServices = ({ }) => {
  const [value, setValue] = useState<IValueServices>("proposals")

  const content: ReactNode = useMemo(() => ({
    proposals: <ItemsProposalsRequests key="proposals" type="optional-3" />,
    requests: <ItemsProposalsRequests key="requests" type="optional-2" />,
  }[value]), [value])

  return (
    <section className={cx(styles.containerServices, isMobile && styles.mobile)}>
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