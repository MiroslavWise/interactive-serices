"use client"

import { useEffect } from "react"

import { ButtonClose } from "@/components/common"
import CardBallon from "@/components/common/Card/CardBallon"

import { cx } from "@/lib/cx"
import { dispatchHasBalloon, useHasBalloons } from "@/store"

export const HasClustererBalloons = () => {
  const offers = useHasBalloons(({ offers }) => offers)
  const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)

  const close = () => dispatchHasBalloon({ visibleHasBalloon: false })

  useEffect(() => {
    if (visibleHasBalloon) {
      const keyDown = (e: KeyboardEvent) => {
        if (e.code == "Escape" || e.keyCode === 27) {
          close()
        }
      }

      document.addEventListener("keydown", keyDown, false)
      window.addEventListener("popstate", close, false)

      return () => {
        document?.removeEventListener("keydown", keyDown)
        window.removeEventListener("popstate", close)
      }
    }
  }, [visibleHasBalloon])

  return (
    <div
      className={cx(
        "wrapper-fixed",
        "bg-translucent flex flex-col items-start py-0 md:pr-10 max-md:pt-8",
        visibleHasBalloon ? "!z-[209] !visible !opacity-100" : "-z-10 opacity-0 invisible",
      )}
    >
      <section
        data-section-modal
        className="relative md:max-w-[27.735rem] w-full h-full rounded-t-3xl md:rounded-l-[2rem] flex flex-col max-md:justify-end max-md:p-0 bg-BG-second"
      >
        <ButtonClose onClick={close} className="!right-0 !translate-x-0" />
        <header className="w-full h-[4.25rem] md:h-[4.75rem] px-5 md:px-0 md:pt-6 pb-4 md:pb-5 border-b border-solid border-grey-stroke-light flex items-center justify-center">
          <h3 className="text-text-primary text-center text-2xl font-semibold">Сервисы</h3>
        </header>
        <div data-container className="h-full w-full overflow-hidden md:rounded-l-[2rem]">
          <ul className="w-full h-full p-3 md:p-4 flex flex-col gap-3 md:gap-4 overflow-x-hidden overflow-y-auto">
            {offers && offers?.length > 0 ? offers.map((item) => <CardBallon key={`::offer::general::${item.id}::`} offer={item} />) : null}
          </ul>
        </div>
      </section>
    </div>
  )
}
