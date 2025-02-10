import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { IUserOffer } from "@/services/offers/types"
import { IUserResponse } from "@/services/users/types"

import Avatar from "@avatar"
import Button from "@/components/common/Button"
import { IconSprite } from "@/components/icons/icon-sprite"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import { queryClient } from "@/context"
import { getSearch } from "@/services/search"
import { useContextCompany } from "./ContextCompany"
import { patchCompanyUsers } from "@/services/companies"
import { useDebounce, useOutsideClickEvent } from "@/helpers"
import { resolverSchemaUsers, TSchemaUsers } from "../utils/schema"

interface IProps {
  id: number
  users: IUserOffer[]
}

const SEARCH = "users"

import styles from "../styles/style-list.module.scss"

function ComponentAddUser({ users, id }: IProps) {
  const { refetch } = useContextCompany()
  const [user, setUser] = useState<IUserResponse | null>(null)
  const [input, setInput] = useState("")
  const [open, setOpen, ref] = useOutsideClickEvent()
  const [usersSearch, setUsers] = useState<IUserResponse[]>([])
  const debouncedValue = useDebounce(search, 1250)
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control, setError, watch, reset } = useForm<TSchemaUsers>({
    defaultValues: {
      id: null,
    },
    resolver: resolverSchemaUsers,
  })

  const trim = input.trim().toLowerCase()

  async function search() {
    if (trim.length > 1) {
      const response = await queryClient.fetchQuery({
        queryFn: () =>
          getSearch({
            query: {
              query: trim,
              search: SEARCH,
            },
          }),
        queryKey: [
          "search-user",
          {
            query: trim,
            search: SEARCH,
          },
        ],
      })

      const { data } = response

      if (data) {
        const users = data as unknown as IUserResponse[]
        setUsers(users)
      }
    } else {
    }
  }

  const onSubmit = handleSubmit(async (values, form) => {
    if (!loading) {
      setLoading(true)
      const newUsers = Array.from(new Set([...users.map((_) => _.id), Number(values.id)]))
      const response = await patchCompanyUsers(newUsers, id)
      if (response.res) {
        reset()
        setInput("")
        setUser(null)
        await refetch()
      } else {
        clg("ОШИБКА ДОБАВЛЕНИЯ ЮЗЕРА", response?.error, "error")
        setError("id", { message: response?.error?.message ?? "Какая-то ошибка добавления, посмотрите в консоль!!!" })
      }
      setLoading(false)
    }
  })

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-3 p-5 rounded-2 bg-BG-first border border-grey-stroke-light">
      <Controller
        name="id"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <fieldset className="w-full flex flex-col gap-1 relative z-50" ref={ref}>
            <label className="text-sm text-text-primary font-medium">Введитя имя или фамилия пользователя</label>
            {user ? (
              <article className="w-full p-1.5 bg-grey-field border border-element-accent-1 rounded-md grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 items-center">
                <Avatar image={user?.profile?.image} className="rounded-md h-10 w-10 aspect-square p-5" />
                <div className="w-full flex flex-col gap-1 justify-between items-start">
                  <div className="w-full flex flex-row items-center gap-1">
                    <p className=" text-text-primary text-sm font-medium line-clamp-1 overflow-ellipsis">
                      {user?.profile?.firstName ?? "Имя"} {user?.profile?.lastName ?? ""}
                    </p>
                    <div className="w-5 h-5 flex items-center justify-center p-[0.0625rem]">
                      <IconVerifiedTick />
                    </div>
                  </div>
                  <a
                    className="cursor-pointer text-sm font-medium text-text-error w-fit grid grid-cols-[minmax(0,1fr)_1rem] gap-1"
                    onClick={(event) => {
                      event.stopPropagation()
                      field.onChange(null)
                      setUser(null)
                      setOpen(false)
                    }}
                  >
                    Отменить
                    <div className="relative w-4 h-4">
                      <IconSprite id="x-close-20-20" className="w-4 h-4" />
                    </div>
                  </a>
                </div>
              </article>
            ) : null}
            <input
              className="w-full"
              type="text"
              value={input}
              placeholder={field.value ? undefined : "Введите для поиска по списку пользователей (не менее 2-х символов)"}
              onChange={(event) => {
                setInput(event.target.value)
                debouncedValue()
              }}
              onClick={() => setOpen(true)}
              data-error={!!error?.message}
            />
            <i className={cx(!error?.message && "hidden", "text-xs text-text-error")}>{error?.message}</i>
            <div
              className={cx(
                styles.list,
                "absolute z-50 left-0 right-0 rounded-xl bg-BG-second overflow-hidden shadow-box-down top-[calc(100%_+_0.25rem)]",
                open ? "opacity-100 z-50 visible" : "opacity-0 invisible -z-10",
              )}
            >
              <ul className="w-full flex flex-col gap-0.5 py-3 px-1.5">
                {usersSearch.map((item) => (
                  <li
                    key={`:u:s:e:r:-${item.id}`}
                    className="w-full p-1.5 bg-BG-second hover:bg-grey-field rounded-md grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 items-center cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation()
                      field.onChange(item.id)
                      setUser(item)
                      setOpen(false)
                    }}
                  >
                    <Avatar image={item?.profile?.image} className="rounded-md h-10 w-10 aspect-square p-5" />
                    <div className="w-full flex flex-col gap-1 justify-between items-start">
                      <div className="w-full flex flex-row items-center gap-1">
                        <p className=" text-text-primary text-sm font-medium line-clamp-1 overflow-ellipsis">
                          {item?.profile?.firstName ?? "Имя"} {item?.profile?.lastName ?? ""}
                        </p>
                        <div className="w-5 h-5 flex items-center justify-center p-[0.0625rem]">
                          / <IconVerifiedTick />
                        </div>
                      </div>
                      <a className="text-sm font-medium text-text-accent w-fit">{item?.email ? item?.email : null}</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>
        )}
      />
      <footer className="w-full flex justify-end">
        <Button label="Добавить" loading={loading} disabled={loading || !watch("id")} className="w-fit" />
      </footer>
    </form>
  )
}

export default ComponentAddUser
