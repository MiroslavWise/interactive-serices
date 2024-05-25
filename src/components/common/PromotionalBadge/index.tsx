import IconInfo from "@/components/icons/IconInfo"

import styles from "./style.module.scss"

function PromotionalBadge() {
  return (
    <article className={styles.container}>
      <p></p>
      <div data-icon>
        <IconInfo />
      </div>
    </article>
  )
}

PromotionalBadge.displayName = "PromotionalBadge"
export default PromotionalBadge
