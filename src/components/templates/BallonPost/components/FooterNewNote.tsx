import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumSign } from "@/types/enum"

import Button from "@/components/common/Button"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { useContextPostsComments } from "./ContextComments"
import { getPostParticipants, patchPost } from "@/services/posts"
import { dispatchAuthModal, dispatchOpenCreateNote, useAuth, useBalloonPost } from "@/store"

function FooterNewNote() {
  const [loading, setLoading] = useState(false)
  const data = useBalloonPost(({ data }) => data)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { id, userId: userIdPost, title, archive } = data ?? {}
  const { on } = useToast()

  const { isBecomeMember } = useContextPostsComments()

  const {
    data: dataP,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: () => getPostParticipants(data?.id!),
    queryKey: ["participants", { id: data?.id }],
    enabled: data?.isParticipants && userId !== userIdPost && !!userId,
    refetchOnMount: true,
  })

  const is = !!dataP?.data && dataP?.data?.participants?.length > 0 && dataP?.data?.participants.some((_) => _.id === userId)

  if (isBecomeMember && !userId) {
    return (
      <footer className="flex flex-col gap-2.5 items-center justify-center my-auto fixed md:absolute bottom-0 left-0 right-0 bg-BG-second md:rounded-b-2 border-t border-solid border-grey-stroke-light">
        <h4 className="text-text-primary text-lg font-semibold text-center">Желаете стать участником события?</h4>
        <p className="text-text-secondary text-center text-sm font-normal">
          <a onClick={() => dispatchAuthModal({ visible: true, type: EnumSign.SignIn })} className="text-element-accent-1">
            Войдите
          </a>{" "}
          или{" "}
          <a onClick={() => dispatchAuthModal({ visible: true, type: EnumSign.SignUp })} className="text-element-accent-1">
            зарегистрируйтесь
          </a>
        </p>
      </footer>
    )
  }

  if (isBecomeMember && !is) {
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
              if (!loading && !is && !isLoading) {
                setLoading(true)
                await patchPost(id!, {})
                on({
                  message: "Вы были добавлены в список учасников данного мероприятия",
                })
                await refetch()
                setLoading(false)
              }
            }
          }}
          loading={loading || isLoading}
          disabled={loading || isLoading}
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
