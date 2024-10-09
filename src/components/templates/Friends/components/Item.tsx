import Link from "next/link"
import { useMemo } from "react"

import { type IFriendsResponse } from "@/services/friends/types"

import Avatar from "@avatar"
import { Button, ButtonLink } from "@/components/common"
import IconAddFriend from "@/components/icons/IconAddFriend"
import IconAccentChat from "@/components/icons/IconAccentChat"
import IconCheckFriend from "@/components/icons/IconCheckFriend"
import RatingAndFeedbackComponent from "./RatingAndFeedbackComponent"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { dispatchCloseFriends, useAuth } from "@/store"
import { postFriend } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"

interface IProps {
  item: IFriendsResponse
  myFriendsIds: number[]
  refetchResponse(): Promise<any>
  disabledOnFriendsRequest: (value: number) => boolean
  onDataResponseIs: () => boolean
}

function ItemFriend({ item, myFriendsIds, refetchResponse, disabledOnFriendsRequest, onDataResponseIs }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { on } = useToast()

  function onHandleAdd() {
    const disabled = disabledOnFriendsRequest(item.id)

    if (!disabled) {
      postFriend({ id: item.id }).then((response) => {
        if (response.ok) {
          const is = onDataResponseIs()
          if (is) {
            on({ message: "Вы приняли заявку в друзья" }, "success")
            refetchResponse()
          } else {
            on({ message: `Заявка на добавление в друзья отправлена` }, "default")
          }
        }
      })
    }
  }

  const isAdd = useMemo(() => myFriendsIds.includes(item.id), [myFriendsIds])

  return (
    <li className="w-full h-[3.125rem] grid grid-cols-[3.125rem_minmax(0,1fr)_2.25rem] md:grid-cols-[3.125rem_minmax(0,1fr)_13.0625rem] gap-3 items-center">
      <Avatar className="w-[3.125rem] h-[3.125rem] aspect-square rounded-.625" image={item.image} userId={item.id} />
      <div className="w-full flex flex-col items-start justify-center gap-1">
        <Link
          prefetch={false}
          href={{ pathname: `/customer/${item.id}` }}
          className="w-full text-base text-left font-medium line-clamp-1 flex flex-row flex-nowrap gap-1 text-ellipsis cursor-pointer items-center"
          target="_blank"
        >
          {item?.firstName || "Имя"} {item.lastName || "Фамилия"}
          <span className="relative w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.125rem] *:h-[1.125rem]">
            <IconVerifiedTick />
          </span>
        </Link>
        <RatingAndFeedbackComponent id={item.id} />
      </div>
      <div className="w-full hidden md:grid grid-cols-[minmax(0,1fr)_2.25rem] items-center *:h-9 *:w-full *:rounded-[1.125rem] gap-2.5">
        {userId !== item.id && !!userId ? (
          isAdd ? (
            <ButtonLink
              typeButton="fill-primary"
              href={{
                pathname: "/chat",
                query: {
                  user: item.id,
                },
              }}
              label="Написать"
              prefetch={false}
              onClick={dispatchCloseFriends}
            />
          ) : (
            <Button
              type="button"
              typeButton="fill-primary"
              label="Добавить в друзья"
              onClick={onHandleAdd}
              disabled={disabledOnFriendsRequest(item.id)}
            />
          )
        ) : (
          <span />
        )}
        {userId !== item.id && !!userId ? (
          isAdd ? (
            <div className="bg-grey-field relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
              <IconCheckFriend />
            </div>
          ) : (
            <Link
              href={{
                pathname: "/chat",
                query: {
                  user: item.id,
                },
              }}
              prefetch={false}
              className="bg-grey-field relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
              onClick={dispatchCloseFriends}
            >
              <IconAccentChat />
            </Link>
          )
        ) : (
          <span />
        )}
      </div>
      <button
        type="button"
        className={cx(
          "w-9 h-9 relative rounded-full bg-grey-field *:w-5 *:h-5",
          userId !== item.id && !!userId && !isAdd ? "flex md:hidden" : "hidden",
        )}
        onClick={onHandleAdd}
      >
        <IconAddFriend />
      </button>
      <Link
        className={cx(
          "w-9 h-9 relative rounded-full bg-grey-field *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
          userId !== item.id && !!userId && isAdd ? "flex md:hidden" : "hidden",
        )}
        href={{
          pathname: "/chat",
          query: {
            user: item.id,
          },
        }}
        prefetch={false}
        onClick={dispatchCloseFriends}
      >
        <IconAccentChat />
      </Link>
    </li>
  )
}

ItemFriend.displayName = "ItemFriend"
export default ItemFriend
