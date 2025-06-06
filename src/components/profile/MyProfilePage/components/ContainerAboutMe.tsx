"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { BadgesColors } from "./BadgesColors"
import { FormChangeAbout } from "./FormChangeAbout"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useResize } from "@/helpers"
import { getUserId } from "@/services"

import styles from "./styles/about-me.module.scss"

const Edit = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8671 1.19541C12.6798 0.382779 13.9973 0.38278 14.8099 1.19541C15.6226 2.00805 15.6226 3.32559 14.8099 4.13822L8.43479 10.5134C8.42159 10.5266 8.40851 10.5397 8.39554 10.5527C8.20391 10.7447 8.03495 10.9139 7.83125 11.0388C7.65231 11.1484 7.45722 11.2292 7.25315 11.2782C7.02085 11.334 6.78168 11.3338 6.51042 11.3335C6.49206 11.3335 6.47355 11.3335 6.45489 11.3335H5.33852C4.97033 11.3335 4.67186 11.035 4.67186 10.6668V9.55048C4.67186 9.53181 4.67184 9.5133 4.67182 9.49494C4.67157 9.22367 4.67135 8.98451 4.72712 8.75221C4.77611 8.54814 4.85692 8.35305 4.96658 8.17411C5.0914 7.97041 5.26067 7.80146 5.45266 7.60982C5.46566 7.59685 5.47876 7.58377 5.49196 7.57057L11.8671 1.19541ZM13.8671 2.13822C13.5752 1.84629 13.1019 1.84629 12.8099 2.13822L6.43477 8.51338C6.18173 8.76643 6.13507 8.81914 6.10343 8.87077C6.06688 8.93042 6.03994 8.99545 6.02361 9.06347C6.00948 9.12235 6.00519 9.19262 6.00519 9.55048V10.0002H6.45489C6.81274 10.0002 6.88301 9.99587 6.94189 9.98173C7.00991 9.9654 7.07494 9.93847 7.13459 9.90191C7.18622 9.87027 7.23893 9.82362 7.49198 9.57058L13.8671 3.19541C14.1591 2.90348 14.1591 2.43016 13.8671 2.13822ZM4.51101 2.00015L7.33854 2.00015C7.70673 2.00015 8.00521 2.29863 8.00521 2.66682C8.00521 3.03501 7.70673 3.33349 7.33854 3.33349H4.53854C3.96749 3.33349 3.57929 3.334 3.27923 3.35852C2.98696 3.3824 2.83749 3.42568 2.73322 3.47881C2.48234 3.60664 2.27836 3.81062 2.15053 4.0615C2.09741 4.16576 2.05412 4.31523 2.03024 4.60751C2.00573 4.90757 2.00521 5.29577 2.00521 5.86682V11.4668C2.00521 12.0379 2.00573 12.4261 2.03024 12.7261C2.05412 13.0184 2.09741 13.1679 2.15053 13.2721C2.27836 13.523 2.48234 13.727 2.73322 13.8548C2.83749 13.908 2.98696 13.9512 3.27923 13.9751C3.57929 13.9996 3.96749 14.0002 4.53854 14.0002H10.1385C10.7096 14.0002 11.0978 13.9996 11.3979 13.9751C11.6901 13.9512 11.8396 13.908 11.9439 13.8548C12.1947 13.727 12.3987 13.523 12.5266 13.2721C12.5797 13.1679 12.623 13.0184 12.6468 12.7261C12.6714 12.4261 12.6719 12.0379 12.6719 11.4668V8.66682C12.6719 8.29863 12.9704 8.00015 13.3385 8.00015C13.7067 8.00015 14.0052 8.29863 14.0052 8.66682V11.4944C14.0052 12.031 14.0052 12.4739 13.9757 12.8347C13.9451 13.2094 13.8794 13.5539 13.7146 13.8775C13.4589 14.3792 13.051 14.7872 12.5492 15.0428C12.2256 15.2077 11.8812 15.2734 11.5064 15.304C11.1456 15.3335 10.7027 15.3335 10.166 15.3335H4.51104C3.97438 15.3335 3.53146 15.3335 3.17066 15.304C2.79593 15.2734 2.45146 15.2077 2.1279 15.0428C1.62614 14.7872 1.21819 14.3792 0.962525 13.8775C0.797664 13.5539 0.731955 13.2094 0.701338 12.8347C0.67186 12.4739 0.671867 12.031 0.671875 11.4944V5.83929C0.671867 5.30264 0.67186 4.85973 0.701338 4.49893C0.731955 4.1242 0.797664 3.77973 0.962525 3.45618C1.21819 2.95441 1.62614 2.54646 2.1279 2.2908C2.45146 2.12594 2.79593 2.06023 3.17066 2.02961C3.53146 2.00014 3.97436 2.00014 4.51101 2.00015Z"
        fill="var(--text-secondary)"
        className="transition-all"
      />
    </g>
  </svg>
)

export const ContainerAboutMe = () => {
  const { isTablet } = useResize()
  const [isEditing, setIsEditing] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, isLoading, isPending } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: dataUser } = data ?? {}
  const { profile } = dataUser ?? {}

  if (isTablet) return null

  return (
    <div className={cx(styles.wrapper, "w-full hidden md:flex flex-col gap-2.5")}>
      {isLoading || isPending ? (
        <div className="loading-screen w-full flex flex-col gap-0.5 py-3 px-4 bg-BG-second rounded-2xl">
          <article className="flex flex-row items-start justify-between">
            <span className="w-16 h-6 rounded-xl" />
            <span className="w-8 h-8 rounded-full" />
          </article>
          <article className="flex flex-col gap-1 *:h-4 *:w-full *:rounded-lg">
            <span className="max-w-full" />
            <span className="max-w-[33%]" />
          </article>
        </div>
      ) : (
        <section className="w-full flex flex-col gap-0.5 rounded-2xl bg-BG-second py-3 px-4">
          <header className="w-full flex flex-row items-start justify-between">
            <h4 className="text-text-primary text-base font-semibold">Обо мне</h4>
            <button
              type="button"
              onClick={() => {
                if (!isLoading || !isPending) {
                  setIsEditing(true)
                }
              }}
              disabled={isLoading || isPending}
              className={cx(
                "w-8 h-8 p-4 rounded-full bg-grey-field outline-none border-none relative",
                "*:absolute *:top-1/2 *:left-1/2 *:w-4 *:h-4 *:-translate-x-1/2 *:-translate-y-1/2",
              )}
            >
              <Edit />
            </button>
          </header>
          <article className="w-full">
            {isEditing ? (
              <FormChangeAbout setIsEditing={setIsEditing} />
            ) : (
              <span
                onClick={() => {
                  if (!profile?.about && (!isLoading || !isPending)) {
                    setIsEditing(true)
                  }
                }}
                className="text-text-disabled text-sm font-normal"
              >
                {profile?.about ? profile?.about : "Нажмите, чтобы редактировать информацию о себе."}
              </span>
            )}
          </article>
        </section>
      )}
      <BadgesColors userId={userId!} />
    </div>
  )
}
