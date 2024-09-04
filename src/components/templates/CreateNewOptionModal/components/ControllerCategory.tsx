import { useQuery } from "@tanstack/react-query"
import { memo, useCallback, useMemo, useState } from "react"
import { type Control, Controller, UseFormSetValue } from "react-hook-form"

import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"
import { IconChevron } from "@/components/icons/IconChevron"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { getOffersCategories } from "@/services"
import { TSchemaCreate } from "../utils/create.schema"
import { dispatchVisibleCreateNewCategory } from "@/store"

import styles from "../styles/list-category.module.scss"

interface IProps {
  control: Control<TSchemaCreate, any>
  visible: boolean
  disabled: boolean
  setValue: UseFormSetValue<TSchemaCreate>
}

function ControllerCategory({ control, visible, disabled, setValue: setValueForm }: IProps) {
  const [open, setOpen, ref] = useOutsideClickEvent()
  const [value, setValue] = useState("")
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.data || []
  const trimValue = value.trim().toLowerCase()

  const [expand, setExpand] = useState<number[]>([])

  function onExpand(id: number) {
    setExpand((_) => {
      if (_.includes(id)) {
        return _.filter((item) => item !== id)
      } else {
        return [..._, id]
      }
    })
  }

  const main = useMemo(() => categories.filter((item) => item.provider === "main"), [categories])
  const sub = useCallback((slug: string) => categories.filter((item) => item.provider === slug), [categories])

  const list = useMemo(
    () => categories.filter((_) => (!trimValue ? true : _.title.toLowerCase().includes(trimValue))),
    [categories, trimValue],
  )

  const currentCategory = useCallback(
    (id: number | string) => (!!id ? categories.find((_) => Number(_.id) === Number(id)) : null),
    [categories],
  )

  return (
    <Controller
      name="categoryId"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <fieldset
          id="fieldset-create-option-modal-offer"
          data-test="fieldset-create-new-option-categoryId"
          ref={ref}
          className={styles.container}
        >
          <label htmlFor={field.name} title="Предложение">
            Предложение
          </label>
          <input
            type="text"
            onClick={(event) => {
              event.stopPropagation()
              setOpen(true)
            }}
            placeholder={!!field.value ? "" : "Начните вводить название услуги..."}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={disabled || !!field.value}
          />
          <button
            data-collapse={open}
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setOpen((prev) => !prev)
            }}
            className="absolute w-8 h-8 bg-transparent p-1.5 right-2 flex items-center justify-center"
          >
            <IconChevron />
          </button>
          <div
            data-current
            className={cx(
              "absolute -translate-y-1/2 left-3.5 h-8 p-1 pr-1.5 grid grid-cols-[1.5rem_minmax(0,1fr)_1rem] items-center gap-1 border border-grey-stroke-light border-solid rounded-2xl bg-grey-field",
              !!field.value ? "z-[90] visible opacity-100" : "opacity-0 invisible -z-10",
            )}
          >
            <div className="w-6 h-6 rounded-full bg-BG-icons relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
              {field.value ? (
                <ImageCategory
                  id={field.value!}
                  slug={currentCategory(field.value!)?.slug}
                  provider={currentCategory(field.value!)?.provider}
                />
              ) : null}
            </div>
            <span className="text-text-primary text-sm font-normal text-ellipsis line-clamp-1">
              {currentCategory(field.value!)?.title || null}
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                field.onChange(null)
                if (currentCategory(field.value!)?.provider === "kursk" || currentCategory(field.value!)?.slug === "kursk") {
                  setValueForm("help", false)
                }
              }}
              className="relative w-4 h-4 p-2 bg-transparent *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
            >
              <IconXClose />
            </button>
          </div>
          {!!error ? <i>Поле не может оставаться незаполненным</i> : null}
          <div
            data-list
            className={cx(
              "absolute left-0 right-0 rounded-xl bg-BG-second overflow-hidden shadow-box-down",
              open ? "opacity-100 z-[90] visible" : "opacity-0 invisible -z-10",
            )}
          >
            <ul className="w-full flex flex-col gap-0.5 py-3 px-1.5">
              {main.map((itemMain) => (
                <li
                  className="w-full p-1.5 grid items-center gap-2 bg-BG-second hover:bg-grey-field rounded-md"
                  key={`key:item:main:${itemMain.id}:`}
                >
                  <button type="button" className="w-5 h-5 p-2.5 cursor-pointer relative"></button>
                  <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
                    <ImageCategory id={itemMain.id} slug={itemMain?.slug} provider={itemMain?.provider} />
                  </div>
                  <span className="text-text-primary text-sm font-normal text-ellipsis line-clamp-1">{itemMain.title}</span>
                </li>
              ))}
            </ul>
          </div>
          {!visible ? (
            <button
              type="button"
              title="Предложить категорию"
              aria-label="Предложить категорию"
              data-span-new-category
              onClick={(event) => {
                event.stopPropagation()
                dispatchVisibleCreateNewCategory(true)
              }}
            >
              <span>Предложить категорию</span>
            </button>
          ) : null}
        </fieldset>
      )}
    />
  )
}

// onClick={(event) => {
//   event.stopPropagation()
//   field.onChange(item.id)
//   if (item?.provider === "kursk" || item?.slug === "kursk") {
//     setValueForm("help", true)
//   }
//   setValue("")
//   setOpen(false)
// }}

ControllerCategory.displayName = "ControllerCategory"
export default memo(ControllerCategory)
