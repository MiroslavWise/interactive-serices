"use client"

import { type IUserResponse } from "@/services/users/types"

import Button from "@/components/common/Button"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { dispatchComplaintModalUser } from "@/store"
import { useNavigator } from "@/helpers/hooks/use-navigator"

function FooterButton({ user }: { user: IUserResponse }) {
  const { profile, id } = user ?? {}

  const linkUser =
    `/user/${id}` +
    (profile?.username && !profile?.username.includes(`$`) && !profile?.username.includes("/") ? `/${profile?.username}` : "")

  const onShare = useNavigator({
    url: linkUser,
    title: user?.profile?.firstName ?? "Имя",
  })

  function onComplaint() {
    dispatchComplaintModalUser({
      user: {
        about: profile?.about ?? "",
        birthdate: null,
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName || "",
        image: profile?.image!,
        username: profile?.username,
        id: id!,
        gender: profile?.gender!,
      },
    })
  }

  return (
    <>
      <Button
        type="button"
        typeButton="regular-primary"
        label="Поделиться"
        className="bg-btn-second-default !h-9 py-1.5 px-4 [&>span]:text-sm !rounded-[1.125rem]"
        onClick={onShare}
      />
      <button
        className="aspect-square relative w-9 h-9 p-2 flex items-center justify-center border-none outline-none bg-btn-second-default rounded-[1.125rem] [&>article]:hover:!opacity-100 [&>article]:hover:!visible"
        onClick={onComplaint}
        title="Пожаловаться"
        aria-label="Пожаловаться"
        aria-labelledby="Пожаловаться"
      >
        <div className="w-5 h-5 relative">
          <IconSprite id="icon-complaint" className="text-text-error w-5 h-5" />
        </div>
        <article className={cx("absolute -top-1 -right-3 rounded-md bg-element-accent-2 py-1 px-2 -translate-y-full opacity-0 invisible")}>
          <span className="text-text-tab text-xs text-center font-normal">Пожаловаться</span>
        </article>
      </button>
    </>
  )
}

FooterButton.displayName = "FooterButton"
export default FooterButton
