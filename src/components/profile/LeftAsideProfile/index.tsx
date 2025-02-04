import { useEffect } from "react"

import { FooterAsideLeft } from "./components/Footer"
import { BlockProfileAside, ButtonFriends } from "@/components/profile"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

function LeftAsideProfile() {
  return (
    <aside
      className={cx(
        styles.asideLeft,
        "max-md:!hidden fixed left-0 bottom-6 w-full rounded-2 translate-x-6 flex flex-col justify-between items-center gap-5 bg-BG-second z-[2]",
        styles.default,
      )}
      data-test="left-aside-profile"
      data-is-banner={false}
    >
      <ul className="w-full p-5 h-full overflow-y-auto flex flex-col gap-5">
        <BlockProfileAside />
        <ButtonFriends />
        <FooterAsideLeft />
      </ul>
    </aside>
  )
}

LeftAsideProfile.displayName = "LeftAsideProfile"
export default LeftAsideProfile
