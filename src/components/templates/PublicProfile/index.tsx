"use client"

import { IconSprite } from "@/components/icons/icon-sprite"
import PublicProfileUser from "./components/PublicProfileUser"
import PublicProfileServices from "./components/PublicProfileServices"

import { cx } from "@/lib/cx"
import { usePublicProfile, dispatchPublicProfile } from "@/store"

function PublicProfile() {
  const visible = usePublicProfile(({ visible }) => visible)

  return (
    <div
      className={cx(
        "wrapper-fixed max-md:hidden bg-translucent",
        "flex flex-row justify-end",
        visible && "!z-[1001] !opacity-100 !visible",
      )}
    >
      <section className="bg-BG-first rounded-l-3xl w-full relative max-w-[35.625rem] flex items-start justify-start">
        <button
          type="button"
          className="absolute top-6 -left-2.5 -translate-x-full w-12 h-12 p-3.5 flex items-center justify-center rounded-3xl bg-BG-second"
          onClick={() => {
            dispatchPublicProfile(null)
          }}
        >
          <IconSprite id="x-close-20-20" />
        </button>
        <ul className="scroll-no w-full flex flex-col gap-6 py-[1.875rem] px-[1.875rem] overflow-y-auto h-full">
          <PublicProfileUser />
          <PublicProfileServices />
        </ul>
      </section>
    </div>
  )
}

PublicProfile.displayName = "PublicProfile"
export default PublicProfile
