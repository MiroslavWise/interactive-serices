import styles from "./styles/style.module.scss"

const GLASSES = ["orangeCircle", "purpleCircle", "lightBlueCircle"]

export const Glasses = () => GLASSES.map(item => <span key={item} className={styles[item]} />)