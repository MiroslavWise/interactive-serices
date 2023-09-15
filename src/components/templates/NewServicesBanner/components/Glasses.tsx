const SPANS_GLASS: number[] = [1, 2, 3]
import styles from "./styles/styles.module.scss"
export const Glasses = () => SPANS_GLASS.map(item => <span key={`${item}_glass`} className={styles[`glass${item}`]} />)