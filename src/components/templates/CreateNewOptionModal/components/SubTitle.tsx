import type { TSubTitle } from "./types/types"

import styles from "./styles/sub-title.module.scss"

export const SubTitle: TSubTitle = ({ children }) => {
    return (
        <div className={styles.container}>
            <h4>{children}</h4>
        </div>
    )
}
