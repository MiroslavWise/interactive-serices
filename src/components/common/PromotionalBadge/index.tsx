import IconInfo from "@/components/icons/IconInfo"

import styles from "./style.module.scss"

function PromotionalBadge({ erid }: { erid: string }) {
  return (
    <article className={styles.container} data-promotional-badge>
      <p>
        Реклама.<span>&nbsp;ООО &quot;ШЕЙРА&quot;. ИНН: 7813670484. erid: {erid}</span>
      </p>
      <button type="button" data-icon>
        <IconInfo />
      </button>
    </article>
  )
}

PromotionalBadge.displayName = "PromotionalBadge"
export default PromotionalBadge
