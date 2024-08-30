import { EnumStatusBarter } from "@/types/enum"

import { cx } from "@/lib/cx"

const obj = {
  [EnumStatusBarter.EXECUTED]: "В процессе",
  [EnumStatusBarter.COMPLETED]: "Завершён",
} as Record<EnumStatusBarter, string>

export const BadgeStatus = ({ status }: { status: EnumStatusBarter }) => {
  if ([EnumStatusBarter.EXECUTED, EnumStatusBarter.COMPLETED].includes(status)) {
    return (
      <div
        className={cx(
          "p-1 px-1.5 h-6 w-min rounded-xl flex items-center justify-center",
          status === EnumStatusBarter.EXECUTED && "[background:var(--more-green)]",
          status === EnumStatusBarter.COMPLETED && "[background:var(--more-orange)]",
        )}
      >
        <span className="text-text-button text-xs font-normal whitespace-nowrap">{obj[status]}</span>
      </div>
    )
  }

  return null
}
