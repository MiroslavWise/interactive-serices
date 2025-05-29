"use client"

import { type TSpriteNav } from "@/components/icons/icon-sprite-nav-header"

import Button from "@/components/common/Button"
import { IconSprite } from "@/components/icons/icon-sprite"

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
        <div className="relative w-6 h-6">
          <IconSprite id={type} className="w-8 h-8 text-element-accent-1" />
        </div>
      }
    />
  )
}

ButtonOpenDrawer.displayName = "ButtonOpenDrawer"
export default ButtonOpenDrawer
