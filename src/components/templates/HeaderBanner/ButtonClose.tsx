import { IconXClose } from "@/components/icons/IconXClose"
import { dispatchCloseAdvertisingBanner } from "@/store"

export function ButtonCloseHeaderBanner() {
  return (
    <button
      data-close
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        dispatchCloseAdvertisingBanner()
      }}
    >
      <IconXClose />
    </button>
  )
}
