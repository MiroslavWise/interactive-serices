"use client"

import Button from "@/components/common/Button"
import { IconSpriteNavHeader, TSpriteNav } from "@/components/icons/icon-sprite-nav-header"

import { cx } from "@/lib/cx"
import { dispatchOpenDrawer, useOpenDrawer } from "@/store"

function ButtonOpenDrawer({ type }: { type: TSpriteNav }) {
  const open = useOpenDrawer(({ visible }) => visible)

  return (
    <Button
      type="button"
      className={cx("px-2.5 !w-min", open ? "bg-transparent" : "")}
      typeButton="regular-primary"
      onClick={dispatchOpenDrawer}
      suffixIcon={
        <div className="relative w-6 h-6 *:w-8 *:h-8 text-element-accent-1">
          <IconSpriteNavHeader id={type} />
        </div>
      }
    />
  )
}

ButtonOpenDrawer.displayName = "ButtonOpenDrawer"
export default ButtonOpenDrawer
