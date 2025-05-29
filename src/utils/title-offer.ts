import { EnumTypeProvider } from "@/types/enum"

export const titleOffer = (title: string, provider: EnumTypeProvider) => {
  if (provider === EnumTypeProvider.offer) return title ?? "Умение или услуга"
  if (provider === EnumTypeProvider.alert) return title ?? "SOS-сообщение"
  if (provider === EnumTypeProvider.discussion) return title ?? "Обсуждение"
  return null
}
