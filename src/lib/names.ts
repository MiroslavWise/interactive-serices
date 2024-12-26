import { EProviderLinkCustomer } from "@/app/(layout)/customer/[userId]/components/LinkService"
import { EnumTypeProvider } from "@/types/enum"

export function nameTitle(length: number, provider: EProviderLinkCustomer | EnumTypeProvider) {
  var num = length % 10
  if (length >= 10 && length <= 20) {
    if (EProviderLinkCustomer.discussion === provider) {
      return "обсуждений"
    }
    if (EProviderLinkCustomer.post === provider) {
      return "событий"
    }
    if (EnumTypeProvider.NOTE === provider) {
      return "записей"
    }
    if (EProviderLinkCustomer.alert === provider) {
      return "SOS-сообщений"
    }
    return "умений, или услуг"
  }
  if (num > 1 && num < 5) {
    if (EProviderLinkCustomer.discussion === provider) {
      return "обсуждения"
    }
    if (EProviderLinkCustomer.post === provider) {
      return "события"
    }
    if (EnumTypeProvider.NOTE === provider) {
      return "записи"
    }
    if (EProviderLinkCustomer.alert === provider) {
      return "SOS-сообщения"
    }
    return "умения или услуги"
  }
  if (num == 1) {
    if (EProviderLinkCustomer.discussion === provider) {
      return "обсуждение"
    }
    if (EProviderLinkCustomer.post === provider) {
      return "событие"
    }
    if (EnumTypeProvider.NOTE === provider) {
      return "запись"
    }
    if (EProviderLinkCustomer.alert === provider) {
      return "SOS-сообщение"
    }
    return "умение, или услуга"
  }
  if (EProviderLinkCustomer.discussion === provider) {
    return "обсуждений"
  }
  if (EnumTypeProvider.NOTE === provider) {
    return "записей"
  }
  if (EProviderLinkCustomer.post === provider) {
    return "событий"
  }
  if (EProviderLinkCustomer.alert === provider) {
    return "SOS-сообщений"
  }
  return "умений и услуг"
}
