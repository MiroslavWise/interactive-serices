import dynamic from "next/dynamic"
import { type ReactNode } from "react"
import WrapperCurrentAndCompleted from "./components/WrapperCurrentAndCompleted"
const ItemsToggleSwitch = dynamic(() => import("./components/ItemsToggleSwitch"), {
  ssr: false,
  loading: () => (
    <ul className="loading-screen w-full h-11 rounded-[1.375rem] border border-solid border-grey-stroke-light py-2 px-3 flex flex-row gap-2.5 [&>span]:w-full [&>span]:rounded-[0.875rem] [&>span]:h-7">
      <span />
      <span />
    </ul>
  ),
})

export default ({ children }: { children: ReactNode }) => {
  return (
    <aside className="w-full h-full md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] rounded-[2rem] md:pt-5 md:px-5 flex flex-col gap-2.5 bg-BG-second">
      <WrapperCurrentAndCompleted>
        <header className="w-full flex flex-col gap-4 items-center">
          <h3 className="text-text-primary text-center text-base font-semibold">Мои обмены</h3>
          <ItemsToggleSwitch />
        </header>
        {children}
      </WrapperCurrentAndCompleted>
    </aside>
  )
}
