import { type DispatchWithoutAction } from "react"

import { cx } from "@/lib/cx"

interface IGeoTagging {
  location: string
  fontSize?: number | string
  onClick?: DispatchWithoutAction
  className?: string
}

export const GeoTagging = ({ location, fontSize, onClick, className }: IGeoTagging) => {
  function handle(event: any) {
    if (onClick) {
      onClick()
    }
  }
  return (
    <div className={cx("inline-flex items-center gap-1 w-auto max-w-full", className)} onClick={handle} data-geo>
      <p className="text-text-secondary text-base font-medium text-ellipsis line-clamp-1" style={{ fontSize: fontSize || 16 }}>
        {location}
      </p>
    </div>
  )
}
