import { useState } from "react"

import IconPost from "@/components/icons/IconPost"

import ComponentProfilePost from "./components/Profile"
import NavigationNoteAndComments from "./components/Navigation"

import { useBalloonPost } from "@/store"
import ListNotes from "./components/ListNotes"

function BallonPost() {
  const data = useBalloonPost(({ data }) => data)
  const { title, id, notes = [], addresses } = data ?? {}

  const [state, setState] = useState<"notes" | "comments">("notes")

  function handleToComments() {
    setState("comments")
  }

  return (
    <>
      <header className="w-full py-4 px-5 max-md:pr-16 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2.5 border-b border-solid rounded-t-3xl md:rounded-t-[2rem]">
        <div className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *:h-6">
          <IconPost />
        </div>
        <h3 className="text-xl font-semibold text-text-primary">{title || "Пост"}</h3>
      </header>
      <section className="w-full h-full flex flex-col md:rounded-b-[2rem] bg-BG-second overflow-hidden">
        <ul className="w-full px-5 overflow-y-auto flex flex-col gap-5 py-5">
          <ComponentProfilePost post={data!} />
          <NavigationNoteAndComments post={data!} {...{ state, setState }} />
          <ListNotes notes={notes ?? []} handleToComments={handleToComments} />
        </ul>
      </section>
    </>
  )
}

BallonPost.displayName = "BallonPost"
export default BallonPost
