import { EAdvertsButton } from "@/types/enum"

const obj = {
  [EAdvertsButton.WEBSITE]: 'Введите полную ссылку на сайт (пример: https://example.com) *Обязательно "https://"',
} as Record<EAdvertsButton, string>

function descriptionURL(value: EAdvertsButton) {
  if (!value) return null
  if (!obj.hasOwnProperty(value)) return null

  return obj[value]
}

export default descriptionURL
