import { cx } from "@/lib/cx"
import { type IResponseMessage } from "@/services/messages/types"

import { useAuth } from "@/store"

function ItemMessage({ message }: { message: IResponseMessage }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  return (
    <div
      className={cx(
        "w-full flex flex-row",
        userId === message.emitterId ? "justify-end" : "justify-start *:bg-grey-field",
        "*:max-w-[23.375rem]",
      )}
    >
      <article className="py-2 px-3 rounded-2xl">
        <p className="text-text-primary text-sm font-normal">{message.message}</p>
      </article>
    </div>
  )
}

ItemMessage.displayName = "ItemMessage"
export default ItemMessage
