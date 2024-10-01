import { useQuery } from "@tanstack/react-query"
import { type DispatchWithoutAction, memo, useEffect, useMemo, useState } from "react"

import { type INotes } from "@/services/notes/types"

import ItemNote from "./ItemNote"
import FooterNewNote from "./FooterNewNote"
import ListNotesHeader from "./ListNotesHeader"

import { cx } from "@/lib/cx"
import { getNotes } from "@/services/notes"
import { useAuth, useBalloonPost } from "@/store"
import { useContextPostsComments } from "./ContextComments"

function ListNotes({ handleToComments }: { handleToComments: DispatchWithoutAction }) {
  const post = useBalloonPost(({ data }) => data)
  const { id } = post ?? {}
  const [newState, setNewState] = useState(true)

  const { data, isLoading } = useQuery({
    queryFn: () => getNotes({ order: "DESC", post: id! }),
    queryKey: ["notes", { order: "DESC", postId: id }],
    enabled: !!id,
    refetchOnMount: true,
  })

  const list = data?.data || []

  return (
    <section className="w-full flex flex-col gap-5">
      <ListNotesHeader setNewState={setNewState} newState={newState} length={list.length} />
      <List notes={list} handleToComments={handleToComments} newState={newState} isLoading={isLoading} />
      <FooterNewNote />
    </section>
  )
}

const List = memo(function ({
  newState,
  notes,
  handleToComments,
  isLoading,
}: {
  notes: INotes[]
  handleToComments: DispatchWithoutAction
  newState: boolean
  isLoading: boolean
}) {
  const filter = useMemo(() => notes.sort((a, b) => (newState ? b.id - a.id : a.id - b.id)), [newState, notes])

  const data = useBalloonPost(({ data }) => data)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { userId: userIdPost, archive } = data ?? {}
  const { onNoteCurrent, isBecomeMember } = useContextPostsComments()
  useEffect(() => {
    return () => onNoteCurrent(null)
  }, [])

  return (
    <ul
      className={cx(
        "w-full flex flex-col gap-2.5",
        ((userIdPost === userId && !archive) || isBecomeMember) && "pb-16",
        !!archive && "pb-14",
      )}
    >
      {isLoading
        ? [1, 2, 3, 4].map((item) => (
            <article
              key={`:load:key:${item}:`}
              className="w-full rounded-2xl border border-solid border-grey-stroke-light p-4 flex flex-col gap-4 bg-BG-second loading-screen"
            >
              <section className="w-full flex flex-col gap-3">
                <span className="w-full max-w-[33%] h-4 rounded-lg" />
                <div className="w-full flex flex-col gap-1">
                  <span className="w-full h-4 rounded-lg" />
                  <span className="w-full h-4 rounded-lg" />
                  <span className="w-full h-4 rounded-lg" />
                </div>
                <span className="w-full rounded-2xl h-[8.125rem]" />
              </section>
              <footer className="flex flex-row items-center gap-3 *:h-[1.875rem] *:rounded-[0.9375rem]">
                <span className="w-10" />
                <span className="w-10" />
              </footer>
            </article>
          ))
        : filter.map((item) => <ItemNote note={item} key={`:key:note:${item.id}:`} handleToComments={handleToComments} />)}
    </ul>
  )
})

ListNotes.displayName = "ListNotes"
export default memo(ListNotes)
