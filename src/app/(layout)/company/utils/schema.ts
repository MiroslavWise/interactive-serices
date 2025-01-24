import { z } from "zod"
import { ChangeEvent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { MAX_LENGTH_INN, MAX_LENGTH_OGRN } from "@/components/templates/AddAdverts/schema"

const file = z.object({
  file: z.array(z.instanceof(File)),
  string: z.array(z.string()),
})

const schema = z.object({
  title: z.string().trim().min(1, { message: "Заголовок компании не может быть пустым" }).default(""),
  ad: z.string().trim().default(""),
  erid: z.string().trim().min(1, { message: "ID рекламы компании не может быть пустым" }).default(""),
  inn: z
    .string()
    .trim()
    .min(1, { message: "ИНН компании не может быть пустым" })
    .max(MAX_LENGTH_INN, { message: `Не более ${MAX_LENGTH_INN} цифр для ИНН` })
    .default(""),
  ogrn: z
    .string()
    .trim()
    .max(MAX_LENGTH_OGRN, { message: `Не более ${MAX_LENGTH_OGRN} символов для ОРГН` })
    .default(""),
  file: file,
})

export type TSchemaCompany = z.infer<typeof schema>
export const resolverSchemaCompany = zodResolver(schema)
export type TFiles = z.infer<typeof file>

const schemaUsers = z.object({
  id: z.string().min(1, { message: "Введите id пользователя" }).default(""),
})

export type TSchemaUsers = z.infer<typeof schemaUsers>
export const resolverSchemaUsers = zodResolver(schemaUsers)

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
