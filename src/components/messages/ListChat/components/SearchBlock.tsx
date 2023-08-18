


import { SearchInput } from "@/components/common/Inputs"
import styles from "./styles/style.module.scss"

export const SearchBlock = () => {

  return (
    <div className={styles.blockSearch}>
      <SearchInput
        placeholder="Поиск пользователя"
      />
    </div>
  )
}