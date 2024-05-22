import { useCallback, useMemo, useState } from "react"
import { type Control, Controller } from "react-hook-form"

import { IFormValues } from "../types/types"

import { ImageCategory } from "@/components/common"

import { useOutsideClickEvent } from "@/helpers"
import { dispatchVisibleCreateNewCategory, useOffersCategories } from "@/store"

import styles from "../styles/list-category.module.scss"
import { IconXClose } from "@/components/icons/IconXClose"

interface IProps {
  control: Control<IFormValues, any>
  visible: boolean
  disabled: boolean
}

function ControllerCategory({ control, visible, disabled }: IProps) {
  const categories = useOffersCategories(({ categories }) => categories)
  const [open, setOpen, ref] = useOutsideClickEvent()
  const [value, setValue] = useState("")

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
          <label htmlFor={field.name}>Предложение</label>
          <input
            type="text"
            onClick={(event) => {
              event.stopPropagation()
              setOpen(true)
            }}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={disabled || !!field.value}
          />
          {!!error ? <i>Важное поле</i> : null}
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
