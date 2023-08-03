import Image from "next/image"

import { ButtonFill } from "@/components/common/Buttons"

import styles from "./styles/style.module.scss"

export const Buttons = () => {

  return (
    <section className={styles.containerButtons}>
      <ButtonFill
        type="optional_pink"
        label="Изменить предложение"
        prefix={<Image src="/svg/edit-white.svg" alt="edit" width={16} height={16} />}
        classNames={styles.buttonFill}
      />
      <div className={styles.buttonTrash}>
        <Image 
          src="/svg/trash-black.svg"
          alt="trash"
          width={16}
          height={16}
        />
      </div>
    </section>
  )
}