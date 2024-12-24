import { FooterAsideLeft } from "./components/Footer"
import {
  BlockProfileAside,
  // BlockDesiredServices,
  ButtonFriends,
} from "@/components/profile"

import { cx } from "@/lib/cx"
// import { useBanner } from "@/store"

import styles from "./styles/style.module.scss"

function LeftAsideProfile({}: { isCollapsed?: boolean; isBanner?: boolean }) {
  return (
    <aside
      className={cx(
        styles.asideLeft,
        "max-md:!hidden fixed left-0 bottom-6 w-full rounded-2 translate-x-6 flex flex-col justify-between items-center gap-5 bg-BG-second z-[2]",
        // isCollapsed && "!-translate-x-[17.5rem]",
        styles.default,
      )}
      data-test="left-aside-profile"
      data-is-banner={false}
    >
      <ul className="w-full p-5 h-full overflow-y-auto flex flex-col gap-5">
        <BlockProfileAside />
        <ButtonFriends />
        {/* <BlockDesiredServices /> */}
        <FooterAsideLeft />
      </ul>
    </aside>
  )
}

LeftAsideProfile.displayName = "LeftAsideProfile"
export default LeftAsideProfile
