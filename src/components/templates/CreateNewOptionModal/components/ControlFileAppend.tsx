import { type AxiosProgressEvent } from "axios"
import { type Control, Controller } from "react-hook-form"

import { IImageData } from "@/types/type"
import { type TSchemaCreate } from "../utils/create.schema"

import CurrentImage from "./CurrentImage"
import { NextImageMotion } from "@/components/common"
import IconFile_06 from "@/components/icons/IconFile_06"
import IconTrashBlack from "@/components/icons/IconTrashBlack"

import { cx } from "@/lib/cx"
import { onChangeFile } from "@/helpers"
import IconRepeat from "@/components/icons/IconRepeat"

const onProgress = (files: File[], index: number, progress: Record<string, AxiosProgressEvent>): number => {
  const file = files[index]
  const name = file?.name

  if (Object.hasOwn(progress, name)) {
    return (progress[name].loaded / (progress[name].total! || 1)) * 100
  }

  return 0
}

interface IProps {
  control: Control<TSchemaCreate, any>
  loading: boolean
  progress: Record<string, AxiosProgressEvent>
  images: IImageData[]
}

function ControlFileAppend({ control, loading, progress, images }: IProps) {
  const onlyImages = images.filter((_) => _.attributes.mime.includes("image"))

  return (
    <Controller
      name="file"
      control={control}
      render={({ field }) => {
        const _strings = {
          images: [] as {
            img: string
            index: number
          }[],
          other: [] as {
            name: string
            str: string
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
              name: field.value.file[i].name,
              str: field.value.string[i],
              index: i,
            })
          }
        }

        return (
          <fieldset data-photos id="fieldset-create-option-modal-photos" data-test="fieldset-create-new-option-images">
            <label htmlFor={field.name}>Фото или видео</label>
            <div className={_strings.other.length > 0 ? "w-full flex flex-col gap-2" : "hidden"}>
              {_strings.other.map((item) => (
                <article
                  key={`:k:e:rT:${item.index}:`}
                  className="w-fit grid grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] gap-1 items-center bg-btn-second-default p-1.5 pr-2 rounded-[1.125rem]"
                >
                  <div className="w-6 h-6 p-3 relative *:w-4 *:h-4">
                    <IconFile_06 />
                  </div>
                  <span className="text-sm font-medium text-text-primary line-clamp-1 text-ellipsis">{item.name}</span>
                  <button
                    type="button"
                    className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
                    onClick={(event) => {
                      event.stopPropagation()
                      const newFiles = {
                        file: field.value.file.filter((_, i) => item.index !== i),
                        string: field.value.string.filter((_, i) => item.index !== i),
                      }
                      field.onChange(newFiles)
                    }}
                  >
                    <IconTrashBlack />
                  </button>
                </article>
              ))}
            </div>
            <Controller
              name="deletes"
              control={control}
              render={({ field: { value: values, onChange } }) => (
                <div className={cx(onlyImages.length > 0 ? "w-full flex flex-col gap-1" : "hidden")}>
                  <p className="text-text-primary text-sm">Оригинальные картинки</p>
                  <div data-images>
                    {onlyImages.map((image) => (
                      <div
                        data-image
                        data-current
                        key={`:D:Vc:d:-${image.id}:`}
                        className="w-full h-auto rounded-2xl bg-BG-first flex items-center justify-center relative overflow-hidden"
                      >
                        <NextImageMotion
                          src={image.attributes.url}
                          hash={image.attributes.blur}
                          width={304}
                          data-img
                          height={392}
                          alt={image.attributes.alt}
                          className={cx(values.includes(image.id) && "sepia-[50%]")}
                          objectFit="cover"
                        />
                        <button
                          type="button"
                          data-trash
                          onClick={() => {
                            if (values.includes(image.id)) {
                              onChange(values.filter((_) => _ !== image.id))
                            } else {
                              onChange([...values, image.id])
                            }
                          }}
                        >
                          {values.includes(image.id) ? <IconRepeat /> : <IconTrashBlack />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />
            <div data-images>
              {_strings.images.map((item, index) => (
                <CurrentImage
                  key={`${item.index}-image`}
                  item={item.img}
                  index={item.index}
                  field={field}
                  progress={!loading ? null : onProgress(field.value.file, index, progress)}
                />
              ))}
              {field.value.string.length < 9 ? (
                <div data-image data-input-plus>
                  <input
                    type="file"
                    accept="image/*,video/*"
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
            <i>Максимальный размер фото - 10 Мб, видео - 50 Мб</i>
          </fieldset>
        )
      }}
    />
  )
}

ControlFileAppend.displayName = "ControlFileAppend"
export default ControlFileAppend
