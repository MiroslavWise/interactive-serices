"use client"

import { Dispatch, useState } from "react"

import { IUserResponse } from "@/services/users/types"

import Avatar from "@avatar"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { getSearch } from "@/services/search"
import { useDebounce } from "@/helpers/hooks/useDebounce"
import { queryClient } from "@/context/QueryClientProviderContext"
import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"

import styles from "../styles/list-companies.module.scss"
import { IconSprite } from "@/components/icons/icon-sprite"

interface IProps {
  value: null | number
  onChange: Dispatch<number | null>
  error?: string
}

const SEARCH = "users"

function UserAddSearch({ value, onChange, error }: IProps) {
  const [user, setUser] = useState<IUserResponse | null>(null)
  const [input, setInput] = useState("")
  const [open, setOpen, ref] = useOutsideClickEvent()
  const [users, setUsers] = useState<IUserResponse[]>([])
  const debouncedValue = useDebounce(search, 1250)

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

  return (
    <>
      <div className="w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 items-center">
        <div className="w-full border-t border-dashed border-grey-stroke-light" />
        <span className="text-center whitespace-nowrap text-xs  text-text-secondary">добавление главы компании</span>
        <div className="w-full border-t border-dashed border-grey-stroke-light" />
      </div>
      <div className="w-full flex flex-col gap-1 relative z-50" ref={ref}>
        <label htmlFor="userId" title="Описание рекламы">
          Глава компании
        </label>
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
                  onChange(null)
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
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value)
            debouncedValue()
          }}
          placeholder={value ? undefined : "Введите для поиска по списку пользователей (не менее 2-х символов)"}
          onClick={() => setOpen(true)}
        />
        <i className={cx(!error && "hidden", "text-xs text-text-error")}>{error}</i>
        <div
          className={cx(
            styles.list,
            "absolute z-50 left-0 right-0 rounded-xl bg-BG-second overflow-hidden shadow-box-down bottom-[calc(100%_+_0.25rem)]",
            open ? "opacity-100 z-50 visible" : "opacity-0 invisible -z-10",
          )}
        >
          <ul className="w-full flex flex-col gap-0.5 py-3 px-1.5">
            {users.map((item) => (
              <li
                key={`:u:s:e:r:-${item.id}`}
                className="w-full p-1.5 bg-BG-second hover:bg-grey-field rounded-md grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 items-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation()
                  onChange(item.id)
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
      </div>
    </>
  )
}

export default UserAddSearch
