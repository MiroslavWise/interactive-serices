import { useQuery } from "@tanstack/react-query"
import { type DispatchWithoutAction, memo, useMemo, useState } from "react"

import { type INotes } from "@/services/notes/types"

import ItemNote from "./ItemNote"
import FooterNewNote from "./FooterNewNote"
import ListNotesHeader from "./ListNotesHeader"

import { cx } from "@/lib/cx"
import { getNotes } from "@/services/notes"
import { useAuth, useBalloonPost } from "@/store"

function ListNotes({ notes, handleToComments }: { notes: INotes[]; handleToComments: DispatchWithoutAction }) {
  const [newState, setNewState] = useState(true)

  const { data } = useQuery({
    queryFn: () => getNotes({ order: "DESC" }),
    queryKey: ["notes"],
  })

  const list = data?.data || []

  return (
    <section className="w-full flex flex-col gap-5">
      <ListNotesHeader setNewState={setNewState} newState={newState} length={list.length} />
      <List notes={list} handleToComments={handleToComments} newState={newState} />
      <FooterNewNote />
    </section>
  )
}

const List = memo(function ({
  newState,
  notes,
  handleToComments,
}: {
  notes: INotes[]
  handleToComments: DispatchWithoutAction
  newState: boolean
}) {
  const filter = useMemo(() => notes.sort((a, b) => (newState ? b.id - a.id : a.id - b.id)), [newState, notes])

  const data = useBalloonPost(({ data }) => data)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { userId: userIdPost } = data ?? {}

  return (
    <ul className={cx("w-full flex flex-col gap-2.5", userIdPost === userId && "pb-16")}>
      {filter.map((item) => (
        <ItemNote note={item} key={`:key:note:${item.id}:`} handleToComments={handleToComments} />
      ))}
    </ul>
  )
})

ListNotes.displayName = "ListNotes"
export default memo(ListNotes)
