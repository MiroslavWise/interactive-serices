import { motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"

import { useUpdateProfile } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const SpoilerNotAdress = ({
    active,
    setActive,
}: {
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
}) => {
    const { setVisible } = useUpdateProfile((_) => ({
        setVisible: _.setVisible,
    }))

    return (
        <motion.div
            data-visible={active}
            className={styles.containerSpoiler}
            onClick={() => setActive(false)}
        >
            <p>
                <span
                    onClick={() => {
                        setVisible(true)
                    }}
                >
                    Добавьте
                </span>{" "}
                адрес в разделе “Редактирование профиля”, чтобы создавать
                предложения и запросы на карте Sheira
            </p>
        </motion.div>
    )
}
