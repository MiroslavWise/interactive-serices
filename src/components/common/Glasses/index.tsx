import styles from "./style.module.scss"

const GLASSES = [1, 2, 3]

export const Glasses = () =>
    GLASSES.map((item) => (
        <span
            key={`${item}-glass`}
            className={styles[`containerGlass${item}`]}
        />
    ))
export const GlassesBanner = () =>
    GLASSES.map((item) => (
        <span
            key={`${item}-glass-banner`}
            className={styles[`glass-banner-${item}`]}
        />
    ))
