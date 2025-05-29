import { Suspense } from "react"

import { type IParamsCustomer } from "../layout"

import FooterButton from "./components/FooterButton"
import OnlineStatus from "./components/OnlineStatus"
import { NextImageMotion } from "@/components/common"
import PlaqueFriends from "./components/PlaqueFriends"
import FriendsButtons from "./components/FriendsButtons"
import ProfileDescription from "./components/ProfileDescription"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { getUserId } from "@/services"
import { formatOfMMMM } from "@/helpers"

export default async ({ params }: IParamsCustomer) => {
  const id = params?.userId ?? null

  const { data } = await getUserId(id!)

  if (!data)
    return (
      <aside className="w-full h-full rounded-2xl md:rounded-2 bg-BG-second md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)]" />
    )

  const { created, profile } = data ?? {}
  const { image, firstName, lastName = "" } = profile ?? {}

  return (
    <aside className="w-full h-fit md:h-full rounded-2xl md:rounded-2 bg-BG-second flex flex-col md:justify-between md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] md:overflow-y-auto gap-4 md:gap-6 max-md:p-4 md:px-5 md:pt-5">
      <article className="w-full flex flex-col gap-4 items-center overflow-x-hidden">
        <section
          className={cx("relative w-full", "grid grid-cols-[5rem_minmax(0,1fr)] gap-4", "md:flex md:flex-col md:items-center md:gap-3")}
        >
          <div className={`w-20 h-20 relative p-10 ${!!image ? "rounded-2xl" : "bg-grey-stroke-light rounded-.625"}`}>
            {!!image ? (
              <NextImageMotion
                className="rounded-2xl overflow-hidden w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src={image?.attributes?.url}
                alt="avatar"
                width={240}
                height={240}
                hash={image?.attributes?.blur}
              />
            ) : (
              <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 z-10 *:w-5 *:h-5">
              <IconVerifiedTick />
            </div>
          </div>
          <section className={cx("w-full", "flex flex-col items-start md:items-center gap-1")}>
            <h3 className="text-text-primary text-xl font-semibold text-left md:text-center">
              {firstName || "Имя"} {lastName}
            </h3>
            <OnlineStatus user={data} />
          </section>
        </section>
        <section className={`w-full md:hidden ${!profile?.about && "hidden"}`}>
          <ProfileDescription user={data!} />
        </section>
        <FriendsButtons user={data} />
      </article>
      <article className="w-full flex flex-col gap-3 justify-start max-md:hidden overflow-x-hidden">
        <ProfileDescription user={data!} />
        <Suspense
          fallback={
            <article className="loading-screen w-full rounded-.625 p-4 border border-solid border-grey-stroke-light grid grid-cols-[minmax(0,1fr)_3.125rem] gap-2.5 *::h-5 *::w-full *::rounded-xl">
              <span />
              <span />
            </article>
          }
        >
          <PlaqueFriends id={id} />
        </Suspense>
      </article>
      <footer className="mt-auto w-full flex flex-col gap-3 items-center pb-4 max-md:hidden">
        <div className="w-full pb-4 grid grid-cols-[minmax(0,1fr)_2.25rem] gap-2.5 border-b border-solid border-grey-stroke-light">
          <FooterButton user={data} />
        </div>
        <time className="w-full text-text-disabled text-xs text-center font-normal" dateTime={created as unknown as string}>
          На Sheira c {formatOfMMMM(created)}
        </time>
      </footer>
    </aside>
  )
}
