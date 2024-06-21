import { cache } from "react"

import { type IParamsCustomer } from "../layout"

import DotsButton from "./components/DotsButton"
import FooterButton from "./components/FooterButton"
import OnlineStatus from "./components/OnlineStatus"
import { NextImageMotion } from "@/components/common"
import FriendsButtons from "./components/FriendsButtons"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { getUserId } from "@/services"
import { formatOfMMMM } from "@/helpers"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import ProfileDescription from "./components/ProfileDescription"

const get = cache(getUserId)

export default async ({ params }: IParamsCustomer) => {
  const id = params?.userId ?? null

  const { res, ok } = await get(id!)

  if (!ok || !res)
    return (
      <aside className="w-full h-full rounded-[2rem] bg-BG-second max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)]" />
    )

  const { created, profile } = res ?? {}
  const { image, firstName, lastName, about } = profile ?? {}

  return (
    <aside className="w-full h-full rounded-[2rem] bg-BG-second flex flex-col justify-between max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] overflow-x-hidden overflow-y-auto gap-6  px-5 pt-5">
      <article className="w-full flex flex-col gap-4 items-center">
        <section className="relative flex flex-col items-center gap-3 w-full">
          <DotsButton user={res} />
          <div
            className={`w-20 h-20 rounded-2xl relative [&>img]:w-full [&>img]:h-full ${
              !image && "bg-grey-stroke-light !p-2 [&>svg]:w-12 [&>svg]:h-12 !rounded-[0.625rem]"
            }`}
          >
            {!!image ? (
              <NextImageMotion className="rounded-2xl overflow-hidden" src={image?.attributes?.url} alt="avatar" width={100} height={100} />
            ) : (
              <IconEmptyProfile />
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 z-10 [&>svg]:w-5 [&>svg]:h-5">
              <IconVerifiedTick />
            </div>
          </div>
          <section className="w-full flex flex-col items-center gap-1">
            <h3 className="text-text-primary text-xl font-semibold text-center">
              {firstName || "Имя"} {lastName || "Фамилия"}
            </h3>
            <OnlineStatus user={res} />
          </section>
        </section>
        <FriendsButtons user={res} />
      </article>
      <article className="w-full flex flex-col gap-3">
        <ProfileDescription user={res!} />
      </article>
      <footer className="mt-auto w-full flex flex-col gap-3 items-center pb-4">
        <div className="w-full pb-4 grid grid-cols-[minmax(0,1fr)_2.25rem] gap-0.625 border-b-[1px] border-solid border-grey-stroke-light">
          <FooterButton user={res} />
        </div>
        <time className="w-full text-text-disabled text-xs text-center font-normal" dateTime={created as unknown as string}>
          На Sheira c {formatOfMMMM(created)}
        </time>
      </footer>
    </aside>
  )
}
