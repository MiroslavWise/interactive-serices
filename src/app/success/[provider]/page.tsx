"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"

import { EnumTypeProvider } from "@/types/enum"
import { cx } from "@/lib/cx"

const defaultTime = 3000

export default () => {
  const { provider } = useParams()
  const id = useSearchParams().get("id") as string | number

  const [time, setTime] = useState(defaultTime + 1)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((_) => (_ > 0 ? _ - 100 : 0))
    }, 100)
    const timeClose = setTimeout(() => {
      window.close()
    }, defaultTime + 99)

    return () => {
      clearInterval(interval)
      clearTimeout(timeClose)
    }
  }, [id])

  return (
    <div className="fixed flex items-center justify-center z-[1000] w-full h-full bg-BG-second inset-0">
      <section
        className={cx(
          "flex flex-col gap-3 items-center p-5 rounded-2 border border-solid",
          provider === EnumTypeProvider.POST && "border-card-border-yellow bg-card-yellow",
          provider === EnumTypeProvider.alert && "border-card-border-red bg-card-red",
          provider === EnumTypeProvider.discussion && "border-card-border-blue bg-card-border-blue",
          provider === EnumTypeProvider.offer && "border-grey-stroke-light",
        )}
      >
        <h2 className="text-text-primary text-xl font-semibold">Окно закроется через {(time / 1000).toFixed(1)} с.</h2>
        <div
          className={cx(
            "w-full h-4 rounded-lg border border-solid relative overflow-hidden",
            provider === EnumTypeProvider.POST && "border-card-border-yellow",
            provider === EnumTypeProvider.alert && "border-card-border-red",
            provider === EnumTypeProvider.discussion && "border-card-border-blue",
            provider === EnumTypeProvider.offer && "border-grey-stroke-light",
          )}
        >
          <span
            className={cx(
              "w-full h-full rounded-lg absolute top-0 bottom-0 left-0 transition-transform duration-200",
              provider === EnumTypeProvider.POST && "bg-card-border-yellow",
              provider === EnumTypeProvider.alert && "bg-card-border-red",
              provider === EnumTypeProvider.discussion && "bg-card-border-blue",
              provider === EnumTypeProvider.offer && "bg-text-secondary",
            )}
            style={{
              transform: `translateX(-${Math.abs(time / defaultTime - 1) * 100}%)`,
            }}
          />
        </div>
      </section>
    </div>
  )
}
