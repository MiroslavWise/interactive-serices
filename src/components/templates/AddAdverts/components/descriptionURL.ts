import { EAdvertsButton } from "@/types/enum"

const obj = {
  [EAdvertsButton.WEBSITE]: 'Введите полную ссылку на сайт (пример: https://example.com) *Обязательно "https://"',
  [EAdvertsButton.CALL]:
    "Введите номер телефона, допустимый формат: \n+XXX XX XXX-XX-XX, \n+XXXXXXXXXXXX, \n+XXX (XX) XXX-XX-XX \nДопустимы номера разных стран",
  [EAdvertsButton.CALL_ON_WHATSAPP]: "Введите номер телефона, допустимый формат: XXXXXXXXXXXX, XXX (XX) XXX-XX-XX",
  [EAdvertsButton.SIGN_UP]: "Оставьте поле пустым!!!",
  [EAdvertsButton.GO_TO_CHAT]: "Оставьте поле пустым!!!",
  [EAdvertsButton.TELEGRAM_CHANNEL]: "Нужен только username канала: @example \nВнимание! Не нужно вводить t.me/@example",
  [EAdvertsButton.READ_MORE]: "Оставьте поле пустым!!!",
  [EAdvertsButton.BUY]: "Оставьте поле пустым!!!",
  [EAdvertsButton.ORDER]: "Оставьте поле пустым!!!",
  [EAdvertsButton.ENROLLING]: "Оставьте поле пустым!!!",
  [EAdvertsButton.ASK_A_QUESTION]: "Оставьте поле пустым!!!",
} as Record<EAdvertsButton, string>

function descriptionURL(value: EAdvertsButton) {
  if (!value) return null
  if (!obj.hasOwnProperty(value)) return null

  return obj[value]
}

export default descriptionURL
