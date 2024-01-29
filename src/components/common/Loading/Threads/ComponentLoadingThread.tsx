import styles from "../styles/style.module.scss"

export function ComponentLoadingThread({ isRight }: { isRight?: boolean }) {
    return (
        <div className={styles.containerComponentLoadingThread} data-right={isRight}>
            <div>
                <span data-avatar />
                <span data-message />
            </div>
        </div>
    )
}
