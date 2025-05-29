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
    <div
      className={cx(
        styles.containerBarter,
        "p-3 gap-2.5 rounded-2xl bg-BG-second border border-solid border-x-grey-stroke-light flex flex-col w-full",
        "loading-screen",
      )}
    >
      <LoadingProfile />
      <div data-content className="w-full flex flex-row items-center">
        <span data-category className="h-8 rounded-2xl" />
        <span data-repeat className="w-8 h-8" />
        <span data-category className="h-8 rounded-2xl" />
      </div>
      <div data-footer className="w-full flex flex-row items-center justify-between">
        <span data-time className="w-16" />
        <span data-circle className="w-10 h-10 p-5 rounded-full" />
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
        <span className="h-9 w-9 rounded-.625" />
        <span className="h-4 rounded-lg" />
      </article>
    </div>
  )
}

export function LoadingFeedback() {
  return (
    <section className="loading-screen w-full flex flex-col gap-4 max-md:px-5">
      {[1, 2, 3].map((_) => (
        <div key={`::key::load::feedback::${_}::`} className="w-full flex flex-col gap-4">
          <div className="w-full h-1px bg-grey-field" />
          <div className="w-full grid grid-cols-[2.25rem_minmax(0,1fr)] gap-[0.45rem]">
            <span className="w-full h-9 rounded-.625" />
            <div className="w-full flex flex-col [&>span]:w-full [&>span]:h-4 [&>span]:rounded-lg gap-1">
              <span className="max-w-[11.1875rem]" />
              <span className="max-w-[6.875rem]" />
            </div>
          </div>
          <span className="w-full rounded-2xl h-[6.875rem]" />
        </div>
      ))}
    </section>
  )
}
