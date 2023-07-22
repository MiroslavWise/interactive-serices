import { useRouter } from "next/navigation"
import Image from "next/image"
// import dayjs from "dayjs"

import type { TCardOffer } from "./types"

import { BlockCoin } from "./components/BlockCoin"
import { BlockBarter } from "./components/BlockBarter"
import { ButtonCircleGradient } from "@/components/common/Buttons"

import styles from "./style.module.scss"
import { BlockTitle } from "./components/BlockTitle"

export const CardOffer: TCardOffer = ({
  name, photo, chatId, finality, price, date, geo, rating,
}) => {
  const { push } = useRouter()

  return (
    <li className={styles.container}>
      <section className={styles.main}>
        <BlockTitle {...{name, photo, geo, price, rating }} />
        <BlockBarter />
      </section>
      <footer>
        <div className={styles.date}>
          <Image
            src="/svg/calendar.svg"
            alt="calendar"
            width={16}
            height={16}
          />
          <p>{date}</p>
        </div>
        <div className={styles.end}>
          {
            finality
              ? (
                <div className={styles.verification}>
                  <Image
                    src="/svg/success.svg"
                    alt="finality"
                    width={17}
                    height={17}
                  />
                </div>
              ) : null
          }
          <ButtonCircleGradient
            type="primary"
            icon="/svg/message-dots-circle.svg"
            size={16}
          />
        </div>
      </footer>
    </li>
  )
}