import { type Dispatch, type ChangeEvent } from "react"
import { type AxiosProgressEvent } from "axios"
import { type Control, Controller } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"
import { type TSchemaCreate } from "../utils/create.schema"

import CurrentImage from "./CurrentImage"
import IconFile_06 from "@/components/icons/IconFile_06"
import IconTrashBlack from "@/components/icons/IconTrashBlack"

import { clg } from "@console"
import { useToast } from "@/helpers/hooks/useToast"
import { descriptionImages } from "../constants/titles"
import { MAX_SIZE_IMAGE, MAX_SIZE_VIDEO } from "@/helpers/constants"

async function handleImageChange(
  current: {
    file: File[]
    string: string[]
  },
  event: ChangeEvent<HTMLInputElement>,
  on: Dispatch<any>,
) {
  const files = event.target.files

  let filesReady = {
    file: [...current.file] as File[],
    string: [...current.string] as string[],
  }

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file) {
        clg("file: ", file)
        if ((file.type.includes("image") && file.size < MAX_SIZE_IMAGE) || (file.type.includes("video") && file.size < MAX_SIZE_VIDEO)) {
          const is = current.file.some((_) => _.size === file.size && _.name === file.name)

          if (is) {
            on({ message: "Вы можете прикрепить одну копию одного файла" })
            continue
          }

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (f) {
            filesReady = {
              ...filesReady,
              file: [...filesReady.file, file],
              string: [...filesReady.string, file.type.includes("image") ? (f!.target!.result as string) : (file.type as string)],
            }
          }
        }
      }
    }
  }

  await new Promise((r) => setTimeout(r, 50))

  return Promise.resolve({
    file: filesReady.file.splice(0, 9),
    string: filesReady.string.splice(0, 9),
  })
}

const onProgress = (files: File[], index: number, progress: Record<string, AxiosProgressEvent>): number => {
  const file = files[index]
  const name = file?.name

  if (Object.hasOwn(progress, name)) {
    return (progress[name].loaded / (progress[name].total! || 1)) * 100
  }

  return 0
}

interface IProps {
  visible: boolean
  step?: number
  control: Control<TSchemaCreate, any>
  loading: boolean
  typeAdd: EnumTypeProvider
  progress: Record<string, AxiosProgressEvent>
}

function ControlFileAppend({ control, visible, step, loading, typeAdd, progress }: IProps) {
  const { on } = useToast()

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
          <fieldset
            data-photos
            id="fieldset-create-option-modal-photos"
            data-disabled={visible && step !== 3}
            data-test="fieldset-create-new-option-images"
          >
            <label htmlFor={field.name}>Фото или видео</label>
            <p>{descriptionImages(typeAdd!)}</p>
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
            <div data-images data-focus={visible && step === 4}>
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
                      const dataValues = await handleImageChange(field.value, event, on)
                      field.onChange(dataValues)
                      event.target.value = ""
                    }}
                    disabled={visible && step !== 4}
                    multiple
                  />
                </div>
              ) : null}
            </div>
            <i>Максимальный размер фото - 10 Мб, видео - 50 Мб</i>
            <i>Не более 9 файлов</i>
          </fieldset>
        )
      }}
    />
  )
}

ControlFileAppend.displayName = "ControlFileAppend"
export default ControlFileAppend
