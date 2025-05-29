import { useMemo } from "react"

import type { TBlockTitle } from "./types/types"

import Avatar from "@avatar"
// import { GeoTagging } from "@/components/common"

import { cx } from "@/lib/cx"

export const BlockTitle: TBlockTitle = ({ profile, id: userId }) => {
  const { firstName, lastName } = profile ?? {}

  return (
    <div className="w-full gap-3 grid grid-cols-[2.75rem_minmax(0,1fr)]">
      <Avatar className={cx("w-11 h-11", profile?.image ? "rounded-xl" : "rounded-lg")} image={profile?.image} userId={userId} />
      <div className="w-full flex flex-col *:text-ellipsis *:line-clamp-1">
        <h4 className="text-text-primary text-base font-medium">
          {firstName || "Имя"} {lastName || ""}
        </h4>
        {/* {geo ? <GeoTagging fontSize={12} location={geo} /> : null} */}
      </div>
    </div>
  )
}
