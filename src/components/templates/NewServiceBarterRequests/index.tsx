"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import { Item } from "./components/Item"
import { ButtonClose } from "@/components/common/Buttons"
import { Glasses } from "../NewServicesBanner/components/Glasses"

import { NEW_CREATE_REQUESTS } from "./constants"
import { useVisibleNewServiceBarterRequests } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function NewServiceBarterRequests() {
    const {
        isVisibleNewServiceBarterRequests,
        dispatchNewServiceBarterRequests: setIsVisibleNewServiceBarterRequests,
    } = useVisibleNewServiceBarterRequests()

    return isVisibleNewServiceBarterRequests ? (
        <div
            className={styles.wrapper}
            data-mobile={isMobile}
            data-active={isVisibleNewServiceBarterRequests}
        >
            <motion.div
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                exit={{ opacity: 0, visibility: "hidden" }}
                transition={{ duration: 0.5 }}
                data-container
            >
                <h3>
                    Вы можете предложить услугу или попросить сообщество помочь
                    вам в чем-то. Просто попробуйте!
                </h3>
                <ul>
                    {NEW_CREATE_REQUESTS.map((item) => (
                        <Item key={`${item.imageSrc}-requests`} {...item} />
                    ))}
                </ul>
                <ButtonClose
                    onClick={() => setIsVisibleNewServiceBarterRequests(false)}
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
