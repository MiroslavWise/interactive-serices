import { cx } from "@/lib/cx"
import styles from "./styles/style.module.scss"

export function LoadingProfile() {
  return (
    <div className={cx(styles.containerProfile, "loading-screen")} data-loading-profile>
      <span data-avatar />
      <div>
        <span data-name />
        <span data-geo />
      </div>
    </div>
  )
}

export function LoadingBarters() {
  return (
    <div className={cx(styles.containerBarter, "loading-screen")}>
      <LoadingProfile />
      <div data-content>
        <span data-category />
        <span data-repeat />
        <span data-category />
      </div>
      <div data-footer>
        <span data-time />
        <span data-circle />
      </div>
    </div>
  )
}

export function ServiceLoading() {
  return (
    <div className="loading-screen w-full rounded-2xl flex flex-col gap-4 items-start p-4 bg-BG-second">
      <article className="w-full flex flex-col gap-3 items-start *:w-full">
        <span className="max-w-[36%] h-4 rounded-lg" />
        <span className="max-w-[55%] h-6 rounded-xl" />
      </article>
      <span className="w-full rounded-2xl h-52" />
      <article className="w-full grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2.5 items-center *:w-full">
        <span className="h-9 w-9 rounded-[0.625rem]" />
        <span className="h-4 rounded-lg" />
      </article>
    </div>
  )
}
