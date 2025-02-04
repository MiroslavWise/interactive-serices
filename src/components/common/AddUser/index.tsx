import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { IUserOffer } from "@/services/offers/types"

import Avatar from "@avatar"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useOutsideClickEvent } from "@/helpers"
import { getCompanyId } from "@/services/companies"

import styles from "./style.module.scss"
import { IconSprite } from "@/components/icons/icon-sprite"

interface IProps {
  value: null | number
  onChange(value: number | null): void
}

const filters = (list: IUserOffer[], input: string) => {
  const array = []
  const trim = input.trim().toLowerCase()

  if (!trim) return list

  for (const user of list) {
    if ((user?.firstName ?? "").toLowerCase().includes(trim)) {
      array.push(user)
    }
  }

  return array
}

const onCurrent = (list: IUserOffer[], value: number | null) => {
  if (!value) return null
  if (list.length === 0) return null

  return list.find((_) => _.id === value) ?? null
}

function AddUser({ onChange, value }: IProps) {
  const [input, setInput] = useState("")
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const user = useAuth(({ user }) => user)
  const { company } = user ?? {}
  const { id } = company ?? {}
  const [open, setOpen, ref] = useOutsideClickEvent()

  const { data } = useQuery({
    queryFn: () => getCompanyId(id!),
    queryKey: ["company", id],
    enabled: !!id,
  })

  const list = data?.data?.users ?? []
  const map = filters(list, input)
  const current = onCurrent(list, value)

  if (!id || userId !== data?.data?.owner?.id) return null

  return (
    <>
      <div className="w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 items-center">
        <div className="w-full border-t border-dashed border-grey-stroke-light" />
        <span className="text-center whitespace-nowrap text-xs  text-text-secondary">можно привязать другому пользователю</span>
        <div className="w-full border-t border-dashed border-grey-stroke-light" />
      </div>
      <fieldset className="w-full flex flex-col gap-1 relative" ref={ref}>
        {current ? (
          <article className="w-full p-1.5 bg-grey-field border border-element-accent-1 rounded-md grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 items-center">
            <Avatar image={current?.image} className="rounded-md h-10 w-10 aspect-square p-5" />
            <div className="w-full flex flex-col gap-1 justify-between items-start">
              <div className="w-full flex flex-row items-center gap-1">
                <p className=" text-text-primary text-sm font-medium line-clamp-1 overflow-ellipsis">
                  {current?.firstName ?? "Имя"} {current?.lastName ?? ""}
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
                  setOpen(false)
                }}
              >
                Отменить
                <div className="w-4 h-4 relative">
                  <IconSprite id="x-close-20-20" className="w-4 h-4" />
                </div>
              </a>
            </div>
          </article>
        ) : null}
        <label>Пользователи</label>
        {list.length > 0 ? (
          <div className="w-full relative">
            <input
              type="text"
              className="w-full"
              placeholder="Выберите пользователя"
              onClick={() => {
                setOpen(true)
              }}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <div
              className={cx(
                styles.list,
                "absolute z-50 left-0 right-0 rounded-xl bg-BG-second overflow-hidden shadow-box-down bottom-[3.25rem]",
                open ? "opacity-100 z-50 visible" : "opacity-0 invisible -z-10",
              )}
            >
              <ul className="w-full flex flex-col gap-0.5 py-3 px-1.5">
                {map.map((user) => (
                  <li
                    key={`:u:s:e:r:-${user.id}`}
                    className="w-full p-1.5 bg-BG-second hover:bg-grey-field rounded-md grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 items-center cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation()
                      onChange(user.id)
                      setOpen(false)
                    }}
                  >
                    <Avatar image={user?.image} className="rounded-md h-10 w-10 aspect-square p-5" />
                    <div className="w-full flex flex-col gap-1 justify-between items-start">
                      <div className="w-full flex flex-row items-center gap-1">
                        <p className=" text-text-primary text-sm font-medium line-clamp-1 overflow-ellipsis">
                          {user?.firstName ?? "Имя"} {user?.lastName ?? ""}
                        </p>
                        <div className="w-5 h-5 flex items-center justify-center p-[0.0625rem]">
                          <IconVerifiedTick />
                        </div>
                      </div>
                      <a className="text-sm font-medium text-text-accent w-fit">{user?.email ? user?.email : null}</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <span className="text-sm text-text-secondary font-normal">В вашей компании нет пользователей!</span>
        )}
      </fieldset>
    </>
  )
}

export default AddUser
