import { EnumProviderThreads } from "@/types/enum"

import IconChatRepeat from "@/components/icons/chat/icon-chat-repeat"
import IconChatPay from "@/components/icons/chat/icon-chat-pay"

function ChatIconProvider({ provider }: { provider: EnumProviderThreads }) {
  if (provider === EnumProviderThreads.BARTER)
    return (
      <div className="absolute -top-0.5 -left-0.5 w-5 h-5 rounded-full p-1 flex items-center justify-center bg-[#7471F8] *:w-3 *:h-3 z-30">
        <IconChatRepeat />
      </div>
    )

  if (provider === EnumProviderThreads.OFFER_PAY)
    return (
      <div className="absolute -top-0.5 -left-0.5 w-5 h-5 rounded-full p-1 flex items-center justify-center bg-more-green *:w-3 *:h-3 z-30">
        <IconChatPay />
      </div>
    )

  return null
}

ChatIconProvider.displayName = "ChatIconProvider"
export default ChatIconProvider
