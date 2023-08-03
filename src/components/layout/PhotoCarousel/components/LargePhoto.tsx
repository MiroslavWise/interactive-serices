import Image from "next/image"

import { useVisiblePhotosCarousel } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function LargePhoto() {
  const { currentPhoto } = useVisiblePhotosCarousel()

  return (
    <div className={styles.containerLargePhoto}>
      <Image
        src={currentPhoto?.url!}
        // src={"/mocks/suggestions/engin-akyurt-GXhGMhhzs9E-unsplash.jpg"}
        alt="large"
        height={1080}
        width={1920}
      />
    </div>
  )
}