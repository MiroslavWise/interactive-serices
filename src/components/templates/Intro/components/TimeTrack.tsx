import { ItemTrack } from "./ItemTrack"

import { useIntro } from "@/store/hooks"

import styles from "../styles/time-track.module.scss"

export const TimeTrack = () => {
    const page = useIntro(({ page }) => page)

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
