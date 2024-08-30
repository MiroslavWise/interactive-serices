import { useQuery } from "@tanstack/react-query"

import { EnumProviderThreads } from "@/types/enum"
import { type IResponseThread } from "@/services/threads/types"

import LoadingBarter from "./LoadingBarter"

import { useAuth } from "@/store"
import { formatOfMMMM } from "@/helpers"
import { getBarterId, getIdOffer } from "@/services"
import { userInterlocutor } from "@/helpers/user-interlocutor"

function ItemBarter({ thread }: { thread: IResponseThread }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const barterId = thread?.provider === EnumProviderThreads.BARTER ? thread?.barterId : null
  const offerId = thread?.provider === EnumProviderThreads.OFFER_PAY ? thread?.offerId : null
  const user = userInterlocutor({ m: thread?.emitter!, r: thread?.receivers!, userId: userId! })

  const { data: dataBarter, isLoading: isLoadingBarter } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: !!barterId,
  })

  const { data: dataOffer, isLoading: isLoadingOffer } = useQuery({
    queryFn: () => getIdOffer(thread?.offerId!),
    queryKey: ["offers", { offerId: thread?.offerId! }],
    enabled: !!offerId,
  })

  const { data: dataB } = dataBarter ?? {}
  const { data: dataO } = dataOffer ?? {}

  if (![EnumProviderThreads.BARTER, EnumProviderThreads.OFFER_PAY].includes(thread?.provider!)) return null
  if (thread?.provider === EnumProviderThreads.PERSONAL) return null

  if (isLoadingBarter || isLoadingOffer) return <LoadingBarter />

  if (thread?.provider === EnumProviderThreads.OFFER_PAY && !!dataO) {
    const text =
      userId === dataO?.userId
        ? `${user?.firstName || "Имя"} заинтересован(а) в покупке вашей услуги «${
            dataO?.category?.title
          }».Договоритесь о цене и условиях покупки в чате.`
        : `Вы предлагаете заплатить за услугу «${dataO?.category?.title}». Договоритесь о цене и условиях покупки в чате.`

    return (
      <div className="w-full flex flex-col items-center gap-3 mt-auto mb-3 md:mb-5">
        <article className="w-fit min-w-16 px-3 h-[1.6875rem] rounded-[0.84375rem] py-1 flex items-center justify-center bg-BG-time">
          <time className="text-text-button text-[0.8125rem] font-normal">{formatOfMMMM(thread?.created || new Date(), "dd MMMM")}</time>
        </article>
        <article className="w-full md:max-w-[25rem] py-2 px-3 rounded-2xl border border-grey-separator border-solid">
          <p className="text-center text-sm text-text-primary">{text}</p>
        </article>
      </div>
    )
  }

  if (thread?.provider === EnumProviderThreads.BARTER && !!dataB) {
    const text =
      dataB?.initiator?.userId === userId
        ? `Вы предлагаете «${dataB?.initiator?.category?.title || "Предложение"}» взамен на «${
            dataB?.consigner?.category?.title || "Предложение"
          }».\n
        Также вместо обмена, вы можете предложить покупку услуги.
          `
        : dataB?.consigner?.userId === userId
        ? `${dataB?.initiator?.user?.firstName || "Имя"} предлагает «${dataB?.initiator?.category?.title || "Предложение"}» взамен на «${
            dataB?.consigner?.category?.title || "Предложение"
          }»`
        : null

    const textExecuted = dataB?.executed
      ? dataB?.initiator?.userId === userId
        ? `Ваше предложение обмена принято.`
        : dataB?.consigner?.userId === userId
        ? `Вы приняли предложение обмена.`
        : null
      : null

    const timeCreate = formatOfMMMM(dataB?.created || new Date(), "HH:mm")
    const timeExecuted = formatOfMMMM(dataB?.executed || new Date(), "HH:mm")

    return (
      <div className="w-full flex flex-col items-center gap-3 mt-auto mb-3 md:mb-5">
        <article className="w-fit min-w-16 px-3 h-[1.6875rem] rounded-[0.84375rem] py-1 flex items-center justify-center bg-BG-time">
          <time className="text-text-button text-[0.8125rem] font-normal">{formatOfMMMM(dataB?.created || new Date(), "dd MMMM")}</time>
        </article>
        <article className="w-full md:max-w-[25rem] py-2 px-3 rounded-2xl border border-grey-separator border-solid flex flex-row flex-wrap gap-1 justify-center relative">
          <p className="text-center text-sm text-text-primary">
            {text}&nbsp;
            <time className="text-text-secondary text-xs font-normal ml-auto opacity-0">{timeCreate}</time>
            <time className="text-text-secondary text-xs font-normal absolute bottom-2 right-3">{timeCreate}</time>
          </p>
        </article>
        {!!textExecuted ? (
          <article className="w-fit md:max-w-[25rem] py-2 px-3 rounded-2xl border border-grey-separator border-solid -mt-2 relative">
            <p className="text-center text-sm text-text-primary">
              {textExecuted}&nbsp;
              <time className="text-text-secondary text-xs font-normal ml-auto opacity-0">{timeExecuted}</time>
              <time className="text-text-secondary text-xs font-normal absolute bottom-2 right-3">{timeExecuted}</time>
            </p>
          </article>
        ) : null}
      </div>
    )
  }

  return null
}

ItemBarter.displayName = "ItemBarter"
export default ItemBarter
