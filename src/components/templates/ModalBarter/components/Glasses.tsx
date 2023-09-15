import styles from "./styles/style.module.scss"
const GLASSES = [1, 2, 3]
export const Glasses = () =>
    GLASSES.map((item) => (
        <span
            key={`${item}_glass_barter_modal`}
            className={styles[`glass${item}`]}
        />
    ))
