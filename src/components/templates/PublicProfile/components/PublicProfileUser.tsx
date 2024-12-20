import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { fromNow } from "@/helpers"
import { useOnline, usePublicProfile } from "@/store"
import { getTestimonials, getUserId } from "@/services"
import { badges, ICON } from "@/app/(layout)/customer/[userId]/components/Accomplishments"

function PublicProfileUser() {
  const id = usePublicProfile(({ id }) => id)
  const users = useOnline(({ users }) => users)
  const { data, isLoading } = useQuery({
    queryFn: () => getUserId(id!),
    queryKey: ["user", { userId: id! }],
    enabled: !!id,
  })
  const { data: dataTestimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: id!, order: "DESC" }),
    queryKey: ["testimonials", { receiver: id, order: "DESC" }],
    enabled: !!id,
  })

  const isOnline = users.some((_) => _.id === id)

  const { profile, updated } = data?.data ?? {}
  const { firstName, lastName, image } = profile ?? {}

  const itemsAllBarters = data?.data?.barters?.filter((_) => _.status === EnumStatusBarter.COMPLETED) || []
  const itemsTestimonials = dataTestimonials?.data || []

  const lengthAllBarters = itemsAllBarters.length
  const lengthTestimonials = itemsTestimonials.length
  const averageRating = Number(
    itemsTestimonials.reduce((acc, cur) => acc + Number(cur.rating ?? 0), 0) / (lengthTestimonials || 1),
  ).toFixed(1)

  const array = badges({ feedback: lengthTestimonials, rating: averageRating, barters: lengthAllBarters })

  return (
    <div className={cx("w-full flex flex-col gap-2.5", isLoading && "loading-screen")}>
      <article className="w-full grid grid-cols-[5rem_minmax(0,1fr)_1.25rem] gap-5 p-4 items-start rounded-2xl bg-BG-second">
        <div className={cx("relative w-20 h-20 p-10 rounded-2xl", !image && "bg-grey-stroke-light rounded-.625")}>
          {isLoading ? (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl" />
          ) : (
            <>
              {!!image ? (
                <NextImageMotion
                  className="rounded-2xl overflow-hidden w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={image?.attributes?.url}
                  alt="avatar"
                  width={160}
                  height={160}
                  hash={image?.attributes?.blur}
                />
              ) : (
                <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
              )}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 z-10 *:w-5 *:h-5">
                <IconVerifiedTick />
              </div>
            </>
          )}
        </div>
        <section className="w-full flex flex-col gap-4 items-start">
          <div className="w-full gap-1 flex flex-col">
            <h4 className="text-text-primary text-xl font-semibold text-ellipsis line-clamp-1">
              {firstName || "Имя"} {lastName || ""}
            </h4>
            <div className="flex flex-row items-center gap-1.5 justify-start">
              {isOnline ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="7"
                    viewBox="0 0 7 7"
                    fill="none"
                    className="w-[7px] h-[7px] -mb-0.5"
                  >
                    <circle cx="3.5" cy="3.5" r="3.5" fill="#109F5C" />
                  </svg>
                  <span className="text-[0.8125rem] text-text-primary font-normal leading-4">в сети</span>
                </>
              ) : (
                <time className="text-[0.8125rem] leading-4 font-normal text-text-secondary text-center">
                  был(а) {fromNow(updated || new Date())}
                </time>
              )}
            </div>
          </div>
        </section>
        <Link
          href={{
            pathname: `/customer/${id}`,
          }}
          target="_blank"
          className="w-5 h-5 relative p-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5"
          >
            <path
              d="M6.66667 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V6.66667M17.5 6.66667V4.16667C17.5 3.72464 17.3244 3.30072 17.0118 2.98816C16.6993 2.67559 16.2754 2.5 15.8333 2.5H13.3333M13.3333 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V13.3333M2.5 13.3333V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H6.66667"
              stroke="var(--element-grey-light)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-element-grey-light"
            />
          </svg>
        </Link>
      </article>
      <article
        className={cx(
          "w-full rounded-2xl bg-BG-second p-2.5 grid grid-cols-3 gap-2",
          isLoadingTestimonials && "loading-screen",
          "*:py-2 *:rounded-.625 *:px-4 *:flex *:flex-col",
        )}
      >
        {isLoadingTestimonials || isLoading
          ? ["key-asdf", "key-eowpp", "key-s.,dmf"].map((item) => (
              <article key={`::${item}::`} className="w-full gap-2.5 border border-grey-stroke-light border-solid *:w-full">
                <span className="max-w-[66%] h-4 rounded-lg" />
                <span className="max-w-[25%] h-[1.375rem] rounded-[0.6875rem]" />
              </article>
            ))
          : array.map((item) => (
              <article key={`--::key::${item.id}::--`} className="w-full items-start gap-0.5 bg-grey-field">
                <section className="w-full flex flex-row gap-1 items-center [&>svg]:w-3 [&>svg]:h-3">
                  <p className="text-text-primary text-sm font-normal">{item.title}</p>
                  {ICON[item.id]}
                </section>
                <h3 className="text-text-primary text-start text-lg font-semibold">{item.count}</h3>
              </article>
            ))}
      </article>
    </div>
  )
}

PublicProfileUser.displayName = "PublicProfileUser"
export default PublicProfileUser
