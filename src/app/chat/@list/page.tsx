import { type IPropsChat } from "../layout"

import HeaderAndNavigation from "./components/HeaderAndNavigation"
import ListMessages from "./components/ListMessages"

export default ({ params }: IPropsChat) => {
  const { id } = params ?? {}

  return (
    <section className="w-full h-full rounded-[2rem] bg-BG-second flex flex-col">
      <HeaderAndNavigation />
      <ListMessages id={id} />
    </section>
  )
}
