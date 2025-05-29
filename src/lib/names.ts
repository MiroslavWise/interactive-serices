import { EProviderLinkCustomer } from "@/app/(layout)/customer/[userId]/components/LinkService"
import { EnumTypeProvider } from "@/types/enum"

export type ProviderNameTitle = EProviderLinkCustomer | EnumTypeProvider | "users" | "default"

const forms = {
  [EProviderLinkCustomer.discussion]: ["обсуждение", "обсуждения", "обсуждений"],
  [EProviderLinkCustomer.post]: ["событие", "события", "событий"],
  [EnumTypeProvider.NOTE]: ["запись", "записи", "записей"],
  [EProviderLinkCustomer.alert]: ["SOS-сообщение", "SOS-сообщения", "SOS-сообщений"],
  users: ["пользователь", "пользователя", "пользователей"],
  default: ["умение, или услуга", "умения или услуги", "умений, или услуг"],
} as Record<ProviderNameTitle, [string, string, string]>

function getFormIndex(n: number): number {
  const num = n % 100
  if (num >= 11 && num <= 20) return 2
  switch (num % 10) {
    case 1:
      return 0
    case 2:
    case 3:
    case 4:
      return 1
    default:
      return 2
  }
}

export function nameTitle(length: number, provider: ProviderNameTitle) {
  const formKey = Object.keys(forms).includes(provider) ? provider : "default"
  return forms[formKey][getFormIndex(length)]
}
