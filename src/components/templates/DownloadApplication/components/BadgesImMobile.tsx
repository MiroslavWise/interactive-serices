import IconPinAlert from "@/components/icons/modal-apps/IconPinAlert"
import IconPinOffer from "@/components/icons/modal-apps/IconPinOffer"
import IconPinDiscussion from "@/components/icons/modal-apps/IconPinDiscussion"

import { cx } from "@/lib/cx"

const CN_ALL = "absolute z-30"

function BadgesImMobile() {
  return (
    <>
      <article
        style={{
          height: "1.87356rem",
          width: "4.7265rem",
          aspectRatio: "4.7265/1.87356",
          left: "-1.59475rem",
        }}
        className={cx(CN_ALL, "top-16 -translate-y-1")}
      >
        <IconPinOffer />
      </article>
      <article
        style={{
          top: "7.395rem",
          width: "7.5795rem",
          height: "1.87356rem",
          aspectRatio: "7.5795/1.87356",
        }}
        className={cx(CN_ALL, "-right-6")}
      >
        <IconPinAlert />
      </article>
      <article
        style={{
          left: "-2.375rem",
          bottom: "6.275rem",
          width: "10.00663rem",
          height: "1.87356rem",
          aspectRatio: "10.00663/1.87356",
        }}
        className={CN_ALL}
      >
        <IconPinDiscussion />
      </article>
    </>
  )
}

BadgesImMobile.displayName = "BadgesImMobile"
export default BadgesImMobile
