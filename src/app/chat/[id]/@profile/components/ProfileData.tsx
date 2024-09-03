import { type IUserResponse } from "@/services/users/types"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import OnlineStatus from "@/app/customer/[userId]/@profile/components/OnlineStatus"

function ProfileData({ user }: { user: IUserResponse }) {
  const { profile } = user ?? {}
  const { image, firstName, lastName } = profile ?? {}

  return (
    <article className="w-full flex flex-col gap-3 items-center pt-5 pb-2.5">
      <section className={`w-20 h-20 rounded-2xl relative p-10 ${!image && "bg-grey-stroke-light !rounded-[0.625rem]"}`}>
        {!!image ? (
          <NextImageMotion
            className="rounded-2xl overflow-hidden w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={image?.attributes?.url}
            alt="avatar"
            width={100}
            height={100}
          />
        ) : (
          <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
        )}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 z-10 *:w-5 *:h-5">
          <IconVerifiedTick />
        </div>
      </section>
      <div className="w-full flex flex-col gap-1 items-center">
        <h3 className="text-center text-xl font-semibold text-text-primary">
          {firstName || "Имя"} {lastName || "Фамилия"}
        </h3>
        <OnlineStatus user={user} />
      </div>
    </article>
  )
}

ProfileData.displayName = "ProfileData"
export default ProfileData
