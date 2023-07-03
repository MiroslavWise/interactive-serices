"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import type { TServiceBanner } from "./types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common/Segments"
import { SearchField } from "@/components/common/Inputs"
import { PeopleCard } from "@/components/common/PeopleCard/ServiceBanner"

import { SERVICES } from "./constants"
import { MOCK_DATA_PEOPLE } from "@/mocks/components/auth/constants"

import styles from "./service-banner.module.scss"

const ServiceBanner: TServiceBanner = ({ active, setDataAndActive }) => {
  const [activeService, setActiveService] = useState<ISegmentValues>(SERVICES[0])

  const onSearch = (value: string) => {
    console.log("---value service --- ", value)
  }

  return (
    <motion.div
      data-cy="service-banner"
      className={`${styles.container} ${active ? styles.active : ""}`}
      initial={{ opacity: 0, right: -200, visibility: "hidden", }}
      animate={{ opacity: 1, right: 24, visibility: "visible", }}
      exit={{ opacity: 0, right: -200, visibility: "hidden", }}
      transition={{ duration: 0.5, }}
    >
      <div className={styles.sectionSegments}>
        <Segments
          values={SERVICES}
          active={activeService}
          setActive={setActiveService}
          type="primary"
        />
      </div>
      <div className={styles.titleAndSearch}>
        <h2>Меняйте услуги на услуги. Помогайте другим. Общайтесь.</h2>
        <SearchField onSearch={onSearch} />
      </div>
      <div className={styles.peopleContainer}>
        <div className={styles.titleWrapper}>
          <h3>Популярные предложения</h3>
          <div className={styles.totalOval}><span>80</span></div>
        </div>
        <ul className={styles.peoples}>
          {
            MOCK_DATA_PEOPLE?.map((item, index) => (
              <PeopleCard
                setDataProfile={setDataAndActive}
                key={`${item?.geo}_{index}`}
                photo={item?.photo}
                name={item?.name}
                rate={item?.rate}
                services={item?.services}
                geo={item?.geo}
              />
            ))
          }
        </ul>
      </div>
      <span className={styles.glassShadowOne} />
      <span className={styles.glassShadowTwo} />
      <span className={styles.glassShadowThree} />
    </motion.div>
  )
}

export default ServiceBanner