import Link from "next/link"
import Image from "next/image"

import type { TInfoContainerProfile } from "../types/types"

import { ImageStatic, NextImageMotion, GeoTagging } from "@/components/common"

import { useAuth } from "@/store"

export const InfoContainerProfile: TInfoContainerProfile = (props) => {
  const { profile, addresses, id } = props ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const geo = addresses?.find((item) => item.addressType === "main")?.additional || null

  return (
    <div data-info-container>
      <div data-avatar-and-achievements>
        <div data-avatar>
          {profile?.image?.attributes?.url ? (
            <NextImageMotion alt="avatar" src={profile?.image?.attributes?.url} width={94} height={94} />
          ) : (
            <ImageStatic src="/png/default_avatar.png" alt="avatar" width={94} height={94} />
          )}
          <Image data-verified src="/svg/verified-tick.svg" alt="tick" width={32} height={32} unoptimized />
        </div>
      </div>
      <div data-title-and-geo-and-description>
        <div data-name-geo-description>
          <div data-name-and-geo>
            <h2>
              {profile?.firstName} {profile?.lastName}
            </h2>
            {geo ? <GeoTagging location={geo} /> : null}
          </div>
          <p data-description>{profile?.about}</p>
        </div>
        {userId !== profile?.userId && !!userId ? (
          <section data-buttons>
            <Link href={userId ? { pathname: "/messages", query: { user: id } } : {}} data-circle-gradient>
              <img src="/svg/message-dots-circle-primary.svg" alt="message-dots-circle" width={20} height={20} />
            </Link>
          </section>
        ) : null}
      </div>
    </div>
  )
}
