import { type TItemTrack } from "../types/types"

import { TimeDiv } from "./TimeDiv"

import { useIntro } from "@/store"

export const ItemTrack: TItemTrack = ({ index }) => {
  const page = useIntro(({ page }) => page)

  return (
    <li data-full={index < page} data-active={index === page} data-null={index > page}>
      {page === index ? <TimeDiv index={index} /> : null}
    </li>
  )
}
