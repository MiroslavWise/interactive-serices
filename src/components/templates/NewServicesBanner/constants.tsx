import { EnumTypeProvider } from "@/types/enum"
import { type INewCreateBadge } from "./types/types"

export const NEW_CREATE_BADGES: INewCreateBadge[] = [
  {
    label: "Умения и услуги",
    value: EnumTypeProvider.offer,
    assistance: "Выберите этот пункт, чтобы рассказать, что вы умеете и какие можете оказать услуги",
  },
  {
    label: "SOS-сообщение",
    value: EnumTypeProvider.alert,
    assistance: "Нажмите, чтобы поделиться фотографиями, новостями, важными событиями или пригласить участников на мероприятие",
  },
  {
    label: "Событие",
    value: EnumTypeProvider.POST,
    assistance: "Нажмите, чтобы сообщить, в чем вам нужна срочная помощь",
  },
]
