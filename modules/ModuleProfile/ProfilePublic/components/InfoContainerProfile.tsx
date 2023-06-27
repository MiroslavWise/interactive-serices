import Image from "next/image"

import type { TInfoContainerProfile } from "./types"

import { ButtonFill } from "components/Buttons"
import { ButtonsCircle } from "components/Buttons/ui/ButtonsCircle"

import styles from './style.module.scss'


const MOCK_ACHIEVEMENTS: string[] = [
        "/svg/achievements/arms.svg",
        "/svg/achievements/gold-medal.svg",
        "/svg/achievements/shield-crown.svg",
        "/svg/achievements/shield.svg",
]

export const InfoContainerProfile: TInfoContainerProfile = ({}) => {

        return (
                <section className={styles.infoContainerProfile}>
                        <div className={styles.avatarAndAchievements}>
                                <div className={styles.avatar}>
                                        <Image
                                                className={styles.photo}
                                                src="/mocks/elena.png"
                                                alt='profile'
                                                width={94}
                                                height={94}
                                        />
                                        <Image
                                                className={styles.verified}
                                                src="/svg/verified-tick.svg"
                                                alt='tick'
                                                width={32}
                                                height={32}
                                        />
                                </div>
                                <ul className={styles.achievements}>
                                        {
                                                MOCK_ACHIEVEMENTS.map(item => (
                                                        <Image
                                                                src={item}
                                                                alt={item}
                                                                key={item}
                                                                width={36}
                                                                height={36}
                                                        />
                                                ))
                                        }
                                </ul>
                        </div>
                        <div className={styles.titleAndGeoAndDescription}>
                                <div className={styles.nameGeoDescription}>
                                        <div className={styles.nameAndGeo}>
                                                <h2>Дженни Уилсон</h2>
                                                <div className={styles.geo}>
                                                        <Image
                                                                src="/svg/geo-marker.svg"
                                                                alt='geo'
                                                                width={20}
                                                                height={20}
                                                        />
                                                        <p>Inglewood, Maine</p>
                                                </div>
                                        </div>
                                        <p className={styles.description}>
                                                Я Дженни Уилсон, любопытный и полный энтузиазма человек жаждой жизни и жаждой знаний. Растущий оживленном и мультикультурном городе, я всегда был чарован разнообразием культур.
                                        </p>
                                </div>
                                <section className={styles.buttons}>
                                        <ButtonFill
                                                label="Добавить в друзья"
                                                small
                                                shadow
                                        />
                                        <ButtonsCircle
                                                src="/svg/message-dots-circle.svg"
                                                type="primary"
                                        />
                                        <ButtonsCircle
                                                src="/svg/repeat-01.svg"
                                                type="primary"
                                        />
                                </section>
                        </div>
                </section>
        )
}