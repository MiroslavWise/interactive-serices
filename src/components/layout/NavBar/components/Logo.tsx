import Link from "next/link"

import styles from "../styles/components.module.scss"

export const Logo = () => (
  <Link href={"/"} className={styles.logo}>
    <img src="/logo/wordmark.svg" alt="logo" width={117} height={30} />
  </Link>
)
