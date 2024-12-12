"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { BadgesColors } from "./BadgesColors"
import Button from "@/components/common/Button"
import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import { dayFormat } from "@/helpers"
import { useResize } from "@/helpers"
import { getUserId, getFriends } from "@/services"
import { dispatchActiveServicesFrom, dispatchModal, dispatchMyFriends, dispatchOptionProfileMobile, EModalData, useAuth } from "@/store"

import styles from "./styles/m-container-about-profile.module.scss"

export const MContainerAboutProfile = () => {
  const { isTablet } = useResize()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const {
    data: dataUser,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: res } = dataUser ?? {}
  const { profile } = res ?? {}
  const { image, firstName, lastName, about } = profile ?? {}

  const { data } = useQuery({
    queryFn: () => getFriends({}),
    queryKey: ["friends", { userId: userId, filter: "list" }],
    enabled: !!userId,
  })

  const friends = useMemo(() => {
    return data?.data?.length || 0
  }, [data?.data])

  const geoData = useMemo(() => {
    return dataUser?.data && dataUser?.data?.addresses?.length > 0
      ? dataUser?.data?.addresses?.find((item) => item.addressType === "main")
      : null
  }, [dataUser])

  const categories = (dataUser?.data?.categories || []).length

  function addDesiredService() {
    dispatchActiveServicesFrom(true)
  }

  function handleOpenOption() {
    dispatchOptionProfileMobile(true)
  }

  if (!isTablet) return null

  return (
    <div className={cx(styles.container, "w-full flex flex-col gap-2.5 md:hidden")}>
      <div data-block-profile className="w-full p-4 rounded-2xl flex flex-col gap-4 bg-BG-second">
        <section className="w-full !grid !grid-cols-[5rem_minmax(0,1fr)] gap-4">
          <div
            className={cx(
              "w-20 h-20 rounded-2xl relative p-10",
              (isLoading || isFetching) && "loading-screen !p-0 overflow-hidden *:w-full *:h-full",
              !image && "bg-grey-stroke-light rounded-.625",
            )}
          >
            {isLoading || isFetching ? (
              <span />
            ) : !!image ? (
              <>
                <NextImageMotion
                  className="rounded-2xl overflow-hidden w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={image?.attributes?.url}
                  alt="avatar"
                  width={240}
                  height={240}
                  hash={image?.attributes?.blur}
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 z-10 *:w-5 *:h-5">
                  <IconVerifiedTick />
                </div>
              </>
            ) : (
              <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
            )}
          </div>
          <article className={cx("w-full flex flex-col", isLoading || isFetching ? "loading-screen gap-2.5 *:w-full" : "gap-1.5")}>
            {isLoading || isFetching ? (
              <>
                <span className="h-6 rounded-xl" />
                <span className="max-w-[33%] h-4 rounded-lg" />
              </>
            ) : (
              <>
                <h3 className="text-text-primary text-lg font-semibold">
                  {firstName || "Имя"} {lastName || ""}
                </h3>
                {geoData ? (
                  <p className="text-text-secondary text-[0.8125rem] font-normal line-clamp-2 text-ellipsis leading-4">
                    {geoData?.additional}
                  </p>
                ) : null}
                <time className="text-text-disabled text-xs font-normal" dateTime={`${dataUser?.data?.created!}`}>
                  На Sheira с {dayFormat(dataUser?.data?.created!, "dd.MM.yyyy")}
                </time>
              </>
            )}
          </article>
        </section>
        <section className={cx((isLoading || isFetching) && "loading-screen !flex !flex-col !gap-2.5 *:w-full *:h-4 *:rounded-lg")}>
          {isLoading || isFetching ? (
            <>
              <span />
              <span className="max-w-[60%]" />
            </>
          ) : (
            <p className="text-ellipsis text-text-secondary text-sm font-normal">{about || "Обо мне..."}</p>
          )}
        </section>
        <section className="w-full gap-2.5 items-center !grid !grid-cols-[minmax(0,1fr)_2.25rem] *:rounded-[1.125rem] *:w-full *:h-9 *:border-none *:outline-none">
          <Button
            type="button"
            typeButton="regular-primary"
            label="Редактировать профиль"
            onClick={() => dispatchModal(EModalData.UpdateProfile)}
            data-test="button-open-modal-update-profile"
          />
          <button
            type="button"
            onClick={handleOpenOption}
            data-test="button-open-option"
            className="bg-grey-field relative p-[1.125rem] [&>svg>path]:fill-btn-main-default *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
          >
            <IconDotsHorizontal />
          </button>
        </section>
        <BadgesColors userId={userId!} />
      </div>
      <div data-block-buttons className="w-full flex flex-row gap-2.5">
        <button
          onClick={addDesiredService}
          data-services
          data-test="button-open-modal-add-desired-service"
          className="w-full py-2.5 px-4 flex flex-col justify-between gap-2.5 rounded-xl bg-BG-second"
        >
          <h4 className="text-text-secondary text-sm font-normal">Желаемые услуги</h4>
          <article className="w-full flex flex-row items-center justify-between gap-2.5">
            <h3>{categories || "Добавить"}</h3>
            <img src="/svg/arrow-right.svg" alt="light" width={20} height={20} />
          </article>
        </button>
        <button
          onClick={dispatchMyFriends}
          data-friends
          data-test="button-open-modal-friends"
          className="w-full py-2.5 px-4 flex flex-col justify-between gap-2.5 rounded-xl bg-BG-second"
        >
          <h4 className="text-text-secondary text-sm font-normal">Мои друзья</h4>
          <article className="w-full flex flex-row items-center justify-between gap-2.5">
            <h3>{friends}</h3>
            <img src="/svg/arrow-right.svg" alt="light" width={20} height={20} />
          </article>
        </button>
      </div>
    </div>
  )
}
