import { type Dispatch } from "react"

import { IResponseOffers } from "@/services/offers/types"

import ItemOffers from "./ItemOffers"
import PaginationRS from "@/components/common/PaginationRS"

interface IProps {
  items: IResponseOffers[]
  page: number
  onPage: Dispatch<number>
  total?: number
}

const CN_UL = "w-full h-fit grid grid-cols-3 max-2xl:grid-cols-2 max-xl:grid-cols-1 overflow-y-visible z-10 pb-5 gap-2.5 md:gap-4"

function ContainerOffers({ items, page, onPage, total }: IProps) {
  return (
    <ul className={CN_UL} data-test="profile-container-suggestions">
      {items.map((item) => (
        <ItemOffers key={`:key:post:${item.id}:`} offer={item} />
      ))}
      <div className="w-full col-span-full flex items-center justify-center md:justify-start">
        <PaginationRS page={page} onPage={onPage} total={total} />
      </div>
    </ul>
  )
}

ContainerOffers.displayName = "ContainerOffers"
export default ContainerOffers
