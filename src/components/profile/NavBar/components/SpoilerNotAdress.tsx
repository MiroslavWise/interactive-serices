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
    const setVisible = useUpdateProfile(({ setVisible }) => setVisible)

    return (
        <div
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
        </div>
    )
}
