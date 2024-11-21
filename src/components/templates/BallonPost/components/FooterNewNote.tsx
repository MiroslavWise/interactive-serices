import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchOpenCreateNote, useAuth, useBalloonPost } from "@/store"
import { useContextPostsComments } from "./ContextComments"
import { patchPost } from "@/services/posts"
import { useState } from "react"

function FooterNewNote() {
  const [loading, setLoading] = useState(false)
  const data = useBalloonPost(({ data }) => data)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { id, userId: userIdPost, title, archive } = data ?? {}

  const { isBecomeMember } = useContextPostsComments()

  if (isBecomeMember) {
    return (
      <footer
        className={cx(
          "fixed md:absolute bottom-0 left-0 right-0 bg-BG-second p-5 pt-2.5 md:rounded-b-2",
          isBecomeMember ? "flex opacity-100 visible z-40" : "hidden opacity-0 -z-10 invisible",
        )}
      >
        <Button
          type="button"
          typeButton="fill-primary"
          label="Стать участником"
          onClick={async () => {
            if (!!userId) {
              if (!loading) {
                setLoading(true)
                await patchPost(id!, {})
                setLoading(false)
              }
            } else {
            }
          }}
        />
      </footer>
    )
  }

  if (archive) {
    return (
      <footer className="fixed md:absolute bottom-0 left-0 right-0 bg-BG-second p-5 pt-2.5 md:rounded-b-2 flex opacity-100 visible z-40 items-center justify-center border-t border-solid border-grey-stroke-light">
        <span className="text-text-secondary text-sm font-normal">Пост в архиве</span>
      </footer>
    )
  }

  return (
    <footer
      className={cx(
        "fixed md:absolute bottom-0 left-0 right-0 bg-BG-second p-5 pt-2.5 md:rounded-b-2",
        userIdPost === userId && !archive ? "flex opacity-100 visible z-40" : "hidden opacity-0 -z-10 invisible",
      )}
    >
      <Button type="button" typeButton="fill-primary" label="Добавить запись" onClick={() => dispatchOpenCreateNote(id!, title!)} />
    </footer>
  )
}

FooterNewNote.displayName = "FooterNewNote"
export default FooterNewNote
