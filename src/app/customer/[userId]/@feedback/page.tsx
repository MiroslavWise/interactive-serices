import { type IParamsCustomer } from "../layout"

import ItemsFeedback from "./components/ItemsFeedback"
import TotalAndFilterFeedback from "./components/TotalAndFilterFeedback"
import WrapperContextSortCustomer from "./components/WrapperContextSort"

import { cx } from "@/lib/cx"

export default ({ params }: IParamsCustomer) => {
  const id = params?.userId

  if (!id) return null

  return (
    <aside
      className={cx(
        "w-full h-full rounded-[2rem] overflow-hidden bg-BG-second flex flex-col justify-start pt-5 px-5 max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)]",
        "max-md:fixed max-md:hidden",
      )}
    >
      <header className="w-full flex flex-col items-center gap-0.625 pb-0.625">
        <h3 className="text-text-primary text-base text-center font-semibold">Отзывы</h3>
      </header>
      <WrapperContextSortCustomer>
        <TotalAndFilterFeedback id={id!} />
        <ItemsFeedback id={id!} />
      </WrapperContextSortCustomer>
    </aside>
  )
}
