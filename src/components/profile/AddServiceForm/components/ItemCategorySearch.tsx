import { UseFormSetValue } from "react-hook-form"

import { IValuesCategories } from "../types/types"
import { IResponseOffersCategories } from "@/services/offers-categories/types"

import { ImageCategory } from "@/components/common"
import { IconCheck } from "./ItemCategory"

import { IconCategory } from "@/lib/icon-set"

interface IProps {
  item: IResponseOffersCategories

  idsActive: number[]
  setValue: UseFormSetValue<IValuesCategories>
}

function ItemCategorySearch({ setValue, idsActive, item }: IProps) {
  return (
    <div
      data-item
      data-active={idsActive.includes(item?.id!)}
      onClick={(event) => {
        event.stopPropagation()
        if (idsActive?.length >= 5 && !idsActive.includes(item?.id!)) {
          return
        }
        if (idsActive?.includes(item.id)) {
          setValue(
            "categories",
            idsActive.filter((item_) => item_ !== item?.id),
          )
        } else {
          setValue("categories", [...idsActive, item.id])
        }
      }}
      data-disabled={idsActive?.length >= 5 && !idsActive.includes(item?.id!)}
      data-test={`sub-expand-change-service-${item.id}`}
    >
      <div data-check>{idsActive.includes(item?.id!) ? <IconCheck /> : null}</div>
      <span>
        <div data-img>
          <ImageCategory id={item?.id!} slug={item?.slug} provider={item?.provider} />
        </div>
        <p>{item.title}</p>
      </span>
    </div>
  )
}

ItemCategorySearch.displayName = "ItemCategorySearch"
export default ItemCategorySearch
