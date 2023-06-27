"use client"

import { useState } from "react";

import type { ISegmentValues } from "../../../types/general";

import { Segments } from "../../../components/Segments";
import { SearchField } from "../../../components/Inputs";
import { PeopleCard } from "../../../components/PeopleCard";

import styles from "./styles/style.module.scss";
import { MOCK_DATA_PEOPLE, SERVICES } from "./constants";

const ServiceBanner = () => {
  const [active, setActive] = useState<ISegmentValues>(SERVICES[0])

  const onSearch = (value: string) => {
          console.log("---value service --- ", value)
  }

  return (
    <div className={styles.container}>
      <section className={styles.sectionSegments}>
        <Segments
          values={SERVICES}
          active={active}
          setActive={setActive}
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
    </div>
  )
}

export default ServiceBanner;