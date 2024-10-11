"use client"

import { type IUserResponse } from "@/services/users/types"

import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import env from "@/config/environment"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchComplaintModalUser } from "@/store"

function FooterButton({ user }: { user: IUserResponse }) {
  const { profile, id } = user ?? {}
  const { onSimpleMessage } = useToast()

  function onComplaint() {
    dispatchComplaintModalUser({
      user: {
        about: profile?.about ?? "",
        birthdate: null,
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName ?? "",
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
        onClick={() => {
          const linkUser = `/user/${id}`
          const url = `${env.server.host}${linkUser}`
          if (!!window.navigator.share!) {
            navigator.share({
              title: `${profile?.firstName || "Имя"} ${profile?.lastName || "Фамилия"}`,
              text: profile?.about || "",
              url: url,
            })
          } else {
            navigator.clipboard.writeText(url)
            onSimpleMessage("Ссылка скопирована")
          }
        }}
      />
      <button
        className="aspect-square relative w-9 h-9 p-2 flex items-center justify-center border-none outline-none bg-btn-second-default rounded-[1.125rem] [&>article]:hover:!opacity-100 [&>article]:hover:!visible"
        onClick={onComplaint}
        title="Пожаловаться"
        aria-label="Пожаловаться"
        aria-labelledby="Пожаловаться"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
          <g clip-path="url(#clip0_6305_23715)">
            <path
              d="M10.0845 5.58955C10.5405 5.58955 10.9102 5.95922 10.9102 6.41524V10.085C10.9102 10.541 10.5405 10.9106 10.0845 10.9106C9.62849 10.9106 9.25882 10.541 9.25882 10.085V6.41524C9.25882 5.95922 9.62849 5.58955 10.0845 5.58955Z"
              fill="var(--element-accent-1)"
              className="fill-element-accent-1"
            />
            <path
              d="M10.0845 12.9261C9.62849 12.9261 9.25882 13.2958 9.25882 13.7518C9.25882 14.2078 9.62849 14.5775 10.0845 14.5775H10.0937C10.5497 14.5775 10.9194 14.2078 10.9194 13.7518C10.9194 13.2958 10.5497 12.9261 10.0937 12.9261H10.0845Z"
              fill="var(--element-accent-1)"
              className="fill-element-accent-1"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.0859375 10.085C0.0859375 4.56211 4.56309 0.0849609 10.0859 0.0849609C15.6088 0.0849609 20.0859 4.56211 20.0859 10.085C20.0859 15.6078 15.6088 20.085 10.0859 20.085C4.56309 20.085 0.0859375 15.6078 0.0859375 10.085ZM10.0859 1.73634C5.47512 1.73634 1.73731 5.47414 1.73731 10.085C1.73731 14.6958 5.47512 18.4336 10.0859 18.4336C14.6968 18.4336 18.4346 14.6958 18.4346 10.085C18.4346 5.47414 14.6968 1.73634 10.0859 1.73634Z"
              fill="var(--element-accent-1)"
              className="fill-element-accent-1"
            />
          </g>
          <defs>
            <clipPath id="clip0_6305_23715">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <article className={cx("absolute -top-1 -right-3 rounded-md bg-element-accent-2 py-1 px-2 -translate-y-full opacity-0 invisible")}>
          <span className="text-text-tab text-xs text-center font-normal">Пожаловаться</span>
        </article>
      </button>
    </>
  )
}

FooterButton.displayName = "FooterButton"
export default FooterButton
