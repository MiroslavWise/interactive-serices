import { ComponentLoadingThread } from "./ComponentLoadingThread"

import styles from "../styles/style.module.scss"

export function LoadingThreadsPage() {
    return (
        <div className={styles.containerThreadsPage}>
            <ComponentLoadingThread />
            <ComponentLoadingThread isRight />
            <ComponentLoadingThread />
            <ComponentLoadingThread isRight />
            <ComponentLoadingThread />
        </div>
    )
}
