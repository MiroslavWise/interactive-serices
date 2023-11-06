import styles from "../styles/glasses.module.scss"

const GLASSES = ["orange", "purple", "blue"]

export const Glasses = () =>
    GLASSES.map((item) => <span key={item} className={styles[item]} />)
