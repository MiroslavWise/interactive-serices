"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { BadgesColors } from "./BadgesColors"
import { Button, NextImageMotion } from "@/components/common"

import { dayFormat } from "@/helpers"
import { getProfileUserId, getUserId, serviceFriends } from "@/services"
import { dispatchActiveServicesFrom, dispatchOptionProfileMobile, dispatchUpdateProfile, useAuth, useDroverFriends } from "@/store"

import styles from "./styles/m-container-about-profile.module.scss"

export const MContainerAboutProfile = () => {
  const userId = useAuth(({ userId }) => userId)
  const dispatchFriends = useDroverFriends(({ dispatchFriends }) => dispatchFriends)

  const { data: dataUser } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: dataProfile } = useQuery({
    queryFn: () => getProfileUserId(userId!),
    queryKey: ["profile", userId!],
    enabled: !!userId,
  })

  const { data } = useQuery({
    queryFn: () => serviceFriends.get(),
    queryKey: ["friends", `user=${userId}`, `filter=list`],
    enabled: !!userId,
  })

  const friends = useMemo(() => {
    return data?.res?.length || 0
  }, [data?.res])

  const geoData = useMemo(() => {
    return dataUser?.res && dataUser?.res?.addresses?.length > 0
      ? dataUser?.res?.addresses?.find((item) => item.addressType === "main")
      : null
  }, [dataUser])

  const categories = (dataUser?.res?.categories || []).length

  function addDesiredService() {
    dispatchActiveServicesFrom(true)
  }

  function handleOpenOption() {
    dispatchOptionProfileMobile(true)
  }

  function handleOpen() {
    dispatchFriends({ visible: true })
  }

  return (
    <div className={styles.container}>
      <div data-block-profile>
        <section data-profile>
          <div data-img={!!dataProfile?.res?.image?.attributes?.url!}>
            <NextImageMotion src={dataProfile?.res?.image?.attributes?.url!} alt="avatar" width={80} height={80} />
            {!!dataUser?.res?.profile?.image?.attributes?.url ? (
              <img data-absolute src="/svg/verified-tick.svg" alt="tick" width={32} height={32} />
            ) : null}
          </div>
          <article>
            <h3>
              {dataProfile?.res?.firstName || "Имя"} {dataProfile?.res?.lastName || "Фамилия"}
            </h3>
            {geoData ? <p>{geoData?.additional}</p> : null}
            <time dateTime={`${dataUser?.res?.created!}`}>На Sheira с {dayFormat(dataUser?.res?.created!, "dd.MM.yyyy")}</time>
          </article>
        </section>
        <section data-about>
          <p>{dataProfile?.res?.about || "Обо мне..."}</p>
        </section>
        <section data-buttons>
          <Button type="button" typeButton="regular-primary" label="Редактировать профиль" onClick={() => dispatchUpdateProfile(true)} />
          <button type="button" data-circle onClick={handleOpenOption}>
            <img src="/svg/accent-dots.svg" alt="..." width={16} height={16} />
          </button>
        </section>
        <BadgesColors userId={userId!} />
      </div>
      <div data-block-buttons>
        <button onClick={addDesiredService} data-services>
          <h4>Желаемые услуги</h4>
          <article>
            <h3>{categories || "Добавить"}</h3>
            <img src="/svg/arrow-right.svg" alt="light" width={20} height={20} />
          </article>
        </button>
        <button onClick={handleOpen} data-friends>
          <h4>Мои друзья</h4>
          <article>
            <h3>{friends}</h3>
            <img src="/svg/arrow-right.svg" alt="light" width={20} height={20} />
          </article>
        </button>
      </div>
    </div>
  )
}
