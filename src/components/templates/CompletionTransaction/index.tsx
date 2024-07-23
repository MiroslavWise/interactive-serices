"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"
import type { IValuesForm } from "./types/types"

import { Button, ButtonLink } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
import { serviceNotifications, getTestimonials, getBarterId, postTestimonial } from "@/services"
import { useAuth, useAddTestimonials, useModal, EModalData, dispatchModalClose, dispatchAddTestimonials } from "@/store"
import { useCountMessagesNotReading } from "@/helpers"

export default function CompletionTransaction() {
  const [isFirst, setIsFirst] = useState(true)
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { register, handleSubmit, watch, setValue, setFocus } = useForm<IValuesForm>({
    defaultValues: {
      rating: 3,
    },
  })
  const { onBarters } = useToast()
  const dataModal = useModal(({ data }) => data)
  const user = useAddTestimonials(({ user }) => user) /// проверить
  const barterId = useAddTestimonials(({ barterId }) => barterId)
  const { refetchCountMessages } = useCountMessagesNotReading(false)
  const notificationId = useAddTestimonials(({ notificationId }) => notificationId)

  const { data: dataBarter, refetch: refetchBarters } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId }],
    enabled: !!barterId,
  })

  const { refetch: refetchNotifications } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: false,
  })

  const { refetch: refetchTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: user?.id!, order: "DESC" }),
    queryKey: ["testimonials", { receiver: user?.id!, order: "DESC" }],
    enabled: false,
  })

  useEffect(() => {
    if (dataModal === EModalData.CompletionTransaction) {
      setFocus("message")
    }
  }, [dataModal])

  function submit(values: IValuesForm) {
    if (!loading) {
      setLoading(true)

      const idOffer = dataBarter?.data?.initiator?.userId === userId ? dataBarter?.data?.consignedId : dataBarter?.data?.initialId

      Promise.all([
        postTestimonial({
          targetId: idOffer!,
          provider: EnumTypeProvider.offer,
          barterId: barterId!,
          rating: values.rating!,
          message: values.message,
          status: "published",
          enabled: true,
          receiverId: user?.id!,
        }),
        !!notificationId
          ? serviceNotifications.patch(
              {
                operation:
                  dataBarter?.data?.status === "completed"
                    ? "feedback-received"
                    : dataBarter?.data?.status?.includes("destroyed")
                    ? "feedback-received-no"
                    : "feedback-received",
                enabled: true,
                read: true,
              },
              notificationId,
            )
          : Promise.resolve({ ok: true }),
      ]).then(async (responses) => {
        if (responses?.some((item) => item!?.ok)) {
          refetchBarters()
          refetchTestimonials()
          refetchNotifications()
          refetchCountMessages()
          onBarters({
            title: "Спасибо за обратную связь",
            message: "Ваша обратная связь поможет улучшить качество услуг и работу сервиса для вас и других пользователей.",
            status: EnumStatusBarter.INITIATED,
          })
          setIsFirst(false)
          setLoading(false)
        }
      })
    }
  }

  const onSubmit = handleSubmit(submit)

  useEffect(() => {
    return () =>
      dispatchAddTestimonials({
        barterId: undefined,
        user: undefined,
        testimonials: undefined,
        notificationId: undefined,
      })
  }, [])

  return (
    <>
      <h5>Обзор</h5>
      <div data-dots>
        <img src="/svg/dots-vertical-gray.svg" alt="..." width={16} height={16} />
      </div>
      {isFirst ? (
        <form onSubmit={onSubmit}>
          <header>
            <h3>
              Добавьте отзыв <span>@{user?.profile?.username}</span>
            </h3>
            <div data-rating>
              <p>Оцените качество услуг:</p>
              <div data-groups>
                <div data-rating {...register("rating", { required: false })}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <button
                      type="button"
                      data-img
                      key={`::star::${item}::`}
                      onClick={(event) => {
                        event.stopPropagation()
                        setValue("rating", item)
                      }}
                    >
                      <img
                        data-number={watch("rating")}
                        data-active={item <= watch("rating")}
                        src="/svg/star-01.svg"
                        alt="star"
                        height={20}
                        width={20}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>
          <fieldset>
            <div data-text data-limit={watch("message")?.length > 200}>
              <textarea
                {...register("message", {
                  required: true,
                })}
                onKeyDown={(event) => {
                  if (event.keyCode === 13 || event.code === "Enter") {
                    onSubmit()
                  }
                }}
                placeholder="Напишите здесь свой отзыв..."
                maxLength={1024}
              />
              <span>
                <span>{watch("message")?.length || 0}</span>/240
              </span>
            </div>
          </fieldset>
          <Button type="submit" typeButton="fill-primary" label="Отправить" loading={loading} />
        </form>
      ) : (
        <article>
          <div data-img>
            <img src="/svg/fi_1271380.svg" alt="fi" width={100} height={100} />
          </div>
          <div data-text>
            <h2>Спасибо, что делитесь мнением с Шейрой!</h2>
            <p>Ваш отзыв будет опубликован после проверки.</p>
          </div>
          <ButtonLink
            typeButton="fill-primary"
            label="Вернуться в профиль"
            href={{ pathname: `/customer/${user?.id!}` }}
            onClick={(event) => {
              event.stopPropagation()
              dispatchModalClose()
            }}
          />
        </article>
      )}
    </>
  )
}
