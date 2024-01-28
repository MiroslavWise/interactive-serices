import styles from "../styles/style.module.scss"

export function LoadingThreadNotice() {
    return (
        <div className={styles.containerThreadNotice}>
            <div data-header>
                <span data-time />
                <span data-geo />
            </div>
            <span data-description />
        </div>
    )
}
