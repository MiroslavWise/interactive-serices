"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import type { TNewServicesBanner } from "./types/types"

import { Glasses } from "./components/Glasses"
import { ButtonClose } from "@/components/common/Buttons"
import { NewCreateBadge } from "./components/NewCreateBadge"

import { NEW_CREATE_BADGES } from "./constants"
import { useVisibleBannerNewServices } from "@/store/hooks/useVisible"

import styles from "./styles/style.module.scss"

export const NewServicesBanner: TNewServicesBanner = ({}) => {
    const { isVisibleNewServicesBanner, setIsVisibleNewServicesBanner } =
        useVisibleBannerNewServices()

    function close() {
        setIsVisibleNewServicesBanner(false)
    }

    return isVisibleNewServicesBanner ? (
        <div
            className={styles.wrapper}
            data-mobile={isMobile}
            data-active={isVisibleNewServicesBanner}
        >
            <motion.div
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                exit={{ opacity: 0, visibility: "hidden" }}
                transition={{ duration: 0.5 }}
                data-container
            >
                <h3>Я хочу создать</h3>
                <ul>
                    {NEW_CREATE_BADGES.filter((_) => _.value !== "offer").map(
                        (item) => (
                            <NewCreateBadge
                                key={`${item.value}_${item.label}`}
                                {...item}
                            />
                        ),
                    )}
                </ul>
                <ButtonClose
                    onClick={close}
                    position={{
                        right: 12,
                        top: 12,
                    }}
                />
                <Glasses />
            </motion.div>
        </div>
    ) : null
}
