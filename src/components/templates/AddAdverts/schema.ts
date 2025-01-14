import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent } from "react"
import { EAdvertsButton } from "@/types/enum"

const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})

const actionAdvertButton = z.nativeEnum(EAdvertsButton).optional()
const actionUrl = z.string().default("")

const schema = z.object({
  title: z.string().min(1, { message: "Заголовок компании не может быть пустым" }).default(""),
  ad: z.string().default(""),
  erid: z.string().min(1, { message: "ID рекламы компании не может быть пустым" }).default(""),
  inn: z.string().min(1, { message: "ИНН компании не может быть пустым" }).default(""),
  ogrn: z.string().default(""),
  file: file,
  actionAdvertButton,
  actionUrl,
})

export type TSchemaAdvert = z.infer<typeof schema>
export const resolver = zodResolver(schema)
export type TFiles = z.infer<typeof file>

const sleep = () => new Promise((r) => setTimeout(r, 150))

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
    file: filesReady.file.splice(0, 1),
    string: filesReady.string.splice(0, 1),
  })
}
