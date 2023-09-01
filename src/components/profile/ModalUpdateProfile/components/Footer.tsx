

import type { TFooter } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"

import styles from "./styles/footer.module.scss"

export const Footer: TFooter = ({
    loading,
}) => {

    return (
        <footer className={styles.container}>
            <ButtonFill
                label="Сохранить"
                classNames={styles.button}
                disabled={loading}
                submit="submit"
            />
        </footer>
    )
}