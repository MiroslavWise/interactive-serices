import Link from "next/link"
import { memo, useMemo } from "react"

import { type IPosts } from "@/services/posts/types"

import { IconGeo } from "@/components/icons/IconGeo"

import { dispatchMapCoordinates } from "@/store"

function GeoData({ post }: { post: IPosts }) {
  const geo = useMemo(() => {
    if (!post?.addresses?.length) return null

    const address = post.addresses[0]

    const additional = address?.additional?.replace(`${address?.country}, `, "").replace(`${address?.region}, `, "") ?? ""

    return additional
  }, [post?.addresses])

  const geoData = post?.addresses?.length > 0 ? post?.addresses[0] : null

  return geo ? (
    <Link
      className="w-full cursor-pointer grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2"
      onClick={() => {
        if (geoData) {
          dispatchMapCoordinates({
            zoom: 17,
            coordinates: geoData?.coordinates?.split(" ")?.map(Number),
          })
        }
      }}
      href={{ pathname: "/" }}
      title="Перейти к точке на карте"
      aria-label="Перейти к точке на карте"
      aria-labelledby="Перейти к точке на карте"
    >
      <div className="relative w-4 h-4 p-2 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
        <IconGeo />
      </div>
      <span className="text-text-secondary leading-4 text-[0.8125rem] font-normal">{geo}</span>
      {/* <div className="w-5 h-5 p-2.5  relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
        <IconArrowRight />
      </div> */}
    </Link>
  ) : null
}

GeoData.displayName = "GeoData"
export default memo(GeoData)
