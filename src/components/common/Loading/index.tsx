import { cx } from "@/lib/cx"
import styles from "./styles/style.module.scss"

export function LoadingProfile() {
  return (
    <div className={styles.containerProfile} data-loading-profile>
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
    <div className={styles.containerBarter}>
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

export function ThreadLoading() {
  return (
    <div className={styles.container}>
      <LoadingProfile />
      <span data-footer />
    </div>
  )
}

export function LoadingMyOffer() {
  return (
    <div className={styles.containerMyOffer}>
      <div data-header>
        <span data-title />
        <span data-rating />
      </div>
      <div data-want>
        <span data-prefix />
        <span data-p />
      </div>
      <div data-can>
        <span data-prefix />
        <span data-category />
        <span data-category />
      </div>
      <div data-image>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div data-footer>
        <span data-button />
        <span />
      </div>
    </div>
  )
}

export function LoadingFeedback() {
  return (
    <div className={styles.containerFeedback}>
      <div data-header>
        <span data-user />
        <span data-rating />
      </div>
      <div data-content>
        <span />
        <span />
      </div>
    </div>
  )
}

export * from "./Threads/LoadingThreadsPage"
export * from "./Threads/ComponentLoadingThread"
export * from "./Threads/LoadingThreadNotice"
export * from "./Threads/LoadingInput"
