import styles from "./layout-terms.module.scss"

export default function LayoutTerms({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <section>{children}</section>
    </div>
  )
}
