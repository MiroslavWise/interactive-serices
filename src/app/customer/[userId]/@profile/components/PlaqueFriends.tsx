import Link from "next/link"
import { cache } from "react"

import ButtonFriends from "./ButtonFriends"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { serviceFriends } from "@/services"

const get = cache(serviceFriends.getId)

async function PlaqueFriends({ id }: { id: number | string }) {
  const { res } = await get(id)

  const items = res || []
  const length = items.length
  const threeFriends = items?.filter((_) => !!_.image).slice(2)

  return (
    <section className="w-full md:border-y-[1px] border-solid border-grey-stroke-light py-2 flex flex-row items-center justify-between gap-2">
      <p className="text-text-primary text-sm font-medium">{length} друзей</p>
      <article className="flex flex-row items-center gap-0.625">
        <div className="flex flex-row items-center flex-nowrap pr-0.375">
          {threeFriends.map((_, index) => (
            <Link
              key={`::key::user::friends::img::${_.id}::`}
              href={{ pathname: `/customer/${_.id}` }}
              className={"w-7 h-7 rounded-[0.875rem] relative p-0.875 bg-BG-second !-mr-0.375"}
              title={`${_?.firstName} ${_.lastName}`}
              aria-label={`${_?.firstName} ${_.lastName}`}
              aria-labelledby={`${_?.firstName} ${_.lastName}`}
              style={{
                zIndex: 10 + index,
              }}
            >
              {!!_.image ? (
                <NextImageMotion
                  className="w-6 h-6 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={_.image?.attributes?.url}
                  alt="avatar"
                  width={40}
                  height={40}
                />
              ) : (
                <IconEmptyProfile className="w-5 h-5 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </Link>
          ))}
        </div>
        <ButtonFriends />
      </article>
    </section>
  )
}

PlaqueFriends.displayName = "PlaqueFriends"
export default PlaqueFriends
