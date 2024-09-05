import Link from "next/link"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import ProfileItem from "./ProfileItem"
import ItemHeaderPost from "./ItemHeaderPost"
import ItemCommentsPost from "./ItemCommentsPost"
import IconNote from "@/components/icons/IconNote"
import IconPost from "@/components/icons/IconPost"
import IconMapWhite from "@/components/icons/IconMapWhite"
import IconArrowRight from "@/components/icons/IconArrowRight"

import { nameTitle } from "@/lib/names"
import { dispatchBallonPost, dispatchMapCoordinates } from "@/store"

function ItemPost({ post }: { post: IPosts }) {
  const { title, notes, addresses, user, id } = post ?? {}

  const firstAddress = addresses.length ? addresses[0] : null
  const additional = firstAddress?.additional?.replace(`${firstAddress?.country}, `, "").replace(`${firstAddress?.region}, `, "") ?? ""
  const firstNote = notes[0] ?? {}

  function handle() {
    dispatchBallonPost(post)
  }

  return (
    <li className="w-full p-4 bg-BG-second flex flex-col gap-3 rounded-2xl cursor-pointer" onClick={handle}>
      <ItemHeaderPost post={post} />
      <div className="w-full grid grid-cols-[1.625rem_minmax(0,1fr)] gap-3 items-start">
        <div className="relative w-[1.625rem] h-[1.625rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2">
          <IconPost />
        </div>
        <h3 className="text-text-primary text-ellipsis text-base font-semibold line-clamp-2">{title || "Пост"}</h3>
      </div>
      <article className="w-full flex flex-col gap-4 h-full">
        <p className="text-text-primary text-ellipsis text-sm line-clamp-4 whitespace-pre-wrap">
          {firstNote?.description || "Описание поста"}
        </p>
        <div className="w-full flex flex-row items-center justify-start gap-2.5 *:h-[1.875rem] *:rounded-[0.9375rem] mt-auto">
          <div className="px-2.5 w-fit bg-grey-field py-[0.3125rem] gap-1 grid grid-cols-[1.25rem_minmax(0,1fr)] items-center">
            <div className="w-5 h-5 relative p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 *:scale-90">
              <IconNote />
            </div>
            <span className="text-text-primary text-xs font-medium whitespace-nowrap">
              {notes.length} {nameTitle(notes.length, EnumTypeProvider.NOTE)}
            </span>
          </div>
          <ItemCommentsPost id={id} />
        </div>
        <Link
          href={{ pathname: "/" }}
          onClick={() => {
            if (firstAddress) {
              dispatchMapCoordinates({
                zoom: 17,
                coordinates: firstAddress?.coordinates?.split(" ")?.map(Number),
              })
            }
          }}
          className="w-full cursor-pointer items-start place-items-start grid grid-cols-[1.5rem_minmax(0,1fr)_1.25rem] gap-2 mt-auto"
        >
          <div className="relative w-6 h-6 p-3 rounded-xl bg-element-accent-1 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[0.9rem] *:h-[0.9rem]">
            <IconMapWhite />
          </div>
          <p
            className="text-text-primary text-sm text-nowrap whitespace-nowrap text-start font-normal line-clamp-1 text-ellipsis overflow-hidden w-[inherit]"
            title={additional}
            aria-label={additional}
            aria-labelledby={additional}
          >
            {additional}
          </p>
          <div className="w-5 h-5 p-2.5  relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
            <IconArrowRight />
          </div>
        </Link>
        <ProfileItem user={user} />
      </article>
    </li>
  )
}

ItemPost.displayName = "ItemPost"
export default ItemPost
