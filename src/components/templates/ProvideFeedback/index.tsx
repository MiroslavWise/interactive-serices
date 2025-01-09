import { Controller, useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState, type HTMLAttributes } from "react"

import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"
import { type IBodyPostTestimonials } from "@/services/testimonials/types"

import Avatar from "@avatar"
import IconPlus from "@/components/icons/IconPlus"
import IconStar from "@/components/icons/IconStar"
import IconRepeat from "@/components/icons/IconRepeat"
import IconTrashBlack from "@/components/icons/IconTrashBlack"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import { ImageCategory, ImageStatic } from "@/components/common"
import Button from "@/components/common/Button"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchClearAddTestimonials, dispatchModal, EModalData, useAddTestimonials, useAuth } from "@/store"
import { handleImageChange, MAX_LENGTH, resolver, TFiles, type TSchema } from "./utils"
import { fileUploadService, getBarterId, patchTestimonial, postTestimonial, serviceNotifications } from "@/services"

import styles from "./style.module.scss"

export const CN_ProvideFeedback: HTMLAttributes<HTMLElement>["className"] = "h-auto max-h-full flex flex-col max-md:!rounded-none"

function ProvideFeedback() {
  const { onBarters } = useToast()
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const refImages = useRef<HTMLDivElement>(null)

  const offer = useAddTestimonials(({ offer }) => offer)
  const post = useAddTestimonials(({ post }) => post)
  const provider = useAddTestimonials(({ provider }) => provider)

  const name = provider === EnumTypeProvider.POST ? post?.title ?? "" : offer?.title ?? ""
  const userIdProvider = provider === EnumTypeProvider.POST ? post?.userId : offer?.userId
  const user = provider === EnumTypeProvider.POST ? post?.user : offer?.user

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<TSchema>({
    defaultValues: {
      message: "",
      rating: 0,
      file: {
        file: [],
        string: [],
      },
    },
    resolver: resolver,
  })

  clg("isValid: ", isValid, "error")

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)

      const id = provider === EnumTypeProvider.POST ? post?.id : offer?.id

      const response = await Promise.all([
        postTestimonial({
          targetId: id!,
          provider: provider!,
          rating: values.rating!,
          message: values.message,
          status: "published",
          enabled: true,
          receiverId: userIdProvider!,
        }),
      ])
      if (!!response[0].res) {
        const idTerm = response[0].res.id

        const files = values.file.file

        if (files.length > 0) {
          const responseImages = await Promise.all(
            files.map((item) =>
              fileUploadService(item!, {
                type: EnumTypeProvider.TESTIMONIAL,
                userId: userId!,
                idSupplements: idTerm,
              }),
            ),
          )

          const ids = responseImages.filter((_) => !!_.data?.id).map((_) => _.data?.id!)

          if (ids.length > 0) {
            await patchTestimonial({ images: ids }, idTerm)
          }
        }
      }
      onBarters({
        title: "Спасибо за обратную связь",
        message: "Ваша обратная связь поможет улучшить качество услуг и работу сервиса для вас и других пользователей.",
        status: EnumStatusBarter.INITIATED,
      })

      requestAnimationFrame(() => {
        setLoading(false)
        dispatchModal(EModalData.SUCCESS_PROVIDE_FEEDBACK)
      })
    }
  })

  useEffect(() => {
    function onUnLoad(event: any) {
      event.preventDefault()
      event.returnValue = ""

      return `Прерывание`
    }
    window.addEventListener("beforeunload", onUnLoad)

    return () => window.removeEventListener("beforeunload", onUnLoad)
  }, [])

  useEffect(() => {
    return dispatchClearAddTestimonials
  }, [])

  return (
    <>
      <header className="h-standard-header-modal w-full md:rounded-t-2 p-5 max-md:pb-4 md:pt-6 flex items-center md:justify-center border-b border-solid border-grey-separator">
        <h3 className="text-text-primary text-2xl font-semibold">
          Ваш отзыв о <span className="text-text-accent">&#8220;{name}&#8222;</span>
        </h3>
      </header>
      <form
        onSubmit={onSubmit}
        className={cx(styles.form, "h-full-minus-standard-header-modal overflow-y-auto flex flex-col gap-6 p-6 overflow-x-hidden")}
      >
        <div className={cx(styles.profile, "w-full grid gap-3 items-start")}>
          <Avatar image={user?.image} className="w-10 h-10 rounded-.625" />
          <div className="w-full flex flex-col gap-1">
            <div className="flex flex-row items-center gap-1">
              <p className="text-text-primary text-sm font-medium line-clamp-1 text-ellipsis">
                {user?.firstName ?? "Имя"} {user?.lastName || ""}
              </p>
              <div className="relative w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
                <IconVerifiedTick />
              </div>
            </div>
          </div>
        </div>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <fieldset className="w-full flex flex-col gap-2.5">
              <label htmlFor={field.name} className="text-text-primary text-sm font-semibold">
                Оцените по 5-бальной шкале
              </label>
              <div className="grid grid-cols-5 gap-1 items-center w-fit">
                {[1, 2, 3, 4, 5].map((item) => (
                  <article
                    key={`:key:item:star:${item}:`}
                    className={cx("cursor-pointer w-6 h-6 p-3", item <= field.value ? "grayscale-0" : "grayscale")}
                    onClick={(event) => field.onChange(item)}
                  >
                    <IconStar />
                  </article>
                ))}
              </div>
            </fieldset>
          )}
        />
        <Controller
          name="message"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <fieldset className="w-full flex flex-col gap-2.5">
              <label htmlFor={field.name} className="text-text-primary text-sm font-semibold">
                Напишите отзыв
              </label>
              <div className="w-full relative h-40">
                <textarea
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value.replace(/\s{2,}/g, " "))}
                  className={cx(
                    "w-full h-full whitespace-pre-wrap rounded-2xl resize-none p-3.5 pb-6 border border-solid  text-text-primary placeholder:text-text-disabled text-sm font-normal",
                    !!error || field.value.length >= MAX_LENGTH ? "border-text-error" : "border-grey-stroke focus:border-element-accent-1",
                  )}
                  placeholder="Поделитесь впечатлениями, как всё прошло? Это повлияет на рейтинг и поможет другим пользователям сделать выбор"
                />
                <span
                  className={cx(
                    "absolute bottom-1 inset-x-3.5 flex flex-row items-center justify-between text-xs font-normal",
                    !!error || field.value.length >= MAX_LENGTH ? "text-text-error" : "text-text-primary",
                  )}
                >
                  <span>{!!error ? error.message : null}</span>
                  <span>
                    {field.value.length}/{MAX_LENGTH}
                  </span>
                </span>
              </div>
            </fieldset>
          )}
        />
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <fieldset className="w-full flex flex-col gap-2.5">
              <label htmlFor={field.name} className="text-text-primary text-sm font-semibold">
                Добавьте фотографии
              </label>
              <div
                className={cx("flex -mx-6 overflow-hidden", styles.images)}
                onWheel={(event) => {
                  clg("onWheel: ", event)
                  event.stopPropagation()
                  if (refImages.current) {
                    clg("onWheel: refImages", refImages.current)
                    refImages.current.scrollBy({
                      left: event.deltaY,
                      behavior: "smooth",
                    })
                  }
                }}
              >
                <div className={cx("px-6 flex flex-row gap-4 flex-nowrap overflow-hidden overflow-x-scroll w-full")} ref={refImages}>
                  <label
                    className={cx(
                      "relative border border-dashed border-grey-stroke bg-BG-second rounded-2xl z-10 hover:border-element-accent-1 transition-all duration-200",
                      "[&>svg>path]:fill-element-accent-1 [&>svg]:w-6 [&>svg]:h-6",
                      field.value.file.length > 0 ? "h-[10.5rem] w-32 aspect-[16/21]" : "w-full h-[3.75rem] aspect-auto",
                    )}
                  >
                    <input
                      type="file"
                      className="w-full h-full absolute inset-0 opacity-0 z-20"
                      accept="image/*"
                      onChange={async (event) => {
                        const dataValues = await handleImageChange(field.value, event)
                        field.onChange(dataValues)
                        event.target.value = ""
                      }}
                      multiple
                    />
                    <IconPlus />
                  </label>
                  {field.value.string.map((item, index) => (
                    <div key={`:key:img:${index}:`} className="h-[10.5rem] w-32 aspect-[16/21] rounded-2xl overflow-hidden relative flex">
                      <ImageStatic src={item} alt={`${index}-img`} width={128} height={168} className="h-[10.5rem] w-32 aspect-[16/21]" />
                      <button
                        type="button"
                        className="absolute z-10 top-1.5 bg-BG-second right-1.5 w-8 h-8 rounded-full *:w-4 *:h-4 [&>svg>path]:fill-text-primary flex items-center justify-center p-2"
                        onClick={() => {
                          const newImages: TFiles = {
                            file: field.value.file.filter((_, i) => i !== index),
                            string: field.value.string.filter((_, i) => i !== index),
                          }

                          field.onChange(newImages)
                        }}
                      >
                        <IconTrashBlack />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-text-disabled text-xs font-normal">До 9 фотографий с максимальным размером 10 Мб</p>
            </fieldset>
          )}
        />
        <footer className="fixed md:absolute bottom-0 left-0 right-0 p-5 md:p-6 pt-2.5 z-40">
          <Button type="submit" typeButton="fill-primary" label="Отправить отзыв" disabled={loading || !isValid} loading={loading} />
        </footer>
      </form>
    </>
  )
}

ProvideFeedback.displayName = "ProvideFeedback"
export default ProvideFeedback
