import { useQuery } from "@tanstack/react-query"
import { useCallback, useMemo, useState } from "react"
import { type Control, Controller } from "react-hook-form"

import { type IFormValues } from "../types/types"

import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"
import { IconChevron } from "@/components/icons/IconChevron"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { getOffersCategories } from "@/services"

import styles from "../styles/list-category.module.scss"

interface IProps {
  control: Control<IFormValues, any>
}

function ControllerCategory({ control }: IProps) {
  const [open, setOpen, ref] = useOutsideClickEvent()
  const [value, setValue] = useState("")
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.data || []
  const trimValue = value.trim().toLowerCase()

  const [expandSlug, setExpandSlug] = useState<string | null>(null)
  const onExpandSlug = (slug: string) => setExpandSlug((_) => (_ === slug ? null : slug))

  const main = useMemo(() => {
    const array = []

    for (const item of categories) {
      if (item.provider === "main") {
        array.push(item)
      }
    }

    return array
  }, [categories])

  const subs = useMemo(() => {
    const array = []

    for (const item of categories) {
      if (item.provider !== "main") {
        array.push(item)
      }
    }

    return array
  }, [categories])
  const searchList = useMemo(() => {
    const array = []

    if (!!trimValue) {
      for (const item of categories) {
        if (item.title.toLowerCase().includes(trimValue)) {
          array.push(item)
        }
      }
    }

    return array
  }, [trimValue])

  const subMainCategories = useCallback(
    (slug: string) => {
      const array = []

      for (const item of subs) {
        if (item.provider === slug) {
          array.push(item)
        }
      }

      return array
    },
    [subs],
  )

  const currentCategory = useCallback(
    (id: number | string) => (!!id ? categories.find((_) => Number(_.id) === Number(id)) : null),
    [categories],
  )

  return (
    <Controller
      name="categoryId"
      control={control}
      rules={{ required: true }}
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
            disabled={!!field.value}
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
          <div
            className={cx(
              styles.listAbsolute,
              "absolute left-0 right-0 rounded-xl bg-BG-second overflow-hidden shadow-box-down",
              open ? "opacity-100 z-[90] visible" : "opacity-0 invisible -z-10",
            )}
          >
            <ul className="w-full flex flex-col gap-0.5 py-3 px-1.5">
              {(searchList.length > 0 ? searchList : []).map((item) => (
                <li
                  className={cx(
                    "w-full p-1.5 gap-2 bg-BG-second hover:bg-grey-field rounded-md",
                    searchList.length > 0 ? "grid items-center" : "hidden",
                  )}
                  key={`key:item:main:${item.id}:`}
                >
                  <button
                    type="button"
                    className={cx(
                      "w-5 h-5 p-2.5 cursor-pointer relative rounded-full transition-all duration-200",
                      field.value === item.id ? "bg-element-accent-1" : "bg-grey-stroke",
                    )}
                    onClick={(event) => {
                      event.stopPropagation()
                      field.onChange(item.id)
                      setValue("")
                      setOpen(false)
                    }}
                  >
                    <span
                      className={cx(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                        field.value === item.id ? "bg-text-button h-2.5 w-2.5" : "bg-BG-second w-4 h-4",
                      )}
                    />
                  </button>
                  <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
                    <ImageCategory id={item.id} slug={item?.slug} provider={item?.provider} />
                  </div>
                  <span className="text-text-primary text-sm font-normal text-ellipsis line-clamp-1">{item.title}</span>
                </li>
              ))}
              {main.map((itemMain) => (
                <>
                  <li
                    className={cx(
                      "w-full p-1.5 gap-2 bg-BG-second hover:bg-grey-field rounded-md grid",
                      searchList.length > 0 ? "hidden" : "grid items-center",
                    )}
                    key={`key:item:main:${itemMain.id}:`}
                  >
                    <a
                      type="button"
                      className={cx(
                        "w-5 h-5 p-2.5 cursor-pointer relative rounded-full transition-all duration-200 flex z-50",
                        field.value === itemMain.id ? "bg-element-accent-1" : "bg-grey-stroke",
                      )}
                      onClick={(event) => {
                        event.stopPropagation()
                        field.onChange(itemMain.id)
                        setValue("")
                        setOpen(false)
                      }}
                    >
                      <span
                        className={cx(
                          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                          field.value === itemMain.id ? "bg-text-button h-2.5 w-2.5" : "bg-BG-second w-4 h-4",
                        )}
                      />
                    </a>
                    <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
                      <ImageCategory id={itemMain.id} slug={itemMain?.slug} provider={itemMain?.provider} />
                    </div>
                    <span
                      onClick={(event) => {
                        event.stopPropagation()
                        onExpandSlug(itemMain.slug)
                      }}
                      className="text-text-primary text-sm font-normal text-ellipsis line-clamp-1 cursor-pointer"
                    >
                      {itemMain.title}
                    </span>
                    <a
                      onClick={(event) => {
                        event.stopPropagation()
                        onExpandSlug(itemMain.slug)
                      }}
                      className={cx(
                        "w-5 h-5 relative flex *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-secondary z-50 cursor-pointer *:transition-transform *:duration-200",
                        expandSlug === itemMain.slug ? "*:rotate-90" : "*:-rotate-90",
                      )}
                    >
                      <IconChevron />
                    </a>
                  </li>
                  {subMainCategories(itemMain.slug).map((itemSub) => (
                    <li
                      className={cx(
                        "w-full p-1.5 pl-3 gap-2 bg-BG-second hover:bg-grey-field rounded-md",
                        searchList.length > 0 || expandSlug !== itemMain.slug ? "hidden" : "grid items-center",
                      )}
                      key={`key:item:main:${itemSub.id}:`}
                      data-sub
                    >
                      <a
                        type="button"
                        className={cx(
                          "w-5 h-5 p-2.5 cursor-pointer relative rounded-full transition-all duration-200 flex z-50",
                          field.value === itemSub.id ? "bg-element-accent-1" : "bg-grey-stroke",
                        )}
                        onClick={(event) => {
                          event.stopPropagation()
                          field.onChange(itemSub.id)
                          setOpen(false)
                          setValue("")
                        }}
                      >
                        <span
                          className={cx(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                            field.value === itemSub.id ? "bg-text-button h-2.5 w-2.5" : "bg-BG-second w-4 h-4",
                          )}
                        />
                      </a>
                      <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
                        <ImageCategory id={itemSub.id} slug={itemSub?.slug} provider={itemSub?.provider} />
                      </div>
                      <span className="text-text-primary text-sm font-normal text-ellipsis line-clamp-1">{itemSub.title}</span>
                    </li>
                  ))}
                </>
              ))}
            </ul>
          </div>
        </fieldset>
      )}
    />
  )
}

ControllerCategory.displayName = "ControllerCategory"
export default ControllerCategory
