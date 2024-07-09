import { EnumProviderThreads } from "@/types/enum"
import { type IUserOffer } from "@/services/offers/types"

function userInterlocutor({ m, r = [], userId }: { m: IUserOffer; r: IUserOffer[]; userId: number }) {
  if (m?.id === userId) return r[0]
  if (r?.some((_) => _.id === userId)) return m
  return null
}

const objProvider: Record<EnumProviderThreads, string> = {
  [EnumProviderThreads.PERSONAL]: "Личные",
  [EnumProviderThreads.OFFER_PAY]: "Покупка:",
  [EnumProviderThreads.BARTER]: "Обмен:",
  [EnumProviderThreads.GROUPS]: "",
}

function typeMessage({ provider, last }: { provider: EnumProviderThreads; last: string | null }): string {
  if (provider === EnumProviderThreads.PERSONAL) return "Личные"
  return `${objProvider[provider] || ""} ${last || ""}`
}

export { userInterlocutor, typeMessage }
