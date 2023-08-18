"use client"

import { useQuery } from "react-query"

import { SearchBlock } from "./components/SearchBlock"

import { profileService } from "@/services/profile"

import styles from "./styles/style.module.scss"
import { List } from "./components/List"

export const ListChat = () => {
  const { data, isLoading, error } = useQuery(["profiles"], () => profileService.getProfiles({ limit: 20 }))

  return (
    <section className={styles.container}>
      <header>
        <div className={styles.totalNumber}>
          <h4>Сообщения</h4>
          {
            data?.ok
              ? (
                <div className={styles.divNumber}>
                  <p>{data?.res?.length}</p>
                </div>
              ) : null
          }
        </div>
      </header>
      <SearchBlock />
      <List items={data?.res || []} />
    </section>
  )
}