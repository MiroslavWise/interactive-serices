import styles from "./layout.module.scss"

export default ({ children }: { children: React.ReactNode }) => (
  <main className={styles.main}>
    <section>{children}</section>
  </main>
)
