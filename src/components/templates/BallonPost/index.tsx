import { useState } from "react"

import { type TTypeNavigatePost } from "./utils/schema"

import ListNotes from "./components/ListNotes"
import IconPost from "@/components/icons/IconPost"
import { NextImageMotion } from "@/components/common"
import ComponentProfilePost from "./components/Profile"
import ListCommentsPost from "./components/ListComments"
import ContextComments from "./components/ContextComments"
// import { NextImageMotion } from "@/components/common/Image"
import NavigationNoteAndComments from "./components/Navigation"
import ComponentParticipants from "./components/ComponentParticipants"

import { cx } from "@/lib/cx"
import { useBalloonPost } from "@/store"
import { SpriteHeart } from "@/components/icons/icon-sprite-heart"

function BallonPost() {
  const data = useBalloonPost(({ data }) => data)
  const { title = "", archive, urgent, id, isParticipants, company } = data ?? {}
  const [state, setState] = useState<TTypeNavigatePost>("notes")

  function handleToComments() {
    setState("comments")
  }

  function handleToNote(id: number) {
    setState("notes")
  }

  const obj = {
    /** Вкладка заметок */
    notes: <ListNotes handleToComments={handleToComments} />,
    /** Вкладка комментариев */
    comments: <ListCommentsPost post={data!} handleToNote={handleToNote} />,
    /** Вкладка участников */
    participants: <ComponentParticipants postUserId={data?.userId!} id={id!} title={title ?? ""} isParticipant={!!isParticipants} />,
  } as const

  const isAdvertising = !!company

  return (
    <>
      <header
        className={cx(
          "w-full py-4 px-5 max-md:pr-16 grid gap-2.5 border-b border-solid border-card-border-yellow rounded-t-3xl md:rounded-t-2",
          archive ? "grid-cols-[1.75rem_minmax(0,1fr)_5.6875rem]" : "grid-cols-[1.75rem_minmax(0,1fr)]",
          isAdvertising ? "bg-[var(--card-svg-yellow)]" : "bg-card-yellow",
        )}
      >
        <div className="w-7 h-7 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 [&>svg]:w-6 [&>svg]:h-6">
          {isAdvertising && !!company?.image ? (
            <div className="w-7 h-7 aspect-square relative overflow-hidden rounded-md">
              <NextImageMotion
                src={company?.image!?.attributes?.url!}
                alt={title!}
                hash={company?.image?.attributes?.blur}
                width={80}
                height={80}
                className="w-7 h-7"
              />
            </div>
          ) : !!urgent ? (
            <SpriteHeart />
          ) : (
            <IconPost />
          )}
        </div>
        <h3 className={cx("text-xl font-semibold text-text-primary", isAdvertising ? "text-text-button" : "text-text-primary")}>
          {title || "Пост"}
        </h3>
        <div className={cx("py-1 px-3 h-6 rounded-xl bg-element-grey", archive ? "flex items-center justify-center" : "hidden")}>
          <span className="text-text-button text-xs font-normal">Завершено</span>
        </div>
      </header>
      <section className="w-full h-full flex flex-col md:rounded-b-2 bg-BG-second overflow-hidden">
        <ul className="w-full h-full overflow-y-auto flex flex-col gap-5 p-5">
          <ComponentProfilePost post={data!} />
          <ContextComments>
            <NavigationNoteAndComments post={data!} {...{ state, setState }} />
            {obj[state]}
          </ContextComments>
        </ul>
      </section>
    </>
  )
}

BallonPost.displayName = "BallonPost"
export default BallonPost
