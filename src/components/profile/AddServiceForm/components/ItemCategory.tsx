import { useState } from "react"
import { UseFormSetValue } from "react-hook-form"

import type { IMainAndSubCategories, IValuesCategories } from "../types/types"

import { ImageCategory } from "@/components/common"

export const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
  </svg>
)

export function ItemCategory(props: IMainAndSubCategories & { setValue: UseFormSetValue<IValuesCategories>; idsActive: number[] }) {
  const { main, subs, idsActive, setValue } = props ?? {}
  const [expand, setExpand] = useState(false)

  return (
    <a data-expand={expand} data-test={`main-expand-change-service-${main?.id}`} className="relative w-full flex flex-col items-end gap-3">
      <div
        data-main
        className="w-full h-[3.6875rem] flex flex-row items-center gap-5"
        data-disabled={idsActive?.length >= 5 && !idsActive?.includes(main?.id)}
      >
        <button
          type="button"
          data-check={idsActive?.includes(main?.id)}
          onClick={(event) => {
            event.stopPropagation()
            if (idsActive?.length >= 5 && !idsActive?.includes(main?.id)) {
              return
            }
            if (idsActive?.includes(main.id)) {
              setValue(
                "categories",
                idsActive.filter((item_) => item_ !== main?.id),
              )
            } else {
              setValue("categories", [...idsActive, main.id])
            }
          }}
          data-test={`button-main-expand-change-service-on-checked`}
        >
          <IconCheck />
        </button>
        <span
          onClick={(event) => {
            event.stopPropagation()
            setExpand((prev) => !prev)
          }}
        >
          <div data-img>
            <ImageCategory slug={main?.slug} provider={main?.provider} />
          </div>
          <p>{main.title}</p>
          <img data-img-expand src="/svg/chevron-down-gray.svg" alt="down" width={24} height={24} />
        </span>
      </div>
      <div data-subs>
        {subs.map((item) => (
          <div
            key={`::item::sub::category::${item?.id!}::`}
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
                <ImageCategory slug={item?.slug} provider={item?.provider} />
              </div>
              <p>{item.title}</p>
            </span>
          </div>
        ))}
      </div>
    </a>
  )
}
