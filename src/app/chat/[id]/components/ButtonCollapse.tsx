import IconArrowRight from "@/components/icons/IconArrowRight--"

import { cx } from "@/lib/cx"
import { dispatchCollapseChat, useCollapseChat } from "@/store"

function ButtonCollapse() {
  const collapse = useCollapseChat(({ collapse }) => collapse)

  return (
    <button type="button" className={cx("max-md:hidden", collapse && "*:rotate-180")} onClick={dispatchCollapseChat}>
      <IconArrowRight />
    </button>
  )
}

ButtonCollapse.displayName = "ButtonCollapse"
export default ButtonCollapse
