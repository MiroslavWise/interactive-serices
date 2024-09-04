import { useState } from "react"
import { type AxiosProgressEvent } from "axios"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"
import { type IBodyNote } from "@/services/notes/types"

import { Button } from "@/components/common"
import IconPost from "@/components/icons/IconPost"
import CurrentImage from "../CreateNewOptionModal/components/CurrentImage"

import { cx } from "@/lib/cx"
import { fileUploadService } from "@/services"
import { getNotes, patchNote, postNote } from "@/services/notes"
import { dispatchBallonPost, dispatchCloseCreateNote, useAuth, useCreateNewNote } from "@/store"
import {
  DEFAULT_VALUES,
  handleImageChange,
  LIMIT_DESCRIPTION,
  onProgress,
  onUploadProgress,
  resolverCreateNote,
  type TSchemaCreateNote,
} from "./utils"
import { queryClient } from "@/context"
import { getPostId } from "@/services/posts"

function CreateNewNote() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { id, title } = useCreateNewNote(({ data }) => data) ?? {}
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<Record<string, AxiosProgressEvent>>({})

  const { handleSubmit, control } = useForm<TSchemaCreateNote>({
    resolver: resolverCreateNote,
    defaultValues: DEFAULT_VALUES,
  })

  const { refetch: refetchNotes } = useQuery({
    queryFn: () => getNotes({ order: "DESC", post: id }),
    queryKey: ["notes", { order: "DESC", postId: id }],
    enabled: false,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading && !!id) {
      setLoading(true)
      const description = values.description.trim()
      const files = values.file.file
      const data: IBodyNote = {
        postId: id!,
        main: false,
      }
      if (description) {
        data.description = description
      }
      const responseCreate = await postNote(data)
      if (!!responseCreate.data) {
        const idNote = responseCreate!.data!.id!
        if (files.length) {
          const responseImages = await Promise.all(
            files.map((item) =>
              fileUploadService(item!, {
                type: EnumTypeProvider.NOTE,
                userId: userId!,
                idSupplements: idNote,
                onUploadProgress: (value, name) => onUploadProgress(value, name, setProgress),
              }),
            ),
          )
          const ids = responseImages.filter((item) => !!item.data?.id).map((item) => item.data?.id!)
          if (ids.length) {
            const data: Partial<IBodyNote> = {
              images: ids,
            }
            await patchNote(idNote, data)
          }
          queryClient
            .fetchQuery({
              queryFn: () => getPostId(id),
              queryKey: ["post", { id: id! }],
            })
            .then((response) => {
              setLoading(false)
              if (response.data) {
                dispatchBallonPost(response.data)
              } else {
                dispatchCloseCreateNote()
              }
            })
        } else {
          queryClient
            .fetchQuery({
              queryFn: () => getPostId(id),
              queryKey: ["post", { id: id! }],
            })
            .then((response) => {
              setLoading(false)
              if (response.data) {
                dispatchBallonPost(response.data)
              } else {
                dispatchCloseCreateNote()
              }
            })
        }
      }
    }
  })

  return (
    <>
      <header className="w-full px-3 pt-5 md:pt-6 pb-4 md:pb-5 overflow-hidden flex flex-row items-center justify-start md:justify-center border-b border-solid border-grey-separator h-[var(--height-standard-header-modal)]">
        <h3 className="text-text-primary text-2xl font-semibold">Новая запись</h3>
      </header>
      <ul
        data-test="ul-create-new-note"
        className="w-full flex flex-col items-center gap-4 px-5 h-[calc(100%_-_var(--height-standard-header-modal))]"
      >
        <form className="w-full h-full overflow-y-auto flex flex-col items-center gap-4 md:gap-5" onSubmit={onSubmit}>
          <div className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 pb-1">
            <div className="w-5 h-5 p-2.5 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
              <IconPost />
            </div>
            <h3 className="text-text-primary text-sm font-medium text-ellipsis line-clamp-2">{title || "Пост"}</h3>
          </div>
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <fieldset>
                <label htmlFor={field.name}>Запись</label>
                <div className="w-full relative h-[7.375rem]">
                  <textarea
                    {...field}
                    placeholder="Расскажите новые факты о вашем мероприятии, приложите фотоотчет или задайте вопрос публике"
                    data-error={!!error}
                    maxLength={LIMIT_DESCRIPTION + 2}
                    className={cx(
                      "whitespace-pre-wrap w-full outline-none h-full border border-solid resize-none focus:!border-text-accent px-3.5 pt-3.5 pb-6 text-text-primary placeholder:text-text-disabled text-sm font-normal rounded-2xl",
                      !!error ? "!border-text-error" : "!border-grey-stroke",
                    )}
                  />
                  <span
                    data-error={field.value?.length + 20 >= LIMIT_DESCRIPTION}
                    className={cx(
                      "absolute bottom-1 right-3.5 text-right text-xs font-normal",
                      !!error ? "text-text-error" : "text-text-primary",
                    )}
                  >
                    {field.value?.length || 0}/{LIMIT_DESCRIPTION}
                  </span>
                </div>
                {!!error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          <Controller
            control={control}
            name="file"
            render={({ field }) => (
              <fieldset className="!gap-4">
                <label htmlFor={field.name}>Фото</label>
                <p className="-mt-3 text-text-disabled text-sm font-normal">Добавьте к записи фото, постер или афишу</p>
                <div className="w-full grid justify-center gap-4 grid-cols-3 max-md:grid-cols-2">
                  {field.value.string.map((item, index) => (
                    <CurrentImage
                      key={`${index}-image`}
                      item={item}
                      index={index}
                      field={field}
                      progress={!loading ? null : onProgress({ files: field.value.file, index, progress })}
                    />
                  ))}
                  {field.value.string.length < 9 ? (
                    <div data-image="new">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (event) => {
                          const dataValues = await handleImageChange(field.value, event)
                          field.onChange(dataValues)
                          event.target.value = ""
                        }}
                        multiple
                      />
                    </div>
                  ) : null}
                </div>
                <i className="!text-text-disabled !-mt-3">Максимальный размер фото - 10 МБ</i>
                <i className="!text-text-disabled !-mt-3">Не более 9 изображений</i>
              </fieldset>
            )}
          />
          <footer className="w-full pt-2.5 mt-auto bg-BG-second">
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Сохранить"
              className="w-full h-11 py-2.5"
              loading={loading}
              disabled={loading}
            />
          </footer>
        </form>
      </ul>
    </>
  )
}

CreateNewNote.displayName = "CreateNewNote"
export default CreateNewNote
