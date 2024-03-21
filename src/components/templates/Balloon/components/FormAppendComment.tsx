import { useForm } from "react-hook-form"
import { Dispatch, memo, SetStateAction, useState } from "react"

import { ICommentsResponse, IPostDataComment } from "@/services/comments/types"

import { useAuth } from "@/store"
import { serviceComments } from "@/services"

import styles from "../styles/form-append-comment.module.scss"

export const FormAppendComment = memo(({ idOffersThread, refetchComments, setCurrentComments }: IProps) => {
  const [loading, setLoading] = useState(false)
  const userId = useAuth(({ userId }) => userId)

  const { register, watch, setValue, handleSubmit } = useForm<IValues>({})

  function submit(values: IValues) {
    if (!loading) {
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
          },
        ])

        serviceComments.post(data).then((response) => {
          setValue("text", "")
          requestAnimationFrame(() => {
            refetchComments().then(() => {
              setLoading(false)
            })
          })
        })
      } else {
        setLoading(false)
      }
    }
  }

  const onSubmit = handleSubmit(submit)

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <input
        {...register("text", { required: true, minLength: 3, maxLength: 240 })}
        type="text"
        placeholder="Ваш комментарий..."
        autoComplete="off"
        maxLength={240}
        onKeyDown={(event) => {
          if (event.keyCode === 13 || event.code === "Enter") {
            onSubmit()
          }
        }}
      />
      <button type="submit" disabled={!watch("text")?.trim() || loading}>
        <img src="/svg/sent.svg" alt="sent" width={20} height={20} />
      </button>
    </form>
  )
})

interface IProps {
  idOffersThread: number
  refetchComments: () => Promise<any>
  setCurrentComments: Dispatch<SetStateAction<ICommentsResponse[]>>
}

interface IValues {
  text: string
}
