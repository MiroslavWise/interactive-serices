import { Controller, useForm } from "react-hook-form"
import { type Dispatch, memo, type SetStateAction, useEffect, useRef, useState } from "react"

import { EnumSign } from "@/types/enum"
import { type IUserOffer } from "@/services/offers/types"
import { type ICommentsResponse, type IPostDataComment } from "@/services/comments/types"

import { postComment } from "@/services"
import { dispatchAuthModal, useAuth } from "@/store"

interface IProps {
  idOffersThread: number

  setCurrentComments: Dispatch<SetStateAction<ICommentsResponse[]>>
}

export const FormAppendComment = memo(({ idOffersThread, setCurrentComments }: IProps) => {
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const user = useAuth(({ user }) => user)
  const { profile } = user ?? {}
  const textRef = useRef<HTMLTextAreaElement>(null)

  const { watch, handleSubmit, reset, control } = useForm<IValues>({
    defaultValues: {
      text: "",
    },
  })

  useEffect(() => {
    if (textRef.current) {
      if (!watch("text").trim()) {
        textRef.current.style.borderRadius = `1.25rem`
        textRef.current.style.height = "2.5rem"
      } else {
        if (textRef.current.scrollHeight > 40) {
          textRef.current.style.height = "auto"
          textRef.current.style.height = textRef.current.scrollHeight + "px"
          textRef.current.style.borderRadius = `1rem`
        } else {
          textRef.current.style.borderRadius = `1.25rem`
          textRef.current.style.height = "2.5rem"
        }
      }
    }
  }, [watch("text")])

  const userData: IUserOffer = {
    about: profile?.about ?? "",
    birthdate: profile?.birthdate ?? "",
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    gender: profile?.gender!,
    id: user?.id!,
    username: profile?.username ?? "",
    image: profile?.image,
  }

  const onSubmit = handleSubmit((values) => {
    if (!loading && !!userId) {
      setLoading(true)
      if (!!values?.text?.trim()) {
        const data: IPostDataComment = {
          offerThreadId: idOffersThread,
          message: values?.text?.trim(),
          status: "published",
          enabled: true,
        }
        setCurrentComments((prev) => [
          ...prev,
          {
            ...data,
            id: Math.random(),
            parentId: null,
            userId: userId!,
            status: "create",
            created: new Date(),
            user: userData!,
          },
        ])
        reset()
        postComment(data).then(() => {
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    }
  })

  if (!userId)
    return (
      <footer className="w-full p-5 pb-0 bg-BG-second overflow-hidden border-t border-solid border-grey-stroke-light">
        <p className="w-full text-center text-sm font-medium">
          <span
            className="text-text-accent cursor-pointer"
            onClick={() => {
              dispatchAuthModal({
                visible: true,
                type: EnumSign.SignUp,
              })
            }}
          >
            Войдите в аккаунт
          </span>
          , чтобы оставить комментарий
        </p>
      </footer>
    )

  return (
    <form
      onSubmit={onSubmit}
      className="w-full p-5 pb-0 overflow-hidden bg-BG-second border-t border-solid border-grey-stroke-light grid grid-cols-[minmax(0,1fr)_1.5rem] items-end gap-2.5"
    >
      <Controller
        name="text"
        control={control}
        rules={{
          required: true,
          minLength: 1,
          maxLength: 2192,
        }}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              className="resize-none py-2.5 px-4 border border-solid border-grey-stroke rounded-[1.25rem] outline-none focus:border-element-accent-1 hover:border-element-accent-1 min-h-10 h-10 max-h-40 md:max-h-[13.75rem] text-text-primary text-sm font-normal placeholder:text-text-disabled"
              ref={textRef}
              placeholder="Ваш комментарий..."
            />
            <button type="submit" className="disabled:opacity-50 relative w-6 h-10 px-3 py-5" disabled={!field.value.trim()}>
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
          </>
        )}
      />
    </form>
  )
})

interface IValues {
  text: string
}
