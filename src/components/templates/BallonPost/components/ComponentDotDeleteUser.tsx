import { useState } from "react"

import Button from "@/components/common/Button"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { deletePostParticipantId } from "@/services/posts"

interface IProps {
  idUser: number
  id: number
  refetch(): Promise<any>
}

function ComponentDotDeleteUser({ idUser, id, refetch }: IProps) {
  const [open, set, ref] = useOutsideClickEvent()
  const [d, setD, refD] = useOutsideClickEvent()
  const [loading, setLoading] = useState(false)

  async function handleOkDelete() {
    if (!loading) {
      setLoading(true)
      await deletePostParticipantId(id, idUser)
      await refetch()
      setLoading(false)
    }
  }

  return (
    <div className="absolute top-0 right-0 w-4 h-4" ref={ref}>
      <button
        type="button"
        className="relative h-4 w-4 *:w-4 *:h-4 text-element-grey-light hover:text-element-accent-1"
        onClick={(event) => {
          event.stopPropagation()
          set((_) => !_)
        }}
      >
        <IconSprite id="dots-horizontal" className="w-4 h-4" />
      </button>
      <article
        className={cx(
          "absolute top-[calc(100%_+_0.25rem)] right-0 rounded-2xl shadow-box-down p-3 flex bg-BG-second w-max flex-col",
          open ? "opacity-100 visible z-50" : "opacity-0 invisible -z-10",
        )}
        ref={refD}
        onClick={(event) => {
          event.stopPropagation()
          set(false)
          // if (isDeleteNote) {
          //   dispatchDeleteNote(note)
          // }
        }}
      >
        {d ? (
          <>
            <article className="w-full text-center text-text-secondary text-sm font-normal flex flex-col items-center gap-0.5">
              <span>Вы уверены, что хотите удалить этого участника?</span>
            </article>
            <footer className="flex flex-row items-center gap-2">
              <Button
                type="button"
                typeButton="fill-primary"
                label="Да"
                className="h-9"
                loading={loading}
                onClick={(event) => {
                  event.stopPropagation()
                  handleOkDelete()
                }}
              />
              <Button
                type="button"
                typeButton="regular-primary"
                label="Нет"
                className="h-9"
                loading={loading}
                disabled={loading}
                onClick={(event) => {
                  event.stopPropagation()
                  setD(false)
                }}
              />
            </footer>
          </>
        ) : (
          <a
            className="w-full py-2 px-1.5 grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center rounded-md bg-BG-second hover:bg-grey-field cursor-pointer text-text-error"
            onClick={(event) => {
              event.stopPropagation()
              setD(true)
            }}
          >
            <div className="relative w-5 h-5">
              <IconSprite id="trash-20-20" className="w-5 h-5" />
            </div>
            <span className="text-sm font-normal whitespace-nowrap">Удалить участника</span>
          </a>
        )}
      </article>
    </div>
  )
}

ComponentDotDeleteUser.displayName = "ComponentDotDeleteUser"
export default ComponentDotDeleteUser
