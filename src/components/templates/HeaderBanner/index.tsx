import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

import { ButtonCloseHeaderBanner } from "./ButtonClose"
import { IconChevron } from "@/components/icons/IconChevron"
import PromotionalBadge from "@/components/common/PromotionalBadge"

import styles from "./style.module.scss"

const BALLS = [1, 2, 3, 4]
const COLORS_BALL = new Map([
  [1, "#35BFD2"],
  [2, "#35D2BF"],
  [3, "#35BFD2"],
  [4, "#35D2BF"],
])

const COLORS_BALL_LIGHT = new Map([
  [1, "#FF03F5"],
  [2, "#7F53FF"],
  [3, "#7F53FF"],
  [4, "#FF03F5"],
])

const COLORS_BALL_DARK = new Map([
  [1, "#FF03F5"],
  [2, "#7F53FF"],
  [3, "#7F53FF"],
  [4, "#FF03F5"],
])
const TITLE = "Выиграй iPhone 15!"

function HeaderBanner() {
  const { systemTheme } = useTheme()

  const erid = systemTheme === "light" ? "LjN8KMsno" : systemTheme === "dark" ? "LjN8KMCpw" : "LjN8KPZCT"

  return (
    <article className={styles.container}>
      {BALLS.map((_) => (
        <span
          key={`::key::ball::${_}::`}
          data-c={_}
          style={{
            backgroundColor: `${(systemTheme === "light" ? COLORS_BALL_LIGHT : systemTheme === "dark" ? COLORS_BALL_DARK : COLORS_BALL).get(
              _,
            )}`,
          }}
        />
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
      <PromotionalBadge erid={systemTheme === "light" ? "LjN8KMsno" : systemTheme === "dark" ? "LjN8KMCpw" : "LjN8KPZCT"} />
    </article>
  )
}

HeaderBanner.displayName = "HeaderBanner"
export default HeaderBanner
