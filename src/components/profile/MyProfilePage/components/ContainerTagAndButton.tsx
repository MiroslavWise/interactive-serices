"use client"

// import Image from "next/image"
import { isMobile } from "react-device-detect"

import type { TContainerTagAndButton } from "./types/types"

// import { ButtonDefault } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ContainerTagAndButton: TContainerTagAndButton = ({}) => {
    return (
        <div
            className={cx(
                styles.containerTagAndButton,
                isMobile && styles.mobile,
            )}
        >
            <h4>Мои предложения</h4>
            {/* <ButtonDefault
        prefix={<Image src="/icons/fill/trash.svg" alt="trash" width={16} height={16} />}
        label="Удалить все мои предложения"
        classNames={cx(styles.classNamesButton)}
      /> */}
        </div>
    )
}
