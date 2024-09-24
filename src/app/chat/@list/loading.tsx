import { cx } from "@/lib/cx"
import LoadingItem from "./components/LoadingItem"

export default () => (
  <div
    className={cx(
      "loading-screen w-full h-full max-md:h-screen max-h-screen md:rounded-2 bg-BG-second flex flex-col gap-2.5 md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] overflow-hidden",
      "max-md:!pt-[--height-mobile-header] max-md:!pb-[--height-mobile-footer-nav]",
    )}
  >
    <article className="w-full px-5 pt-5 flex flex-col ga-4">
      <span className="w-full h-12 rounded-3xl" />
      <div className="w-full grid grid-cols-4 gap-2.5 *:h-6 *:w-full *:rounded-xl">
        <span />
        <span />
        <span />
        <span />
      </div>
    </article>
    <ul className="w-full flex flex-col px-2.5 overflow-x-hidden overflow-y-scroll">
      {["li-1", "li-2", "li-3", "li-4", "li-5"].map((item) => (
        <LoadingItem key={`::key::${item}::${item}::l::message::`} />
      ))}
    </ul>
  </div>
)
