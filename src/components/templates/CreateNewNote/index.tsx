import { useState } from "react"
import { type AxiosProgressEvent } from "axios"
import { Controller, useForm } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"
import { type IBodyNote } from "@/services/notes/types"

import Button from "@/components/common/Button"
import IconPost from "@/components/icons/IconPost"
import IconFile_06 from "@/components/icons/IconFile_06"
import { IconSprite } from "@/components/icons/icon-sprite"
import CurrentImage from "../CreateNewOptionModal/components/CurrentImage"

import { cx } from "@/lib/cx"
import { queryClient } from "@/context"
import { onChangeFile } from "@/helpers"
import { getPostId } from "@/services/posts"
import { fileUploadService } from "@/services"
import { patchNote, postNote } from "@/services/notes"
import { MAX_LENGTH_DESCRIPTION_NOTE } from "@/config/constants"
import { dispatchBallonPost, dispatchCloseCreateNote, useAuth, useCreateNewNote } from "@/store"
import { DEFAULT_VALUES, onProgress, onUploadProgress, resolverCreateNote, type TSchemaCreateNote } from "./utils"

function CreateNewNote() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { id, title } = useCreateNewNote(({ data }) => data) ?? {}
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<Record<string, AxiosProgressEvent>>({})

  const { handleSubmit, control, watch } = useForm<TSchemaCreateNote>({
    resolver: resolverCreateNote,
    defaultValues: DEFAULT_VALUES,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!loading && !!id) {
      setLoading(true)
      const description = values.description!?.trim()
      const files = values.file.file
      const data: IBodyNote = {
        postId: id!,
        main: false,
        isAuthRead: values.is,
      }
      if (description) {
        data.description = description
      }
      const responseCreate = await postNote(data)
      if (!!responseCreate.data) {
        const idNote = responseCreate!.data!.id!
        if (files.length > 0) {
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

  const disabled = !watch("file").file.length && !watch("description")

  return (
    <>
      <header className="w-full px-3 pt-5 md:pt-6 pb-4 md:pb-5 overflow-hidden flex flex-row items-center justify-start md:justify-center border-b border-solid border-grey-separator h-standard-header-modal">
        <h3 className="text-text-primary text-2xl font-semibold">Новая запись</h3>
      </header>
      <ul data-test="ul-create-new-note" className="w-full flex flex-col items-center gap-4 px-5 h-full-minus-standard-header-modal">
        <form className="w-full h-full overflow-y-auto flex flex-col items-center gap-4 md:gap-5 overflow-x-hidden" onSubmit={onSubmit}>
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
                    maxLength={MAX_LENGTH_DESCRIPTION_NOTE}
                    className={cx(
                      "whitespace-pre-wrap w-full outline-none h-full border border-solid resize-none focus:!border-text-accent px-3.5 pt-3.5 pb-6 text-text-primary placeholder:text-text-disabled text-sm font-normal rounded-2xl",
                      !!error ? "!border-text-error" : "!border-grey-stroke",
                    )}
                  />
                  <span
                    data-error={field!.value!?.length + 20 >= MAX_LENGTH_DESCRIPTION_NOTE}
                    className={cx(
                      "absolute bottom-1 right-3.5 text-right text-xs font-normal",
                      !!error ? "text-text-error" : "text-text-primary",
                    )}
                  >
                    {field.value?.length || 0}/{MAX_LENGTH_DESCRIPTION_NOTE}
                  </span>
                </div>
                {!!error && error?.type === "required" ? <i>Обязательное поле</i> : !!error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          <Controller
            control={control}
            name="file"
            render={({ field }) => {
              const _strings = {
                images: [] as {
                  img: string
                  index: number
                }[],
                other: [] as {
                  str: File
                  index: number
                }[],
              }

              for (let i = 0; i < field.value.file.length; i++) {
                if (field.value.file[i].type.includes("image")) {
                  _strings.images.push({
                    img: field.value.string[i],
                    index: i,
                  })
                } else {
                  _strings.other.push({
                    str: field.value.file[i],
                    index: i,
                  })
                }
              }

              return (
                <fieldset className="!gap-4">
                  <label htmlFor={field.name}>Фото или видео</label>
                  <p className="-mt-3 text-text-disabled text-sm font-normal">Добавьте к посту фото, видео или постер</p>
                  <div className={cx("w-full flex flex-col gap-2", _strings.other.length > 0 ? "flex" : "hidden")}>
                    {_strings.other.map((item) => (
                      <article
                        key={`:k:e:rT:${item.index}:`}
                        className="w-fit grid grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] gap-1 items-center bg-btn-second-default p-1.5 pr-2 rounded-[1.125rem]"
                      >
                        <div className="w-6 h-6 p-3 relative *:w-4 *:h-4">
                          <IconFile_06 />
                        </div>
                        <span className="text-sm font-medium text-text-primary line-clamp-1 text-ellipsis">{item.str.name ?? null}</span>
                        <button
                          type="button"
                          className="w-6 h-6 p-3 relative *:w-4 *:h-4"
                          onClick={(event) => {
                            event.stopPropagation()
                            const newFiles = {
                              file: field.value.file.filter((_, i) => item.index !== i),
                              string: field.value.string.filter((_, i) => item.index !== i),
                            }
                            field.onChange(newFiles)
                          }}
                        >
                          <IconSprite id="trash-20-20" />
                        </button>
                      </article>
                    ))}
                  </div>
                  <div className="w-full grid justify-center gap-4 grid-cols-3 max-md:grid-cols-2 [&>img]:!border-none">
                    {_strings.images.map((item) => (
                      <CurrentImage
                        key={`${item.index}-image`}
                        item={item.img}
                        index={item.index}
                        field={field}
                        progress={!loading ? null : onProgress({ files: field.value.file, index: item.index, progress })}
                      />
                    ))}
                    {field.value.string.length < 9 ? (
                      <div
                        data-image
                        data-input-plus
                        className="border border-dashed border-grey-stroke-light focus:border-element-accent-1"
                      >
                        <input
                          type="file"
                          onChange={async (event) => {
                            const dataValues = await onChangeFile({ current: field.value, event })
                            field.onChange(dataValues)
                            event.target.value = ""
                          }}
                          multiple
                        />
                      </div>
                    ) : null}
                  </div>
                  <i className="!text-text-disabled !-mt-3">Максимальный размер фото - 10 Мб, видео - 50 Мб</i>
                  <i className="!text-text-disabled !-mt-3">Не более 9 файлов</i>
                </fieldset>
              )
            }}
          />
          <Controller
            name="is"
            control={control}
            render={({ field }) => (
              <div
                className="w-full grid items-center gap-2.5"
                style={{
                  gridTemplateColumns: `2.625rem minmax(0, 1fr)`,
                }}
              >
                <div
                  className={cx(
                    "h-6 w-[2.625rem] rounded-xl cursor-pointer p-0.5 flex flex-row items-center transition-all",
                    field.value ? "bg-text-accent justify-end" : "bg-grey-stroke justify-start",
                  )}
                  onClick={() => {
                    field.onChange(!field.value)
                  }}
                >
                  <span className="rounded-full h-5 w-5 bg-text-button" />
                </div>
                <p className="text-text-primary text-sm font-normal">Показывать запись только участникам мероприятия</p>
              </div>
            )}
          />
          <footer className="w-full pt-2.5 mt-auto bg-BG-second">
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Сохранить"
              className="w-full h-11 py-2.5"
              loading={loading}
              disabled={loading || disabled}
            />
          </footer>
        </form>
      </ul>
    </>
  )
}

CreateNewNote.displayName = "CreateNewNote"
export default CreateNewNote
