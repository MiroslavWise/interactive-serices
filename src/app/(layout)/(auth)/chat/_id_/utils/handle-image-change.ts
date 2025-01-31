import type { ChangeEvent } from "react"

const MAX_FILE_SIZE = 9.9 * 1024 * 1024
const sleep = () => new Promise((r) => setTimeout(r, 150))

export async function handleImageChange(
  event: ChangeEvent<HTMLInputElement>,
  filesState: {
    file: File[]
    string: string[]
  },
) {
  const files = event.target.files

  let filesReady = {
    file: [...filesState.file] as File[],
    string: [...filesState.string] as string[],
  }

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file) {
        if (file.size < MAX_FILE_SIZE) {
          const is = filesState.file.some((_) => _.size === file.size && _.name === file.name)

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
