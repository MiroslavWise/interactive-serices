import Link from "next/link"
import { useMemo } from "react"

import type { TBlockTitle } from "./types/types"

import { NextImageMotion, GeoTagging } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import Avatar from "@avatar"

export const BlockTitle: TBlockTitle = ({ profile, addresses, id: userId }) => {
  const geo = useMemo(() => {
    if (!addresses) {
      return null
    }
    if (Array.isArray(addresses) && !addresses.length) {
      return null
    }
    return addresses[0]?.additional
  }, [addresses])

  return (
    <div className="w-full gap-3 grid grid-cols-[2.75rem_minmax(0,1fr)]">
      <Avatar className={cx("w-11 h-11", profile?.image ? "rounded-xl" : "rounded-lg")} image={profile?.image} userId={userId} />
      <div className="w-full flex flex-col *:text-ellipsis *:line-clamp-1">
        <h4 className="text-text-primary text-base font-medium">
          {profile?.firstName || "Имя"} {profile?.lastName || "Фамилия"}
        </h4>
        {geo ? <GeoTagging fontSize={12} location={geo} /> : null}
      </div>
    </div>
  )
}
