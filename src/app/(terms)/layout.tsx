import styles from "./layout-terms.module.scss"

export const dynamic = "force-static"
export const dynamicParams = false

export default function LayoutTerms({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <section>{children}</section>
    </div>
  )
}
