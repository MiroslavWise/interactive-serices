import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import ControlHelp from "./components/ControlHelp"
import IconXClose from "@/components/icons/IconXClose"
import AddressController from "./components/AddressController"
import IconTrashBlack from "@/components/icons/IconTrashBlack"
import { Button, ImageStatic, NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { queryClient } from "@/context"
import { getNotes } from "@/services/notes"
import { getPostId, getPosts } from "@/services/posts"
import { handleImageChange, updatePatch } from "./utils"
import { dispatchBallonPost, dispatchUpdatePost, useAuth, useUpdatePost } from "@/store"
import { LIMIT_DESCRIPTION, LIMIT_TITLE_POST, resolverCreatePostUpdate, type TSchemaCreatePostUpdate } from "../../CreatePost/schema"

function UpdatePost() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const post = useUpdatePost(({ data }) => data)
  const noteMain = post?.notes.find((item) => item.main)!
  const images = noteMain?.images ?? []
  const address = post?.addresses[0] ?? null
  const [loading, setLoading] = useState(false)

  const defaultValues: TSchemaCreatePostUpdate = {
    title: post?.title ?? "",
    description: noteMain?.description ?? "",
    address: address?.additional ?? "",
    file: {
      file: [],
      string: [],
    },
    help: !!post?.urgent,
    deletesImages: [],
    addressFeature: null,
  }

  const { control, handleSubmit, setValue, watch } = useForm<TSchemaCreatePostUpdate>({
    defaultValues: defaultValues,
    resolver: resolverCreatePostUpdate,
  })

  const { refetch } = useQuery({
    queryFn: () => getPosts({ order: "DESC", user: userId! }),
    queryKey: ["posts", { userId: userId!, order: "DESC" }],
    enabled: false,
  })

  const { refetch: refetchNote } = useQuery({
    queryFn: () => getNotes({ order: "DESC", post: post!?.id! }),
    queryKey: ["notes", { order: "DESC", postId: post!?.id }],
    enabled: false,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      const response = await updatePatch({
        id: post?.id!,
        defaultValues: defaultValues!,
        newValues: values,
        idNote: noteMain?.id!,
        userId: userId!,
        images: images.map((item) => item.id),
      })
      if (response.some((item) => typeof item !== "undefined")) {
        refetch()
        refetchNote()
        const { data: dataPost } = await queryClient.fetchQuery({
          queryFn: () => getPostId(post?.id!),
          queryKey: ["post", { id: post?.id! }],
        })
        if (dataPost) {
          dispatchBallonPost(dataPost)
        }
      } else {
        dispatchBallonPost(post)
      }
      setLoading(false)
      dispatchUpdatePost()
    }
  })

  return (
    <div
      className={cx("fixed inset-0 w-full h-full md:p-10 bg-translucent", !!post ? "flex flex-col items-center z-[1000]" : "hidden -z-10")}
    >
      <section className="relative w-full md:max-w-[35rem] md:rounded-2 bg-BG-second h-full">
        <button
          type="button"
          className="absolute z-50 top-0 right-0 md:-right-1 md:translate-x-full w-12 h-12 md:bg-BG-second rounded-full p-3.5 *:w-5 *:h-5 flex items-center justify-center"
          onClick={() => dispatchUpdatePost()}
        >
          <IconXClose />
        </button>
        <header className="w-full border-b border-solid border-grey-separator h-standard-header-modal p-5 md:pt-6 max-md:pb-4 flex flex-row items-center justify-start md:justify-center">
          <h3 className="text-text-primary text-2xl font-semibold">Редактирование поста</h3>
        </header>
        <form
          onSubmit={onSubmit}
          className="w-full h-full-minus-standard-header-modal flex flex-col items-center gap-5 p-5 pb-24 md:*:max-w-[26.25rem] overflow-x-hidden overflow-y-auto"
        >
          <p className="text-text-primary text-sm font-normal mb-2.5">
            Пост — это ваша персональная новостная лента. Формат подходит для мероприятий, регулярных активностей, турниров. В пост можно
            добавлять новые записи: тексты и фото. Другие пользователи смогут комментировать ваш пост.
          </p>
          <AddressController control={control} setValue={setValue} />
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset className="w-full flex flex-col gap-2">
                <label htmlFor={field.name} className="text-text-primary text-sm font-medium">
                  Тема поста
                </label>
                <input
                  type="text"
                  {...field}
                  placeholder="Введите тему поста..."
                  className={cx(
                    "w-full p-3.5 rounded-3xl border border-solid text-text-primary placeholder:text-text-secondary disabled:text-text-disabled text-sm font-normal",
                    field.value.length >= LIMIT_TITLE_POST || !!error
                      ? "border-text-error"
                      : "border-grey-stroke focus:border-element-accent-1",
                  )}
                  maxLength={LIMIT_TITLE_POST}
                />
                {!!error && <i className="-mt-1 text-text-error text-xs font-normal">{error?.message ?? "Ошибка"}</i>}
              </fieldset>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset className="w-full flex flex-col gap-2">
                <label htmlFor={field.name} className="text-text-primary text-sm font-medium">
                  Первая запись
                </label>
                <div className="w-full relative flex">
                  <textarea
                    {...field}
                    className={cx(
                      "w-full h-[7.375rem] resize-none p-3.5 pb-6 rounded-2xl border border-solid text-text-primary placeholder:text-text-secondary disabled:text-text-disabled text-sm font-normal",
                      !!error || field.value.length >= LIMIT_DESCRIPTION
                        ? "border-text-error"
                        : "border-grey-stroke focus:border-element-accent-1",
                    )}
                    maxLength={LIMIT_DESCRIPTION + 2}
                  />
                  <span
                    className={cx(
                      "absolute bottom-1 left-3.5 right-3.5 flex flex-row items-center justify-between text-xs font-normal",
                      field.value.length >= LIMIT_DESCRIPTION || !!error ? "text-text-error" : "text-text-primary",
                    )}
                  >
                    <span>{!!error ? error.message : null}</span>
                    <span>
                      {field.value.length}/{LIMIT_DESCRIPTION}
                    </span>
                  </span>
                </div>
              </fieldset>
            )}
          />
          <ControlHelp control={control} />
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <fieldset className="w-full flex flex-col gap-4">
                <label htmlFor={field.name} className="text-text-primary text-sm font-medium">
                  Фото
                </label>
                <p className="-mt-3 text-text-disabled text-sm font-normal">Добавьте к записи фото, постер или афишу</p>
                <div className="w-full grid justify-center gap-4 grid-cols-3 max-md:grid-cols-2">
                  {images.map((item) => (
                    <div
                      className={cx(
                        "w-full h-auto rounded-2xl bg-BG-second flex items-center justify-center relative overflow-hidden aspect-[152/196]",
                        watch("deletesImages").includes(item.id) ? "grayscale" : "grayscale-0",
                      )}
                      key={`:--${item.id}--image--:`}
                    >
                      <NextImageMotion
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto aspect-[152/196]"
                        src={item.attributes.url}
                        alt={item.attributes.alt}
                        width={200}
                        height={200}
                      />
                      <button
                        type="button"
                        className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full bg-BG-second *:w-4 *:h-4 p-2 flex items-center justify-center [&>svg>path]:fill-text-primary"
                        onClick={(event) => {
                          event.stopPropagation()
                          const ids = watch("deletesImages")
                          if (ids.includes(item.id)) {
                            setValue(
                              "deletesImages",
                              ids.filter((_) => _ !== item.id),
                            )
                          } else {
                            setValue("deletesImages", [...ids, item.id])
                          }
                        }}
                      >
                        <IconTrashBlack />
                      </button>
                    </div>
                  ))}
                  {field.value.string.map((item, index) => (
                    <div
                      className="w-full h-auto rounded-2xl bg-BG-second flex items-center justify-center relative overflow-hidden aspect-[152/196]"
                      key={`:${index}_image:`}
                    >
                      <ImageStatic
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto aspect-[152/196]"
                        src={item}
                        alt="offer-image"
                        width={200}
                        height={200}
                      />
                      <button
                        type="button"
                        className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full bg-BG-second *:w-4 *:h-4 p-2 flex items-center justify-center [&>svg>path]:fill-text-primary"
                        onClick={(event) => {
                          event.stopPropagation()
                          field.onChange({
                            file: field.value.file.filter((_, i) => i !== index),
                            string: field.value.string.filter((_, i) => i !== index),
                          })
                        }}
                      >
                        <IconTrashBlack />
                      </button>
                    </div>
                  ))}
                  <div
                    className={cx(
                      "w-full h-auto rounded-2xl bg-BG-second relative overflow-hidden aspect-[152/196] border border-dashed border-grey-stroke-light focus:border-element-accent-1",
                      field.value.string.length + images.length - watch("deletesImages").length >= 9
                        ? "hidden"
                        : "flex items-center justify-center",
                    )}
                    data-input-plus
                  >
                    <input
                      type="file"
                      
                      className="absolute top-1/2 left-1/2 opacity-0 z-20 -translate-x-1/2 -translate-y-1/2 w-full h-full cursor-pointer"
                      onChange={async (event) => {
                        const dataValues = await handleImageChange(field.value, event)
                        field.onChange(dataValues)
                        event.target.value = ""
                      }}
                      multiple
                    />
                  </div>
                </div>
                <p className="!text-text-disabled !-mt-3 text-xs font-normal">Максимальный размер фото - 10 МБ</p>
                <p className="!text-text-disabled !-mt-3 text-xs font-normal">Не более 9 изображений</p>
              </fieldset>
            )}
          />
          <footer className="fixed md:absolute bottom-0 left-0 right-0 w-full !max-w-full pt-2.5 px-5 pb-[1.875rem] bg-BG-second flex flex-row items-center justify-center md:rounded-b-2 md:*:max-w-[26.25rem] z-50">
            <Button type="submit" className="" typeButton="fill-primary" label="Сохранить" loading={loading} disabled={loading} />
          </footer>
        </form>
      </section>
    </div>
  )
}

UpdatePost.displayName = "UpdatePost"
export default UpdatePost
