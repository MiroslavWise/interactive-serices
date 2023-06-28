"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import type { TServiceBanner } from "./types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common/Segments"
import { SearchField } from "@/components/common/Inputs"
import { PeopleCard } from "@/components/common/PeopleCard"

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
      className={`${styles.container} ${active ? styles.active : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.sectionSegments}>
        <Segments
          values={SERVICES}
          active={activeService}
          setActive={setActiveService}
          type="primary"
        />
      </section>
      <section className={styles.titleAndSearch}>
        <h2>Меняйте услуги на услуги. Помогайте другим. Общайтесь.</h2>
        <SearchField onSearch={onSearch} />
      </section>
      <section className={styles.peopleContainer}>
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
      </section>

      <span className={styles.glassShadowOne} />
      <span className={styles.glassShadowTwo} />
      <span className={styles.glassShadowThree} />
    </motion.div>
  )
}

export default ServiceBanner