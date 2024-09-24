import { useState } from "react"

import ListNotes from "./components/ListNotes"
import IconPost from "@/components/icons/IconPost"
import ComponentProfilePost from "./components/Profile"
import ListCommentsPost from "./components/ListComments"
import ContextComments from "./components/ContextComments"
import NavigationNoteAndComments from "./components/Navigation"

import { cx } from "@/lib/cx"
import { useBalloonPost } from "@/store"
import ComponentHelper from "../Balloon/components/ComponentHelper"

function BallonPost() {
  const data = useBalloonPost(({ data }) => data)
  const { title, archive, urgent } = data ?? {}

  const [state, setState] = useState<"notes" | "comments">("notes")

  function handleToComments() {
    setState("comments")
  }

  function handleToNote(id: number) {
    setState("notes")
  }

  return (
    <>
      <ComponentHelper urgent={!!urgent} />
      <header
        className={cx(
          "w-full py-4 px-5 max-md:pr-16 grid  gap-2.5 border-b border-solid bg-card-yellow border-card-border-yellow",
          archive ? "grid-cols-[1.5rem_minmax(0,1fr)_5.6875rem]" : "grid-cols-[1.5rem_minmax(0,1fr)]",
          !urgent && "rounded-t-3xl md:rounded-t-2",
        )}
      >
        <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *:h-6">
          <IconPost />
        </div>
        <h3 className="text-xl font-semibold text-text-primary">{title || "Пост"}</h3>
        <div className={cx("py-1 px-3 h-6 rounded-xl bg-element-grey", archive ? "flex items-center justify-center" : "hidden")}>
          <span className="text-text-button text-xs font-normal">Завершено</span>
        </div>
      </header>
      <section className="w-full h-full flex flex-col md:rounded-b-2 bg-BG-second overflow-hidden">
        <ul className="w-full h-full px-5 overflow-y-auto flex flex-col gap-5 py-5">
          <ComponentProfilePost post={data!} />
          <ContextComments>
            <NavigationNoteAndComments post={data!} {...{ state, setState }} />
            {state === "notes" ? (
              <ListNotes handleToComments={handleToComments} />
            ) : state === "comments" ? (
              <ListCommentsPost post={data!} handleToNote={handleToNote} />
            ) : null}
          </ContextComments>
        </ul>
      </section>
    </>
  )
}

BallonPost.displayName = "BallonPost"
export default BallonPost
