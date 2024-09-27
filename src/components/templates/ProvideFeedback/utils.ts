import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent } from "react"

const { object, string, array, number } = z

export const MIN_LENGTH = 16
export const MAX_LENGTH = 2000

const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})

const schema = object({
  message: string()
    .trim()
    .min(1, { message: "Поле обязательно для заполнения" })
    .min(MIN_LENGTH, { message: `Не менее ${MIN_LENGTH} символов` })
    .max(MAX_LENGTH, { message: `Достигнут лимит символов` }),
  rating: number().default(3),
  file: file,
})

export const resolver = zodResolver(schema)
export type TSchema = z.infer<typeof schema>
export type TFiles = z.infer<typeof file>

const sleep = () => new Promise((r) => setTimeout(r, 50))

export async function handleImageChange(
  current: {
    file: File[]
    string: string[]
  },
  event: ChangeEvent<HTMLInputElement>,
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
        if (file.size < 9.9 * 1024 * 1024) {
          const is = current.file.some((_) => _.size === file.size && _.name === file.name)

          if (is) {
            continue
          }

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (f) {
            filesReady = {
              ...filesReady,
              file: [...filesReady.file, file],
              string: [...filesReady.string, f!.target!.result as string],
            }
          }
        }
      }
    }
  }

  await sleep()

  return Promise.resolve({
    file: filesReady.file.splice(0, 9),
    string: filesReady.string.splice(0, 9),
  })
}
