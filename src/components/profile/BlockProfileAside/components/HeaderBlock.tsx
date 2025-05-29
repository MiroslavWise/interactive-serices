import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useQuery } from "@tanstack/react-query"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { useAuth } from "@/store"
import { getUserId } from "@/services"

import { cx } from "@/lib/cx"

function HeaderBlock() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, isLoading } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: res } = data ?? {}
  const { profile, created } = res ?? {}
  const { image, firstName, lastName } = profile ?? {}

  if (isLoading)
    return (
      <header className="loading-screen w-full flex flex-col items-center gap-3">
        <span className="w-20 h-20 rounded-2xl" />
        <span className="w-full max-w-[50%] h-4 rounded-lg" />
        <span className="w-full h-9 rounded-[1.125rem]" />
      </header>
    )

  return (
    <header className="w-full flex flex-col items-center gap-4" data-test="block-profile-aside-header">
      <div
        className={cx("w-20 h-20 relative p-10", image ? "rounded-2xl" : "bg-grey-stroke-light rounded-.625")}
        data-test="block-profile-aside-avatar-div"
      >
        {!!image ? (
          <NextImageMotion
            className="rounded-2xl overflow-hidden w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={image?.attributes?.url}
            alt="avatar"
            width={160}
            height={160}
            hash={image?.attributes?.blur}
          />
        ) : (
          <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
        )}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 z-10 *:w-5 *:h-5">
          <IconVerifiedTick />
        </div>
      </div>
      <section data-test="block-profile-aside-section-info" className="flex flex-col items-center gap-1.5">
        <h4 data-test="block-profile-aside-section-info-h4" className="text-text-primary text-center text-xl font-semibold">
          {firstName || "Имя"} {lastName || ""}
        </h4>
        {created ? (
          <time
            dateTime={`${created}`}
            data-test="block-profile-aside-section-info-time"
            className="text-text-disabled text-center text-xs font-normal"
          >
            На Sheira с {format(created! as unknown as Date, "do MMMM yyyy", { locale: ru })}
          </time>
        ) : null}
      </section>
    </header>
  )
}

HeaderBlock.displayName = "HeaderBlock"
export default HeaderBlock
