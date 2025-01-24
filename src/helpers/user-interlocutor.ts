import { EnumProviderThreads } from "@/types/enum"
import { type IUserOffer } from "@/services/offers/types"
import { type ISmallDataOfferBarter } from "@/services/barters/types"

function userInterlocutor({ m, r = [], userId }: { m: IUserOffer; r: IUserOffer[]; userId: number }) {
  if (m?.id === userId) return r[0]
  if (r?.some((_) => _.id === userId)) return m
  return null
}

const objProvider: Record<EnumProviderThreads, string> = {
  [EnumProviderThreads.PERSONAL]: "",
  [EnumProviderThreads.OFFER_PAY]: "",
  [EnumProviderThreads.BARTER]: "",
  [EnumProviderThreads.GROUPS]: "",
  [EnumProviderThreads.HELP]: "",
  [EnumProviderThreads.POST]: "",
}

function typeMessage({
  provider,
  last,
  offer,
}: {
  provider: EnumProviderThreads
  last: string | null
  offer?: ISmallDataOfferBarter
}): string {
  if (provider === EnumProviderThreads.PERSONAL) return "Личные"
  if (provider === EnumProviderThreads.BARTER && !!offer)
    return `${objProvider[EnumProviderThreads.BARTER]} ${offer?.category?.title || "Предложение"}`
  if (provider === EnumProviderThreads.OFFER_PAY && !!offer)
    return `${objProvider[EnumProviderThreads.OFFER_PAY]} ${offer?.category?.title || "Предложение"}`
  return `${objProvider[provider] || ""} ${last || ""}`
}

export { userInterlocutor, typeMessage }
