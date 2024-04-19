import styles from "./style.module.scss"

const LoadingModal = () => (
  <>
    <header className={styles.header}>
      <span />
    </header>
    <article className={styles.article}>
      <span />
      <span />
      <span />
    </article>
  </>
)

export const Load = () => <LoadingModal />
