import ListMessages from "./components/ListMessages"
import HeaderAndNavigation from "./components/HeaderAndNavigation"
import { cx } from "@/lib/cx"

export default () => {
  return (
    <section
      className={cx(
        "w-full h-full md:rounded-[2rem] bg-BG-second flex flex-col md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] overflow-hidden",
        "max-md:!pt-[var(--height-mobile-header)] max-md:!pb-[var(--height-mobile-footer-nav)]",
      )}
    >
      <HeaderAndNavigation />
      <ListMessages />
    </section>
  )
}
