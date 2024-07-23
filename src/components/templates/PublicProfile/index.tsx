"use client"

import { IconXClose } from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { usePublicProfile, dispatchPublicProfile } from "@/store"

function PublicProfile() {
  const visible = usePublicProfile(({ visible }) => visible)
  const id = usePublicProfile(({ id }) => id)

  return (
    <div
      className={cx(
        "wrapper-fixed max-md:hidden bg-translucent",
        "flex flex-row justify-end",
        visible && "!z-[1001] !opacity-100 !visible",
      )}
    >
      <section className="bg-BG-first rounded-l-3xl w-full relative max-w-[35.625rem]">
        <button
          type="button"
          className="absolute top-6 -left-2.5 -translate-x-full w-12 h-12 p-3.5 flex items-center justify-center rounded-3xl bg-BG-second"
          onClick={() => {
            dispatchPublicProfile(null)
          }}
        >
          <IconXClose />
        </button>
      </section>
    </div>
  )
}

PublicProfile.displayName = "PublicProfile"
export default PublicProfile
