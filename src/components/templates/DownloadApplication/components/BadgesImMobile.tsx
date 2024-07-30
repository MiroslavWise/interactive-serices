import IconPinAlert from "@/components/icons/modal-apps/IconPinAlert"
import IconPinOffer from "@/components/icons/modal-apps/IconPinOffer"
import IconPinDiscussion from "@/components/icons/modal-apps/IconPinDiscussion"

import { cx } from "@/lib/cx"

const CN_ALL = "absolute z-30"

function BadgesImMobile() {
  return (
    <>
      <article className={cx(CN_ALL, "-left-[1.59475rem] top-16 -translate-y-1 w-[4.7265rem] h-[1.87356rem] aspect-[4.7265/1.87356]")}>
        <IconPinOffer />
      </article>
      <article className={cx(CN_ALL, "-right-6 top-[7.395rem] w-[7.5795rem] h-[1.87356rem] aspect-[7.5795/1.87356]")}>
        <IconPinAlert />
      </article>
      <article className={cx(CN_ALL, "-left-[2.375rem] bottom-[6.275rem] w-[10.00663rem] h-[1.87356rem] aspect-[10.00663/1.87356]")}>
        <IconPinDiscussion />
      </article>
    </>
  )
}

BadgesImMobile.displayName = "BadgesImMobile"
export default BadgesImMobile
