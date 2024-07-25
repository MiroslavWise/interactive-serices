import { FooterAsideLeft } from "./components/Footer"
import { BlockProfileAside, BlockDesiredServices, ButtonFriends } from "@/components/profile"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

function LeftAsideProfile({ isCollapsed = false, isBanner = false }: { isCollapsed?: boolean; isBanner?: boolean }) {
  return (
    <aside
      className={cx(
        styles.asideLeft,
        "max-md:!hidden fixed top-[calc(var(--height-header-nav-bar)_+_1.5rem)] left-0 bottom-6 w-full rounded-[2rem] translate-x-6 flex flex-col justify-between items-center gap-5 bg-BG-second z-[2]",
        isCollapsed && "!-translate-x-[17.5rem]",
      )}
      data-test="left-aside-profile"
      data-is-banner={isBanner}
    >
      <ul className="w-full p-5 h-full overflow-y-auto flex flex-col gap-5">
        <BlockProfileAside />
        <ButtonFriends />
        <BlockDesiredServices />
        <FooterAsideLeft />
      </ul>
    </aside>
  )
}

LeftAsideProfile.displayName = "LeftAsideProfile"
export default LeftAsideProfile
