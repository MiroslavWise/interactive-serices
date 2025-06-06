import { ItemTrack } from "./ItemTrack"

import { useIntro } from "@/store"

import styles from "../styles/time-track.module.scss"

export const TimeTrack = () => {
  return (
    <nav className={styles.container}>
      <ul>
        {[0, 1, 2, 3, 4, 5, 6].map((item) => (
          <ItemTrack key={`${item}-track`} index={item} />
        ))}
      </ul>
    </nav>
  )
}
