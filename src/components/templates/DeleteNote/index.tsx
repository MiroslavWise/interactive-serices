import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import Button from "@/components/common/Button"
import IconXClose from "@/components/icons/IconXClose"
import IconTrashBlack from "@/components/icons/IconTrashBlack"

import { cx } from "@/lib/cx"
import { deleteNote, getNotes } from "@/services/notes"
import { dispatchDeleteNote, useDeleteNote } from "@/store"

function DeleteNote() {
  const data = useDeleteNote(({ data }) => data)
  const [loading, setLoading] = useState(false)

  const { refetch: refetchNotes } = useQuery({
    queryFn: () => getNotes({ order: "DESC", post: data?.postId! }),
    queryKey: ["notes", { order: "DESC", postId: data?.postId! }],
    enabled: false,
  })

  async function ok() {
    if (!loading && !!data?.id) {
      setLoading(true)
      await deleteNote(data?.id)
      await refetchNotes()
      setLoading(false)
      no()
    }
  }
  function no() {
    dispatchDeleteNote()
  }

  return (
    <div
      className={cx(
        "fixed w-full h-full inset-0 md:pt-48 md:px-5 bg-translucent",
        !!data ? "flex flex-col items-center max-md:justify-end z-[1020]" : "hidden -z-10",
      )}
    >
      <section className="w-full md:max-w-[33.75rem] flex flex-col gap-[1.875rem] items-center rounded-t-3xl md:rounded-2 bg-BG-second p-5 md:p-10 pt-9 md:pt-5 relative">
        <button
          className="absolute top-0 translate-x-full -right-4 h-12 w-12 rounded-full md:bg-BG-second p-3.5 [&>svg>path]:stroke-text-primary"
          onClick={no}
        >
          <IconXClose />
        </button>
        <article className="flex flex-col items-center gap-5">
          <div className="relative h-11 w-11 bg-grey-field rounded-full *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-element-accent-1">
            <IconTrashBlack />
          </div>
          <h2 className="text-text-primary text-2xl font-semibold text-center">Вы хотите удалить запись?</h2>
        </article>
        <footer className="w-full flex flex-col-reverse md:flex-row items-center gap-3">
          <Button type="button" typeButton="regular-primary" label="Нет, оставить" onClick={no} loading={loading} disabled={loading} />
          <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={ok} loading={loading} disabled={loading} />
        </footer>
      </section>
    </div>
  )
}

DeleteNote.displayName = "DeleteNote"
export default DeleteNote
