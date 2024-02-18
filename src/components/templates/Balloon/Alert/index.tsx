import { cx } from "@/lib/cx"

import common from "../styles/general.module.scss"
import { ButtonClose } from "@/components/common"

export const BalloonAlert = () => {
  function close() {}

  return (
    <div className={cx("wrapper-fixed", common.wrapper)}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
      </section>
    </div>
  )
}
