import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { type IPosts } from "@/services/posts/types"
import { EnumSign, EnumTypeProvider } from "@/types/enum"

import ItemFormAddNote from "./ItemFormAddNote"
import SendingPhotosComment from "./SendingPhotosComment"
import IconPaperClip from "@/components/icons/IconPaperClip"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import { fileUploadService } from "@/services"
import { getMiniUser } from "@/lib/get-mini-user"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthModal, useAuth } from "@/store"
import { useContextPostsComments } from "./ContextComments"
import { dispatchDelete, handleImageChange } from "../utils/comment"
import { MAX_LENGTH_COMMENT, resolver, type TSchema } from "../utils/schema"
import { getPostsCommentId, type IBodyPostComment, postPostsComment } from "@/services/posts-comments"

function FooterNewComment({ post }: { post: IPosts }) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const user = useAuth(({ user }) => user)
  const { onUpdate, writeResponse, onWriteResponse, onUpdateCurrent, refetch } = useContextPostsComments()
  const [errorPost, setErrorPost] = useState(false)
  const { on } = useToast()

  const { control, handleSubmit, resetField, watch } = useForm<TSchema>({
    resolver: resolver,
    defaultValues: {
      comment: "",
      file: {
        file: [],
        string: [],
      },
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

      const miniUser = getMiniUser(user!)

      const ID_UPDATE = Math.random()

      onUpdate({
        id: ID_UPDATE,
        userId: userId!,
        postId: post.id,
        noteId: writeResponse?.id! ?? undefined,
        message: message,
        status: "create",
        created: String(new Date()),
        user: miniUser,
        note: writeResponse ? writeResponse : undefined,
        images: [],
      })

      const images = values.file.file

      if (images.length > 0) {
        const img_s = await Promise.all(
          images.map((item) =>
            fileUploadService(item, {
              type: EnumTypeProvider.POST_COMMENT,
              userId: userId!,
              idSupplements: Number(post?.id!),
            }),
          ),
        )
        const ids = []
        for (const item of img_s) {
          if (!!item.data) {
            if (!!item.data?.id) {
              ids.push(item.data.id)
            }
          }
        }
        if (ids.length > 0) {
          body.images = ids
        }
      }

      resetField("comment")
      resetField("file")
      onWriteResponse(null)
      if (textRef.current) {
        textRef.current.style.borderRadius = `1.25rem`
        textRef.current.style.height = "2.5rem"
      }

      const response = await postPostsComment(body)
      if (!response?.data || response.error) {
        setErrorPost(true)
        on({ message: "Извините, ваш комментарий не был отправлен. У нас какие-то проблемы, мы разбираемся" })
      }
      const id = response.data?.id
      if (id && images.length > 0) {
        const responseID = await getPostsCommentId(id!)
        if (responseID?.data) {
          clg("onUpdateCurrent ID_UPDATE: ", ID_UPDATE)
          onUpdateCurrent(ID_UPDATE, responseID?.data!)
        }
      }
      setLoading(false)
    }
  })

  if (!userId) {
    return (
      <footer className="fixed md:absolute bottom-0 left-0 right-0 w-full p-5 border-t border-solid border-grey-stroke-light bg-BG-second md:rounded-b-2 z-50 flex items-center justify-center">
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
      <footer className="fixed md:absolute bottom-0 left-0 right-0 w-full p-5 border-t border-solid border-grey-stroke-light bg-grey-field md:rounded-b-2 z-50 flex items-center justify-center">
        <span className="text-text-secondary text-sm font-normal">Пост в архиве</span>
      </footer>
    )
  }

  return (
    <form
      className={cx(
        "fixed md:absolute bottom-0 left-0 right-0 w-full max-md:py-3 p-5 border-t border-solid border-grey-stroke-light bg-BG-second md:rounded-b-2 z-50 flex flex-col gap-2.5",
        !!writeResponse ? "pt-2.5" : "pt-5",
      )}
      onSubmit={onSubmit}
    >
      <ItemFormAddNote />
      <Controller
        control={control}
        name="comment"
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="w-full grid grid-cols-[minmax(0,1fr)_3.625rem] gap-2.5 items-end">
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
              <div className="flex flex-row items-center h-10 gap-2.5">
                <Controller
                  name="file"
                  control={control}
                  render={({ field: fieldFile }) => (
                    <>
                      <SendingPhotosComment
                        files={fieldFile.value.string}
                        dispatchDelete={(index) => {
                          const current = fieldFile.value
                          const newDeleteFile = dispatchDelete({ current, index })
                          fieldFile.onChange(newDeleteFile)
                        }}
                      />
                      <label className="flex relative h-6 w-6 overflow-hidden p-3">
                        <input
                          type="file"
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 max-w-6 h-6 opacity-0 cursor-pointer z-30 disabled:cursor-no-drop"
                          accept="image/*"
                          multiple
                          onChange={async (event) => {
                            const current = fieldFile.value
                            const dataValues = await handleImageChange(current, event)
                            fieldFile.onChange(dataValues)
                            event.target.value = ""
                          }}
                        />
                        <IconPaperClip />
                      </label>
                    </>
                  )}
                />
                <button
                  type="submit"
                  className="relative w-6 h-10 px-3 py-5 disabled:opacity-50"
                  disabled={!field.value.trim() && watch("file").file.length === 0}
                >
                  <svg
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
                      className="text-element-accent-1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      />
    </form>
  )
}

FooterNewComment.displayName = "FooterNewComment"
export default FooterNewComment
