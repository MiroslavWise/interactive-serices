import styles from "@/scss/loading.module.scss"

export const dynamic = "force-static"
export const dynamicParams = false
export const revalidate = false
export const fetchCache = "force-cache"

export default function Loading() {
  return <main className={styles.containerLoading} />
}
