import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import Button from "@/components/common/Button"
import IconXClose from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { hideAddAdvert } from "@/store"
import { useOutsideClickEvent } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { resolverSchemaOld, TSchemaOld } from "../schema"
import { getCompanies, ICompanyExtend } from "@/services/companies"

import styles from "../styles/list-companies.module.scss"
import { EnumTypeProvider } from "@/types/enum"
import { patchAdvertPosts } from "@/services/posts"
import { patchAdvertOffer } from "@/services"

const onItemTrimCase = (value: string | undefined, trimString: string) => (value ?? "").trim().toLowerCase().includes(trimString)

const onFilter = (list: ICompanyExtend[], input: string) => {
  const array = []
  const inputTrim = input.trim().toLowerCase()

  for (const item of list) {
    if (
      onItemTrimCase(item.title, inputTrim) ||
      onItemTrimCase(item.inn, inputTrim) ||
      onItemTrimCase(item.erid, inputTrim) ||
      onItemTrimCase(item.ogrn, inputTrim)
    ) {
      array.push(item)
    }
  }

  return array
}

function FormSelectCompany({ id, type }: { id: number; type: EnumTypeProvider }) {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [open, setOpen, ref] = useOutsideClickEvent()
  const { data } = useQuery({
    queryFn: () => getCompanies(),
    queryKey: ["companies"],
  })
  const { on } = useToast()

  const { handleSubmit, control, setError } = useForm<TSchemaOld>({
    defaultValues: {
      index: null,
    },
    resolver: resolverSchemaOld,
  })

  const list = data?.data ?? []
  const filter = onFilter(list, input)

  const current = (id: number | null) => {
    if (!id) return null

    return list.find((item) => item.id === id) ?? null
  }

  const onSubmit = handleSubmit(async (values) => {
    if (!values.index) {
      setError("index", { message: "Выберите компанию!" })
      return
    }
    if (!loading) {
      setLoading(true)
      const response = await Promise.resolve(
        type === EnumTypeProvider.POST ? patchAdvertPosts(id, values.index!) : patchAdvertOffer(id, values.index!),
      )
      if (response.ok) {
        on({
          message: "Реклама добавлена",
        })
      } else {
        on({
          message: "Временно данный функционал не работает. Добавьте новую компанию",
        })
      }
      setLoading(false)
      hideAddAdvert()
    }
  })

  return (
    <form className="w-full flex flex-col gap-[1.875rem]" onSubmit={onSubmit}>
      <h3 className="text-text-primary text-2xl font-medium">Выбрать из списка компаний</h3>
      <Controller
        name="index"
        control={control}
        render={({ field, fieldState: { error } }) => {
          const c = current(field.value)

          return (
            <div className="w-full flex flex-col gap-1 relative z-50" ref={ref}>
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={field.value ? undefined : "Введите для поиска по списку компаний"}
                onClick={() => setOpen(true)}
              />
              <i className={cx(!error && "hidden", "text-xs text-text-error")}>{error?.message}</i>
              {c ? (
                <div className="absolute z-50 top-6 -translate-y-1/2 h-10 max-w-[calc(100%_-_0.5rem)] left-1 rounded-[1.25rem] p-1 pr-1.5 border border-grey-field grid items-center grid-cols-[minmax(0,1fr)_1rem] gap-1">
                  <div className="flex flex-row flex-nowrap items-center">
                    <span className="text-xs text-text-primary whitespace-nowrap line-clamp-1 text-ellipsis">{c.title}</span>
                    &nbsp;
                    <span className="line-clamp-1 text-ellipsis text-xs text-text-secondary">
                      {c?.inn ? `ИНН: ${c?.inn}` : null}&nbsp;{c?.erid ? `erid: ${c?.erid}` : null}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      field.onChange(null)
                    }}
                    className="relative w-4 h-4 p-2 bg-transparent *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
                  >
                    <IconXClose />
                  </button>
                </div>
              ) : null}
              <div
                className={cx(
                  styles.list,
                  "absolute z-50 left-0 right-0 rounded-xl bg-BG-second overflow-hidden shadow-box-down top-[calc(100%_+_0.25rem)]",
                  open ? "opacity-100 z-50 visible" : "opacity-0 invisible -z-10",
                )}
              >
                <ul className="w-full flex flex-col gap-0.5 py-3 px-1.5">
                  {filter.map((item) => (
                    <li
                      key={`c:o:m:p:a:n:y:-${item.id}`}
                      className="w-full p-1.5 bg-BG-second hover:bg-grey-field rounded-md flex flex-wrap gap-2"
                      onClick={(event) => {
                        event.stopPropagation()
                        field.onChange(item.id)
                        setOpen(false)
                      }}
                    >
                      <span className="text-xs text-text-primary">{item.title}</span>
                      <span className={cx(!item?.inn && "hidden", "text-xs text-text-secondary whitespace-nowrap")}>ИНН: {item.inn}</span>
                      <span className={cx(!item?.erid && "hidden", "text-xs text-text-secondary whitespace-nowrap")}>
                        erid: {item.erid}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      />
      <footer className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 items-center">
        <Button type="button" typeButton="regular-primary" label="Отмена" onClick={hideAddAdvert} loading={loading} disabled={loading} />
        <Button type="submit" typeButton="fill-primary" label="Добавить" disabled={loading} loading={loading} />
      </footer>
    </form>
  )
}

FormSelectCompany.displayName = "FormSelectCompany"
export default FormSelectCompany
