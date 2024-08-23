import { FooterAsideLeft } from "./components/Footer"
import { BlockProfileAside, BlockDesiredServices, ButtonFriends } from "@/components/profile"

import { cx } from "@/lib/cx"
import { useBanner } from "@/store"

import styles from "./styles/style.module.scss"

function LeftAsideProfile({ isCollapsed = false, isBanner = false }: { isCollapsed?: boolean; isBanner?: boolean }) {
  const visibleBanner = useBanner(({ visible }) => visible)

  return (
    <aside
      className={cx(
        styles.asideLeft,
        "max-md:!hidden fixed left-0 bottom-6 w-full rounded-[2rem] translate-x-6 flex flex-col justify-between items-center gap-5 bg-BG-second z-[2]",
        isCollapsed && "!-translate-x-[17.5rem]",
        visibleBanner
          ? "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_var(--height-banner))] h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem_-_var(--height-banner))]"
          : "top-[calc(var(--height-header-nav-bar)_+_1.5rem)] h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]",
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
