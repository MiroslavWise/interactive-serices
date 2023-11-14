"use client"

// import { useState } from "react"
// import Image from "next/image"

import type { TContainerTagAndButton } from "./types/types"

// import { ButtonFill } from "@/components/common/Buttons"
// import { SpoilerNotAdress } from "../../NavBar/components/SpoilerNotAdress"

// import { useAddress } from "@/helpers"
// import { useVisibleNewServiceBarterRequests } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ContainerTagAndButton: TContainerTagAndButton = ({}) => {
    // const [active, setActive] = useState(false)
    // const { setIsVisibleNewServiceBarterRequests } =
    //     useVisibleNewServiceBarterRequests()
    // const { isAddresses } = useAddress()

    return (
        <div className={styles.containerTagAndButton}>
            <h4>Мои предложения</h4>
            {/* <ButtonFill
                type="primary"
                label="Добавить"
                classNames={styles.widthButton}
                suffix={
                    <Image
                        src="/svg/plus.svg"
                        alt="plus"
                        width={16}
                        height={16}
                    />
                }
                handleClick={() => {
                    if (isAddresses) {
                        setIsVisibleNewServiceBarterRequests(true)
                    } else {
                        setActive(true)
                    }
                }}
            /> */}
            {/* <SpoilerNotAdress {...{ active, setActive }} /> */}
        </div>
    )
}
