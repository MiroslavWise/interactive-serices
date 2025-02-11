import { useState } from "react"
import { useRouter } from "next/navigation"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseComplains } from "@/services/complains/types"

import { SpriteDefault } from "@/components/icons/icon-sprite-default"

import { formatOfMMM } from "@/helpers"
import { getIdOffer } from "@/services"
import { getPostId } from "@/services/posts"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchBallonPost } from "@/store"

const titleMap: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.profile, "Жалоба на пользователя"],
  [EnumTypeProvider.offer, "Жалоба на умение или услугу"],
  [EnumTypeProvider.discussion, "Жалоба на обсуждение"],
  [EnumTypeProvider.alert, "Жалоба на SOS-сообщение"],
  [EnumTypeProvider.POST, "Жалоба на событие"],
])

const onTitle = (value: EnumTypeProvider) => (titleMap.has(value) ? titleMap.get(value) : null)

function ItemComplain(props: IResponseComplains) {
  const { on } = useToast()
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const { provider, created, message, receiverId } = props ?? {}

  async function handle() {
    if ([EnumTypeProvider.offer, EnumTypeProvider.alert].includes(provider)) {
      if (!loading) {
        setLoading(true)
        const { data } = await getIdOffer(receiverId!)
        if (!!data) {
          if (data.provider === EnumTypeProvider.offer) {
            dispatchBallonOffer({ offer: data })
          }
          if (data.provider === EnumTypeProvider.discussion) {
            dispatchBallonDiscussion({ offer: data })
          }
          if (data.provider === EnumTypeProvider.alert) {
            dispatchBallonAlert({ offer: data })
          }
        } else {
          on({
            message: `Удалено или не существует!!!`,
          })
        }
        setLoading(false)
      }
      return
    }
    if (provider === EnumTypeProvider.POST) {
      setLoading(true)
      const { data } = await getPostId(receiverId!)
      if (!!data) {
        dispatchBallonPost(data)
      } else {
        on({
          message: `Удалено или не существует!!!`,
        })
      }
      setLoading(false)
      return
    }
    if (provider === EnumTypeProvider.profile) {
      return push(`/customer/${receiverId}`)
    }
  }

  return (
    <li
      className="w-full rounded-2xl border border-solid border-grey-stroke-light p-3 flex flex-col gap-3 bg-BG-second cursor-pointer h-min overflow-hidden"
      onClick={handle}
    >
      <div className="w-full flex flex-row items-center justify-between gap-3">
        <time className="text-text-secondary text-xs font-normal">{formatOfMMM(created)}</time>
        <button type="button" className="relative w-4 h-4 p-2 *:w-4 *:h-4 text-element-grey-light hover:text-element-accent-1">
          <SpriteDefault id="dots-horizontal" />
        </button>
      </div>
      <h3 className="text-text-primary text-base font-semibold">{onTitle(provider)}</h3>
      <p className="text-text-primary text-sm font-normal">
        Причина: <span className="text-text-secondary">{message}</span>
      </p>
    </li>
  )
}

ItemComplain.displayName = "ItemComplain"
export default ItemComplain
