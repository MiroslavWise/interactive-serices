import { cx } from "@/lib/cx"

import styles from "./layout.module.scss"

export default ({ children }: { children: React.ReactNode }) => (
  <>
    <div className={cx("wrapper-fixed", styles.container, "bg-translucent flex items-center justify-center z-[3000]")} data-visible>
      <img className="w-20 h-20 rotate-0" src="/svg/spinner.svg" alt="loading" width={50} height={50} />
    </div>
    {children}
  </>
)
