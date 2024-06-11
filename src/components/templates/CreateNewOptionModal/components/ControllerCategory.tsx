import { useQuery } from "@tanstack/react-query"
import { useCallback, useMemo, useState } from "react"
import { type Control, Controller } from "react-hook-form"

import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"

import { useOutsideClickEvent } from "@/helpers"
import { getOffersCategories } from "@/services"
import { TSchemaCreate } from "../utils/create.schema"
import { dispatchVisibleCreateNewCategory } from "@/store"

import styles from "../styles/list-category.module.scss"
import { IconChevron } from "@/components/icons/IconChevron"

interface IProps {
  control: Control<TSchemaCreate, any>
  visible: boolean
  disabled: boolean
}

function ControllerCategory({ control, visible, disabled }: IProps) {
  const [open, setOpen, ref] = useOutsideClickEvent()
  const [value, setValue] = useState("")
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []

  const trimValue = value.trim().toLowerCase()

  const list = useMemo(
    () => categories.filter((_) => (!trimValue ? true : _.title.toLowerCase().includes(trimValue))),
    [categories, trimValue],
  )

  const currentCategory = useCallback((id: number | string) => categories.find((_) => Number(_.id) === Number(id)), [categories])

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
          <label htmlFor={field.name} title="Преложение">
            Предложение
          </label>
          <input
            type="text"
            onClick={(event) => {
              event.stopPropagation()
              setOpen(true)
            }}
            placeholder={!!field.value ? "" : "Выберите категорию"}
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
          >
            <IconChevron />
          </button>
          {!!error ? <i>Поле не может оставаться незаполненным</i> : null}
          <div data-current={!!field.value}>
            <div data-icon>{field.value ? <ImageCategory id={field.value!} /> : null}</div>
            <span>{currentCategory(field.value!)?.title || null}</span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                field.onChange(null)
              }}
            >
              <IconXClose />
            </button>
          </div>
          <div data-list={open}>
            <ul>
              {list.map((item) => (
                <li
                  key={`::key::category::item::${item.id}::`}
                  onClick={(event) => {
                    event.stopPropagation()
                    field.onChange(item.id)
                    setValue("")
                    setOpen(false)
                  }}
                >
                  <div data-icon>
                    <ImageCategory id={item.id} />
                  </div>
                  <span>{item.title}</span>
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

ControllerCategory.displayName = "ControllerCategory"
export default ControllerCategory
