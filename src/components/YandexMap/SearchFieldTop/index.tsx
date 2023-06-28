import type { TSearchFieldTop } from "./types"

import { SearchElementMap } from "@/components/common/Inputs/ui/SearchElementMap"

import styles from "./styles/style.module.scss"

export const SearchFieldTop: TSearchFieldTop = ({ }) => {
  
  return (
    <section className={styles.container}>
      <SearchElementMap />
    </section>
  )
}