import Link from "next/link"

import ButtonFriends from "./ButtonFriends"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { getFiendId } from "@/services"

async function PlaqueFriends({ id }: { id: number | string }) {
  const { data } = await getFiendId(id)

  const items = data || []
  const length = items.length
  const threeFriends = items?.filter((_) => !!_.image).slice(0, 2)

  return (
    <section className="w-full md:border-y border-solid border-grey-stroke-light py-2 flex flex-row items-center justify-between gap-2">
      <p className="text-text-primary text-sm font-medium">{length} друзей</p>
      <article className="flex flex-row items-center gap-2.5">
        <div className="flex flex-row items-center flex-nowrap pr-1.5">
          {threeFriends.map((_, index) => (
            <Link
              key={`::key::user::friends::img::${_.id}::`}
              href={{ pathname: `/customer/${_.id}` }}
              className={"w-7 h-7 rounded-[0.875rem] relative p-3.5 bg-BG-second !-mr-1.5"}
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
                  width={80}
                  height={80}
                  hash={_.image?.attributes?.blur}
                />
              ) : (
                <IconEmptyProfile className="w-5 h-5 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </Link>
          ))}
        </div>
        {items.length ? <ButtonFriends id={id as number} /> : null}
      </article>
    </section>
  )
}

PlaqueFriends.displayName = "PlaqueFriends"
export default PlaqueFriends
