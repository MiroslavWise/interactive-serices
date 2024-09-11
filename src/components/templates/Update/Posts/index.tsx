import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import IconXClose from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { updatePatch } from "./utils"
import { getPosts } from "@/services/posts"
import { Button } from "@/components/common"
import { dispatchUpdatePost, useAuth, useUpdatePost } from "@/store"
import { LIMIT_DESCRIPTION, LIMIT_TITLE_POST, resolverCreatePostUpdate, type TSchemaCreatePostUpdate } from "../../CreatePost/schema"

function UpdatePost() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const post = useUpdatePost(({ data }) => data)
  const noteMain = post?.notes.find((item) => item.main)!
  const address = post?.addresses[0] ?? null
  const [loading, setLoading] = useState(false)

  const defaultValues: Omit<TSchemaCreatePostUpdate, "addressFeature"> = {
    title: post?.title ?? "",
    description: noteMain?.description ?? "",
    address: address?.additional ?? "",
    file: {
      file: [],
      string: [],
    },
    help: !!post?.urgent,
  }

  const { control, handleSubmit } = useForm<TSchemaCreatePostUpdate>({
    defaultValues: defaultValues,
    resolver: resolverCreatePostUpdate,
  })

  const { refetch } = useQuery({
    queryFn: () => getPosts({ order: "DESC", user: userId! }),
    queryKey: ["posts", { userId: userId!, order: "DESC" }],
    enabled: false,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      const response = await updatePatch({ id: post?.id!, defaultValues: defaultValues!, newValues: values, idNote: noteMain?.id! })
      if (response.some((item) => typeof item !== "undefined")) {
        refetch()
      }
      setLoading(false)
      dispatchUpdatePost()
    }
  })

  return (
    <div
      className={cx("fixed inset-0 w-full h-full md:p-10 bg-translucent", !!post ? "flex flex-col items-center z-[1000]" : "hidden -z-10")}
    >
      <section className="relative w-full md:max-w-[35rem] md:rounded-[2rem] bg-BG-second h-full">
        <button
          type="button"
          className="absolute top-0 right-0 md:-right-1 md:translate-x-full w-12 h-12 md:bg-BG-second rounded-full p-3.5 *:w-5 *:h-5 flex items-center justify-center"
          onClick={() => dispatchUpdatePost()}
        >
          <IconXClose />
        </button>
        <header className="w-full border-b border-solid border-grey-separator h-[var(--height-standard-header-modal)] p-5 md:pt-6 max-md:pb-4 flex flex-row items-center justify-start md:justify-center">
          <h3 className="text-text-primary text-2xl font-semibold">Редактирование поста</h3>
        </header>
        <form
          onSubmit={onSubmit}
          className="w-full h-full flex flex-col items-center gap-5 p-5 pb-24 md:*:max-w-[26.25rem] overflow-x-hidden overflow-y-auto"
        >
          <p className="text-text-primary text-sm font-normal mb-2.5">
            Пост — это ваша персональная новостная лента. Формат подходит для мероприятий, регулярных активностей, турниров. В пост можно
            добавлять новые записи: тексты и фото. Другие пользователи смогут комментировать ваш пост.
          </p>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset className="w-full flex flex-col gap-2">
                <label htmlFor={field.name} className="text-text-primary text-sm font-medium">
                  Адрес
                </label>
                <input
                  type="text"
                  {...field}
                  placeholder="Введите адрес..."
                  disabled
                  className={cx(
                    "w-full p-3.5 rounded-3xl border border-solid  text-text-primary placeholder:text-text-secondary disabled:text-text-disabled text-sm font-normal",
                    !!error ? "border-text-error" : "border-grey-stroke focus:border-element-accent-1",
                  )}
                />
                {!!error && <i className="-mt-1 text-text-error text-xs font-normal">{error?.message ?? "Ошибка"}</i>}
              </fieldset>
            )}
          />
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
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <fieldset className="w-full flex flex-col gap-4">
                <label htmlFor={field.name} className="text-text-primary text-sm font-medium">
                  Фото
                </label>
                <p className="-mt-3 text-text-disabled text-sm font-normal">Добавьте к записи фото, постер или афишу</p>
                <div className="w-full grid justify-center gap-4 grid-cols-3 max-md:grid-cols-2"></div>
                <p className="!text-text-disabled !-mt-3 text-xs font-normal">Максимальный размер фото - 10 МБ</p>
                <p className="!text-text-disabled !-mt-3 text-xs font-normal">Не более 9 изображений</p>
              </fieldset>
            )}
          />
          <footer className="fixed md:absolute bottom-0 left-0 right-0 w-full !max-w-full pt-2.5 px-5 pb-[1.875rem] bg-BG-second flex flex-row items-center justify-center md:rounded-b-[2rem] md:*:max-w-[26.25rem]">
            <Button type="submit" className="" typeButton="fill-primary" label="Сохранить" loading={loading} disabled={loading} />
          </footer>
        </form>
      </section>
    </div>
  )
}

UpdatePost.displayName = "UpdatePost"
export default UpdatePost
