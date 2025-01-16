import { useState } from "react"
import { HTMLInputTypeAttribute } from "react"
import { Control, Controller } from "react-hook-form"

import { advertsButtonLabels, activeArrayAdvertsButtonLabels, EAdvertsButton } from "@/types/enum"

import IconChevron from "@/components/icons/IconChevron"

import { cx } from "@/lib/cx"
import { TSchemaAdvert } from "./schema"
import { useOutsideClickEvent } from "@/helpers"

import styles from "./list-action.module.scss"
import IconXClose from "@/components/icons/IconXClose"

function ControllerAddAction({ control }: { control: Control<TSchemaAdvert, any> }) {
  const [open, setOpen, ref] = useOutsideClickEvent()
  const [textType, setTextType] = useState<HTMLInputTypeAttribute>("text")

  const current = (value?: EAdvertsButton) => {
    if (!value) return null
    return advertsButtonLabels.hasOwnProperty(value) ? advertsButtonLabels[value] : null
  }

  return (
    <article className="flex flex-col gap-2 p-3 border-t-2 border-element-accent-1" ref={ref}>
      <label title="Описание рекламы" className="text-sm text-text-primary">
        Добавление кнопки действия <span className="text-text-secondary">(не обязательно)</span>
      </label>
      <Controller
        name="actionAdvertButton"
        control={control}
        render={({ field }) => (
          <fieldset className={cx(styles.module, "flex flex-col gap-2 items-start relative")}>
            <label htmlFor={field.name} title="Описание рекламы" className="text-sm text-text-primary">
              Действие кнопки
            </label>
            <input
              type="text"
              placeholder={!!field.value ? "" : "Выберите действие"}
              readOnly
              disabled={!!field.value}
              onClick={(event) => {
                event.stopPropagation()
                setOpen((_) => !_)
              }}
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
                "absolute -translate-y-1/2 left-3.5 h-8 p-1 pr-1.5 grid grid-cols-[minmax(0,1fr)_1rem] items-center gap-1 border border-grey-stroke-light border-solid rounded-2xl bg-grey-field",
                !!field.value ? "z-50 visible opacity-100" : "opacity-0 invisible -z-10",
              )}
            >
              <span className="text-text-primary text-sm font-normal text-ellipsis line-clamp-1">{current(field.value!)}</span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  field.onChange(undefined)
                }}
                className="relative w-4 h-4 p-2 bg-transparent *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
              >
                <IconXClose />
              </button>
            </div>
            <div
              data-list
              className={cx(
                "absolute z-50 left-0 right-0 rounded-xl bg-BG-second overflow-hidden shadow-box-down",
                open ? "opacity-100 z-50 visible" : "opacity-0 invisible -z-10",
              )}
            >
              <ul className="w-full flex flex-col gap-0.5 py-3 px-1.5">
                {activeArrayAdvertsButtonLabels.map(([key, label]) => (
                  <li
                    key={`:fD:vc:bv:-${key}`}
                    className={cx(
                      "w-full p-1.5 gap-2 bg-BG-second hover:bg-grey-field rounded-md flex items-center justify-start cursor-pointer",
                      field.value === key ? "bg-element-accent-1" : "bg-grey-field",
                    )}
                    onClick={(event) => {
                      event.stopPropagation()
                      field.onChange(key)
                      setOpen(false)
                    }}
                  >
                    <span className="text-text-primary text-sm font-normal text-ellipsis line-clamp-1">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>
        )}
      />
      <Controller
        name="actionUrl"
        control={control}
        render={({ field }) => (
          <fieldset className="flex flex-col gap-2 items-start">
            <label htmlFor={field.name} title="Описание рекламы" className="text-sm text-text-primary">
              Ссылка или номер телефона
            </label>
            <input type={textType ?? "text"} placeholder="Введите данные для перехода пользователю" {...field} />
          </fieldset>
        )}
      />
    </article>
  )
}

export default ControllerAddAction
