import { useRouter } from "next/navigation"
import { type Dispatch, type SetStateAction, useState } from "react"

import { type IPostThreads } from "@/services/threads/types"
import { type IResponseOffers } from "@/services/offers/types"
import { EnumProviderThreads, EnumSign, EnumTypeProvider } from "@/types/enum"

import { ButtonLike } from "./ButtonLike"
import { ButtonActivity } from "./ButtonActivity"
import { ButtonComments } from "./ButtonComments"

import { cx } from "@/lib/cx"
import { postThread } from "@/services"
import IconSpinner from "@/components/icons/IconSpinner"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { dispatchAuthModal, dispatchModalClose, useAuth } from "@/store"

interface IProps {
  offer: IResponseOffers
  setExpandComment: Dispatch<SetStateAction<boolean>>
}

function BlockAction({ offer, setExpandComment }: IProps) {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { push } = useRouter()
  const [loadingChat, setLoadingChat] = useState(false)

  async function handleHelp() {
    if (isAuth && offer?.userId !== userId) {
      setLoadingChat(true)
      const provider = providerIsAscending({
        type: EnumProviderThreads.PERSONAL,
        ids: [userId!, offer?.userId!],
      })!
      const data: IPostThreads = {
        title: provider,
        receiverIds: [offer?.userId!],
        provider: EnumProviderThreads.PERSONAL,
        enabled: true,
      }
      const { res } = await postThread(data)
      const { id } = res ?? {}

      if (!!id) {
        const url = `/chat/${id}`
        push(url)
      } else {
        const url = `/chat?user=${offer?.userId}`
        push(url)
      }

      setTimeout(dispatchModalClose, 300)
      return
    }
    if (!isAuth) {
      dispatchAuthModal({
        visible: true,
        type: EnumSign.SignIn,
      })
      return
    }
  }

  return (
    <div className="w-full px-5 flex flex-col md:flex-row md:justify-between gap-4 md:items-center">
      <div
        className={cx(
          "flex flex-row gap-2.5 items-center",
          "[&>button]:border-none [&>button]:outline-none [&>button]:bg-grey-field [&>button]:h-[1.875rem] [&>button]:py-[0.3125rem] [&>button]:px-2.5",
          "[&>button]:rounded-[0.9375rem] [&>button]:w-min [&>button]:flex [&>button]:flex-row [&>button]:items-center [&>button]:gap-1",
          "[&>button>svg]:w-5 [&>button>svg]:h-5",
          "[&>button>span]:text-text-secondary [&>button>span]:text-xs [&>button>span]:font-medium",
        )}
      >
        <ButtonLike offer={offer} />
        <ButtonComments id={offer.threadId!} setExpandComment={setExpandComment} />
        <ButtonActivity offer={offer} />
      </div>
      <button
        type="button"
        className={cx(
          offer.provider === EnumTypeProvider.alert && userId !== offer?.userId
            ? "px-4 py-1.5 rounded-[1.125rem] flex items-center justify-center h-9 w-full md:w-min bg-text-error relative"
            : "hidden opacity-0 invisible -z-10",
        )}
        onClick={handleHelp}
      >
        <div
          className={cx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible h-5 w-5 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:rounded-[0.625rem]",
            loadingChat ? "!opacity-100 !visible" : "invisible opacity-0 hidden",
          )}
        >
          <IconSpinner />
        </div>
        <span className={cx("text-text-button text-sm font-medium whitespace-nowrap", loadingChat ? "opacity-60" : "")}>Могу помочь</span>
      </button>
    </div>
  )
}

BlockAction.displayName = "BlockAction"
export default BlockAction
