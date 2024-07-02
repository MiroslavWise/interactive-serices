import { type IParamsCustomer } from "../layout"

import Wrapper from "./components/Wrapper"
import ButtonClose from "./components/ButtonClose"
import ItemsFeedback from "./components/ItemsFeedback"
import TotalAndFilterFeedback from "./components/TotalAndFilterFeedback"

export default ({ params }: IParamsCustomer) => {
  const id = params?.userId

  if (!id) return null

  return (
    <Wrapper>
      <header className="w-full flex flex-col items-start md:items-center gap-0.625 max-md:pt-5 max-md:px-5 pb-4 md:pb-0.625 max-md:relative max-md:border-b-[1px] max-md:border-solid max-md:border-grey-separator">
        <h3 className="text-text-primary text-base text-center font-semibold">Отзывы</h3>
        <ButtonClose />
      </header>
      <TotalAndFilterFeedback id={id!} />
      <ItemsFeedback id={id!} />
    </Wrapper>
  )
}
