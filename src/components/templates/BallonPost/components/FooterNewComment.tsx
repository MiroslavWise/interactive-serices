import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { EnumSign } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IUserOffer } from "@/services/offers/types"

import ItemFormAddNote from "./ItemFormAddNote"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import { dispatchAuthModal, useAuth } from "@/store"
import { useContextPostsComments } from "./ContextComments"
import { MAX_LENGTH_COMMENT, resolver, type TSchema } from "../utils/schema"
import { type IBodyPostComment, postPostsComment } from "@/services/posts-comments"
import { useToast } from "@/helpers/hooks/useToast"

function FooterNewComment({ post }: { post: IPosts }) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const user = useAuth(({ user }) => user)
  const { onUpdate, writeResponse, onWriteResponse } = useContextPostsComments()
  const [errorPost, setErrorPost] = useState(false)
  const { on } = useToast()

  const { control, handleSubmit, resetField } = useForm<TSchema>({
    resolver: resolver,
    defaultValues: {
      comment: "",
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      setErrorPost(false)
      const message = values.comment.trim()
      const body: IBodyPostComment = {
        postId: post.id,
        message: message,
        status: "published",
        enabled: true,
      }

      if (writeResponse) {
        body.noteId = writeResponse.id
      }

      const miniUser: IUserOffer = {
        about: "",
        id: userId!,
        image: user?.profile?.image!,
        firstName: user?.profile?.firstName ?? "Имя",
        lastName: user?.profile?.lastName ?? "Фамилия",
        username: user?.profile?.username ?? "username",
        gender: user?.profile?.gender!,
      }

      onUpdate({
        id: Math.random(),
        userId: userId!,
        postId: post.id,
        noteId: writeResponse?.id ?? undefined,
        message: message,
        status: "create",
        created: String(new Date()),
        user: miniUser,
        note: writeResponse ? writeResponse : undefined,
      })
      const response = await postPostsComment(body)
      clg("response: postPostsComment", response, "warning")
      if (response?.data) {
        onWriteResponse(null)
        resetField("comment")
        if (textRef.current) {
          textRef.current.style.borderRadius = `1.25rem`
          textRef.current.style.height = "2.5rem"
        }
      } else {
        setErrorPost(true)
        on({ message: "Извините, ваш комментарий не был отправлен. У нас какие-то проблемы, мы разбираемся" })
      }
      setLoading(false)
    }
  })

  if (!userId) {
    return (
      <footer className="fixed md:absolute bottom-0 left-0 right-0 w-full p-5 border-t border-solid border-grey-stroke-light bg-BG-second md:rounded-b-[2rem] z-50 flex items-center justify-center">
        <span className="text-text-primary text-sm font-medium">
          <a
            className="text-text-accent cursor-pointer"
            onClick={() => {
              dispatchAuthModal({
                visible: true,
                type: EnumSign.SignIn,
              })
            }}
          >
            Войдите в аккаунт
          </a>
          , чтобы оставить комментарий
        </span>
      </footer>
    )
  }

  if (!!post?.archive) {
    return (
      <footer className="fixed md:absolute bottom-0 left-0 right-0 w-full p-5 border-t border-solid border-grey-stroke-light bg-grey-field md:rounded-b-[2rem] z-50 flex items-center justify-center">
        <span className="text-text-secondary text-sm font-normal">Пост в архиве</span>
      </footer>
    )
  }
  //--card-svg-yellow
  return (
    <form
      className={cx(
        "fixed md:absolute bottom-0 left-0 right-0 w-full max-md:py-3 p-5 border-t border-solid border-grey-stroke-light bg-BG-second md:rounded-b-[2rem] z-50 flex flex-col gap-2.5",
        !!writeResponse ? "pt-2.5" : "pt-5",
      )}
      onSubmit={onSubmit}
    >
      <ItemFormAddNote />
      <Controller
        control={control}
        name="comment"
        render={({ field, fieldState: { error } }) => (
          <div className="w-full grid grid-cols-[minmax(0,1fr)_1.5rem] gap-2.5 items-end">
            <textarea
              {...field}
              value={field.value}
              ref={textRef}
              onChange={(event) => {
                const value = event.target.value.replace(/\s{2,}/g, " ")
                const target = event.target
                requestAnimationFrame(() => {
                  if (!!value) {
                    if (target.scrollHeight > 40) {
                      target.style.height = "auto"
                      target.style.height = target.scrollHeight + "px"
                      target.style.borderRadius = `1rem`
                    } else {
                      target.style.borderRadius = `1.25rem`
                      target.style.height = "2.5rem"
                    }
                  }
                })
                field.onChange(value)
              }}
              maxLength={MAX_LENGTH_COMMENT}
              placeholder="Ваш комментарий..."
              className={cx(
                "whitespace-pre-wrap py-2.5 px-4 h-10 w-full border border-solid border-grey-stroke focus:border-text-accent resize-none rounded-[2.5rem] outline-none text-text-primary text-sm font-normal placeholder:text-text-disabled max-h-40 md:max-h-[13.75rem]",
                (!!error || errorPost) && "border-text-error text-text-error",
              )}
            />
            <button type="submit" className="relative w-6 h-10 px-3 py-5 disabled:opacity-50" disabled={!field.value.trim()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.07469 12L4.10383 4.82283C3.64338 3.71046 4.7998 2.61684 5.89333 3.13053L22.1221 10.754C22.3382 10.8268 22.5184 10.9514 22.6582 11.108C22.8951 11.3591 23.0036 11.6805 22.9999 12C23.0036 12.3195 22.8951 12.6409 22.6581 12.892C22.5184 13.0486 22.3382 13.1732 22.1221 13.246L5.89333 20.8695C4.7998 21.3832 3.64338 20.2895 4.10383 19.1772L7.07469 12ZM5.76777 19.1927L5.74897 19.2381L5.75237 19.2365L5.76777 19.1927Z"
                  fill="var(--element-accent-1)"
                  className="fill-element-accent-1"
                />
              </svg>
            </button>
          </div>
        )}
      />
    </form>
  )
}

FooterNewComment.displayName = "FooterNewComment"
export default FooterNewComment
