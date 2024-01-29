import styles from "../styles/style.module.scss"

export function LoadingInput() {
    return (
        <div className={styles.containerLoadingInput}>
            <span data-circle />
            <span data-input />
        </div>
    )
}
