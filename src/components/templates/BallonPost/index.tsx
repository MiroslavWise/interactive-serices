import { useState } from "react"

import { type TTypeNavigatePost } from "./utils/schema"

import ListNotes from "./components/ListNotes"
import IconPost from "@/components/icons/IconPost"
import ComponentProfilePost from "./components/Profile"
import ListCommentsPost from "./components/ListComments"
import ContextComments from "./components/ContextComments"
// import { NextImageMotion } from "@/components/common/Image"
import NavigationNoteAndComments from "./components/Navigation"
import ComponentParticipants from "./components/ComponentParticipants"

import { cx } from "@/lib/cx"
import { useBalloonPost } from "@/store"

function BallonPost() {
  const data = useBalloonPost(({ data }) => data)
  const { title, archive, urgent, id, isParticipants, company } = data ?? {}
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

  // const isAdvertising = !!company
  // const { image, title: titleCompany } = company ?? {}

  return (
    // isAdvertising ? (
    //   <>
    //     <header
    //       className={cx(
    //         "w-full bg-[var(--card-svg-yellow)] rounded-t-3xl md:rounded-t-2 overflow-hidden p-5 pb-11 md:pb-[3.25rem]",
    //         !!image ? "grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4" : "flex items-center justify-start",
    //         "-mb-6 md:-mb-8",
    //       )}
    //     >
    //       <div className={cx("relative w-10 h-10 rounded-sm overflow-hidden", !!image ? "flex" : "hidden")}>
    //         {!!image ? (
    //           <NextImageMotion
    //             src={image?.attributes?.url}
    //             hash={image?.attributes?.blur}
    //             alt={titleCompany ?? ""}
    //             width={80}
    //             height={80}
    //             className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
    //           />
    //         ) : null}
    //       </div>
    //       <h2 className="text-xl font-bold text-text-button">{title}</h2>
    //     </header>
    //     <section className="w-full h-full rounded-3xl md:rounded-2 bg-BG-second flex flex-col overflow-hidden p-5"></section>
    //   </>
    // ) :
    <>
      <header
        className={cx(
          "w-full py-4 px-5 max-md:pr-16 grid gap-2.5 border-b border-solid bg-card-yellow border-card-border-yellow rounded-t-3xl md:rounded-t-2",
          archive ? "grid-cols-[1.5rem_minmax(0,1fr)_5.6875rem]" : "grid-cols-[1.5rem_minmax(0,1fr)]",
        )}
      >
        <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *:h-6">
          {!!urgent ? <img src="/png/category/heart.png" width={26} height={26} alt="headrt" /> : <IconPost />}
        </div>
        <h3 className="text-xl font-semibold text-text-primary">{title || "Пост"}</h3>
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
