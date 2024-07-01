import { type IParamsCustomer } from "../layout"

import Wrapper from "./components/Wrapper"
import ItemsFeedback from "./components/ItemsFeedback"
import TotalAndFilterFeedback from "./components/TotalAndFilterFeedback"
import WrapperContextSortCustomer from "./components/WrapperContextSort"

export default ({ params }: IParamsCustomer) => {
  const id = params?.userId

  if (!id) return null

  return (
    <Wrapper>
      <header className="w-full flex flex-col items-center gap-0.625 pb-0.625">
        <h3 className="text-text-primary text-base text-center font-semibold">Отзывы</h3>
      </header>
      <WrapperContextSortCustomer>
        <TotalAndFilterFeedback id={id!} />
        <ItemsFeedback id={id!} />
      </WrapperContextSortCustomer>
    </Wrapper>
  )
}
