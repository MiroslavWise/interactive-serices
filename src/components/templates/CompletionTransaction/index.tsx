"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { type IValuesForm } from "./types/types"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"

import Button, { ButtonLink } from "@/components/common/Button"

import { postTestimonial } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { useAddTestimonials, useModal, EModalData, dispatchModalClose, dispatchClearAddTestimonials } from "@/store"

export default function CompletionTransaction() {
  const [isFirst, setIsFirst] = useState(true)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, setValue, setFocus } = useForm<IValuesForm>({
    defaultValues: {
      rating: 3,
    },
  })
  const { onBarters } = useToast()
  const dataModal = useModal(({ data }) => data)
  const offer = useAddTestimonials(({ offer }) => offer)
  const post = useAddTestimonials(({ post }) => post)
  const provider = useAddTestimonials(({ provider }) => provider)

  const name = provider === EnumTypeProvider.POST ? post?.title ?? "" : offer?.title ?? ""
  const userIdProvider = provider === EnumTypeProvider.POST ? post?.userId : offer?.userId

  useEffect(() => {
    if (dataModal === EModalData.CompletionTransaction) {
      setFocus("message")
    }
  }, [dataModal])

  function submit(values: IValuesForm) {
    if (!loading) {
      setLoading(true)

      const id = provider === EnumTypeProvider.POST ? post?.id : offer?.id

      Promise.all([
        postTestimonial({
          targetId: id!,
          provider: provider!,
          rating: values.rating!,
          message: values.message,
          status: "published",
          enabled: true,
          receiverId: userIdProvider!,
        }),
      ]).then(async (responses) => {
        if (responses?.some((item) => item!?.ok)) {
          onBarters({
            title: "Спасибо за обратную связь",
            message: "Ваша обратная связь поможет улучшить качество услуг и работу сервиса для вас и других пользователей.",
            status: EnumStatusBarter.INITIATED,
          })
          setTimeout(() => {
            setIsFirst(false)
            setLoading(false)
          })
        }
      })
    }
  }

  const onSubmit = handleSubmit(submit)

  useEffect(() => {
    return dispatchClearAddTestimonials
  }, [])

  return (
    <>
      <h5 className="absolute top-6 left-1/2 -translate-x-1/2 text-text-secondary text-base">Обзор</h5>
      <div className="absolute top-3 right-3 w-8 h-8 border-none bg-transparent cursor-pointer flex items-center justify-center p-1 max-md:!hidden">
        <img src="/svg/dots-vertical-gray.svg" alt="..." width={16} height={16} className="w-6 h-6" />
      </div>
      {isFirst ? (
        <form
          onSubmit={onSubmit}
          className="w-full h-full pb-9 px-5 md:px-14 pt-[8.75rem] flex flex-col items-center justify-start overflow-hidden gap-10"
        >
          <header className="flex items-center flex-col gap-4">
            <h3 className="text-text-primary font-semibold text-xl text-center">
              Добавьте отзыв <span className="text-text-accent">&#8220;{name}&#8222;</span>
            </h3>
            <div data-rating className="w-full flex flex-col items-center">
              <p className="text-text-secondary text-center text-base font-medium">Оцените качество услуг:</p>
              <div data-groups className="w-full flex flex-col gap-1">
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
        <article className="w-full h-full flex flex-col justify-start md:justify-center gap-6 max-md:px-5 p-5 items-center">
          <div data-img className="w-[6.25rem] md:w-[8.125rem] h-[6.25rem] md:h-[8.125rem] flex items-center justify-center">
            <img
              src="/svg/fi_1271380.svg"
              alt="fi"
              width={100}
              height={100}
              className="w-[6.25rem] md:w-[8.125rem] h-[6.25rem] md:h-[8.125rem]"
            />
          </div>
          <div data-text>
            <h2>Спасибо, что делитесь мнением с Шейрой!</h2>
            <p>Ваш отзыв будет опубликован после проверки.</p>
          </div>
          <ButtonLink
            typeButton="fill-primary"
            label="Вернуться в профиль"
            href={{ pathname: userIdProvider ? `/customer/${userIdProvider!}` : "/" }}
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
