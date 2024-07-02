import Link from "next/link"
import { useMemo } from "react"

import type { TBlockTitle } from "./types/types"

import { NextImageMotion, GeoTagging } from "@/components/common"

import styles from "./styles/style.module.scss"

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
    <div className={styles.title}>
      <Link
        className={styles.avatar}
        href={{
          pathname: `/customer/${userId}`,
        }}
      >
        <NextImageMotion src={profile?.image?.attributes?.url!} alt="avatar" width={60} height={60} className={styles.photo} />
      </Link>
      <div className={styles.nameGeo}>
        <h4>
          {profile?.firstName || ""} {profile?.lastName || ""}
        </h4>
        {geo ? <GeoTagging size={14} fontSize={12} location={geo} /> : null}
      </div>
    </div>
  )
}
