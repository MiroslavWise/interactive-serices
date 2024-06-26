import { cache, Suspense } from "react"

import { type IParamsCustomer } from "../layout"

import FooterButton from "./components/FooterButton"
import OnlineStatus from "./components/OnlineStatus"
import { NextImageMotion } from "@/components/common"
import FriendsButtons from "./components/FriendsButtons"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { getUserId } from "@/services"
import { formatOfMMMM } from "@/helpers"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import ProfileDescription from "./components/ProfileDescription"
import { cx } from "@/lib/cx"
import PlaqueFriends from "./components/PlaqueFriends"

const get = cache(getUserId)

export default async ({ params }: IParamsCustomer) => {
  const id = params?.userId ?? null

  const { res, ok } = await get(id!)

  if (!ok || !res)
    return (
      <aside className="w-full h-full rounded-2xl md:rounded-[2rem] bg-BG-second max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)]" />
    )

  const { created, profile } = res ?? {}
  const { image, firstName, lastName } = profile ?? {}

  return (
    <aside className="w-full h-fit md:h-full rounded-2xl md:rounded-[2rem] bg-BG-second flex flex-col md:justify-between md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)] md:overflow-x-hidden md:overflow-y-auto gap-4 md:gap-6 max-md:p-4 md:px-5 md:pt-5">
      <article className="w-full flex flex-col gap-4 items-center">
        <section
          className={cx("relative w-full", "grid grid-cols-[5rem_minmax(0,1fr)] gap-4", "md:flex md:flex-col md:items-center md:gap-3")}
        >
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
          <section className={cx("w-full", "flex flex-col items-start md:items-center gap-1")}>
            <h3 className="text-text-primary text-xl font-semibold text-left md:text-center">
              {firstName || "Имя"} {lastName || "Фамилия"}
            </h3>
            <OnlineStatus user={res} />
          </section>
        </section>
        <FriendsButtons user={res} />
      </article>
      <article className="w-full flex flex-col gap-3 justify-start">
        <ProfileDescription user={res!} />
        <Suspense
          fallback={
            <article className="loading-screen w-full rounded-[0.625rem] p-4 border-[1px] border-solid border-grey-stroke-light grid grid-cols-[minmax(0,1fr)_3.125rem] gap-0.625 [&>span]:h-5 [&>span]:w-full [&>span]:rounded-xl">
              <span />
              <span />
            </article>
          }
        >
          <PlaqueFriends id={id} />
        </Suspense>
      </article>
      <footer className="mt-auto w-full flex flex-col gap-3 items-center pb-4 max-md:hidden">
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
