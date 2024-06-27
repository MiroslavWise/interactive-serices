import { cache } from "react"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import ButtonClosePseudoModalAboutProfile from "./ButtonClosePseudoModalAboutProfile"

import { getUserId } from "@/services"

const get = cache(getUserId)

async function ContentPseudoModalAboutProfile({ userId }: { userId: string | number }) {
  const { res } = await get(userId)

  const { profile } = res ?? {}
  const { about = "", firstName = "Имя", lastName = "Фамилия", image } = profile ?? {}

  return (
    <section className="relative bg-BG-second pt-9 pb-8 px-5 md:p-[1.875rem] rounded-t-3xl md:rounded-[2rem] flex flex-col items-center w-full md:max-w-[28.75rem] gap-5">
      <ButtonClosePseudoModalAboutProfile />
      <article className="w-full flex flex-col items-center gap-3">
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
        <h3 className="text-center text-text-primary text-xl font-semibold">
          {firstName} {lastName}
        </h3>
      </article>
      <p className="w-full text-start text-text-primary text-sm font-normal">{about}</p>
    </section>
  )
}

ContentPseudoModalAboutProfile.displayName = "ContentPseudoModalAboutProfile"
export default ContentPseudoModalAboutProfile
