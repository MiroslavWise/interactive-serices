import { TCardReview } from "./types"

import styles from "./style.module.scss"
import Image from "next/image"
import { Rate } from "components/Rate"

export const CardReview: TCardReview = ({ user, date, rate, description, images }) => {

        return (
                <li className={styles.container}>
                        <div className={styles.content}>
                                <header className={styles.header}>
                                        <div className={styles.userDate}>
                                                <a>{user}</a>
                                                <p>{date}</p>
                                        </div>
                                        <Rate rate={rate} />
                                </header>
                                <p className={styles.description}>{description}</p>
                                <footer className={styles.images}>
                                        {
                                                Array.isArray(images)
                                                        ? images?.map(item => (
                                                                <Image
                                                                        src={item}
                                                                        alt={item}
                                                                        width={100}
                                                                        height={72}
                                                                />
                                                        )) : null
                                        }
                                </footer>
                        </div>
                </li>
        )
}