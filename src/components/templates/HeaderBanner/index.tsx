import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { useTheme } from "next-themes"

import { ButtonCloseHeaderBanner } from "./ButtonClose"
import { IconChevron } from "@/components/icons/IconChevron"
import PromotionalBadge from "@/components/common/PromotionalBadge"

import styles from "./style.module.scss"

const BALLS = [1, 2, 3, 4]
const TITLE = "Выиграй iPhone 15!"

const day = format(new Date(), "dd") || 0
const time = Math.round(Number(day) % 3)

function HeaderBanner() {
  const { systemTheme } = useTheme()

  const erid =
    time === 0
      ? systemTheme === "light"
        ? "LjN8KMsno"
        : systemTheme === "dark"
        ? "LjN8KMCpw"
        : "null"
      : time === 1
      ? "LjN8KPZCT"
      : time === 2
      ? "LjN8KQEAK"
      : "null"

  return (
    <article className={styles.container} data-time-number={time}>
      {BALLS.map((_) => (
        <span key={`::key::ball::${_}::`} data-c={_} />
      ))}
      <b>{TITLE}</b>
      <Link
        href={{
          pathname: `https://promo.sheira.ru`,
          query: {
            erid: erid,
          },
        }}
        target="_blank"
      >
        <span>Узнать подробности</span>
        <IconChevron />
      </Link>
      <div data-iphone="1">
        <Image src={"/png/iphone/Free_Iphone_15_Mockup____1.png"} width={245} height={44} alt="iphone2" unoptimized />
      </div>
      <div data-iphone="2">
        <Image src={"/png/iphone/Free_Iphone_15_Mockup.png"} width={150} height={44} alt="iphone2" unoptimized />
      </div>
      <div data-iphone-mobile>
        <Image src={"/png/iphone/Free_Iphone_15-mobile.png"} width={150} height={64} alt="iphone2" unoptimized />
      </div>
      <ButtonCloseHeaderBanner />
      <PromotionalBadge erid={erid} />
    </article>
  )
}

HeaderBanner.displayName = "HeaderBanner"
export default HeaderBanner
