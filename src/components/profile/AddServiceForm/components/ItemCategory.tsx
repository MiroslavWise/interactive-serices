import { memo, useState } from "react"
import { UseFormSetValue } from "react-hook-form"

import type { IMainAndSubCategories, IValuesCategories } from "../types/types"

import { IconCategory } from "@/lib/icon-set"

export const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

export const ItemCategory = memo(function ItemCategory(
  props: IMainAndSubCategories & { setValue: UseFormSetValue<IValuesCategories>; idsActive: number[] },
) {
  const { main, subs, idsActive, setValue } = props ?? {}
  const [expand, setExpand] = useState(false)

  return (
    <a data-expand={expand} data-test={`main-expand-change-service-${main?.id}`}>
      <div data-main data-disabled={idsActive?.length >= 5 && !idsActive?.includes(main?.id)}>
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
            <img
              src={IconCategory(main.id!)}
              alt="cat"
              height={16}
              width={16}
              onError={(error: any) => {
                if (error?.target) {
                  try {
                    error.target.src = `/svg/category/default.svg`
                  } catch (e) {
                    console.log("catch e: ", e)
                  }
                }
              }}
            />
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
                <img
                  src={IconCategory(item.id!)}
                  alt="cat"
                  height={16}
                  width={16}
                  onError={(error: any) => {
                    if (error?.target) {
                      try {
                        error.target.src = `/svg/category/default.svg`
                      } catch (e) {
                        console.log("catch e: ", e)
                      }
                    }
                  }}
                />
              </div>
              <p>{item.title}</p>
            </span>
          </div>
        ))}
      </div>
    </a>
  )
})
