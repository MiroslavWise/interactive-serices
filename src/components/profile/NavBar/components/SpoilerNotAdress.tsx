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
    const { setVisible } = useUpdateProfile()

    return (
        <motion.div
            data-visible={active}
            className={styles.containerSpoiler}
            onClick={() => setActive(false)}
        >
            <p>
                Извинитуе, вы не можете создать своё предложение или запрос,
                пока вы не{" "}
                <span
                    onClick={() => {
                        setVisible(true)
                    }}
                >
                    добавьте
                </span>
                , хотя-бы, один адрес в свой профиль.
            </p>
        </motion.div>
    )
}
