import { type Dispatch, memo, SetStateAction } from "react"

import { type IResponseOffers } from "@/services/offers/types"

import { ButtonLike } from "./ButtonLike"
import { ButtonActivity } from "./ButtonActivity"
import { ButtonComments } from "./ButtonComments"

import { cx } from "@/lib/cx"

interface IProps {
  offer: IResponseOffers

  setExpandComment: Dispatch<SetStateAction<boolean>>
}

function BlockAction({ offer, setExpandComment }: IProps) {
  return (
    <div
      className={cx(
        "w-full px-5 flex flex-row gap-2.5",
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
  )
}

BlockAction.displayName = "BlockAction"
export default memo(BlockAction)
