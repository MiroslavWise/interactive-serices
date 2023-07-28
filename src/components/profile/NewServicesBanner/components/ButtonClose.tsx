import Image from "next/image"

import { useVisibleBannerNewServices } from "@/store/hooks/useVisible"

import styles from "./styles/styles.module.scss"

export const ButtonClose = () => {
  const { setIsVisibleNewServicesBanner } = useVisibleBannerNewServices() ?? {}
  return (
    <div className={styles.containerClose} onClick={() => setIsVisibleNewServicesBanner(false)}>
      <Image
        src="/svg/x-close.svg"
        alt="x"
        width={20}
        height={20}
      />
    </div>
  )
}