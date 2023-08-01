import Image from "next/image"
import { type ChangeEvent } from "react"

import type { TImageUploadComponent } from "./types/types"

import { ButtonDefault, ButtonsCircle } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ImageUploadComponent: TImageUploadComponent = ({ selectedImage, setSelectedImage, setFile }) => {

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      setFile(file)
    }
  }

  function handleImageReset() {
    setSelectedImage(null)
  }

  return (
    <div className={styles.imageUploader}>
      <div className={cx(styles.imageContainer, selectedImage && styles.imageActive)}>
        {
          selectedImage
            ? (
              <>
                <Image
                  src={selectedImage}
                  alt="upload"
                  width={300}
                  height={300}
                  className={styles.img}
                />
                <div className={styles.buttonsContainerImage}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="imageInput"
                    className={styles.inputFile}
                  />
                  <label htmlFor="imageInput" className={styles.button}>
                    <ButtonsCircle
                      src="/svg/download.svg"
                      type="primary"
                    />
                  </label>
                  <ButtonDefault
                    type="primary"
                    label="Удалить"
                    handleClick={handleImageReset}
                  />
                </div>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="imageInput"
                  className={styles.inputFile}
                />
                <label htmlFor="imageInput" className={styles.uploadButton}>
                  <p>Загрузить изображение</p>
                </label>
              </>
            )
        }
      </div>
    </div>
  )
}