"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { BadgesColors } from "./BadgesColors"
import { Button, NextImageMotion } from "@/components/common"

import { dayFormat } from "@/helpers"
import { getUserId, getFriends } from "@/services"
import { dispatchActiveServicesFrom, dispatchModal, dispatchOptionProfileMobile, EModalData, useAuth, useDroverFriends } from "@/store"

import styles from "./styles/m-container-about-profile.module.scss"

export const MContainerAboutProfile = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const dispatchFriends = useDroverFriends(({ dispatchFriends }) => dispatchFriends)

  const { data: dataUser } = useQuery({
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

  function handleOpen() {
    dispatchFriends({ visible: true })
  }

  return (
    <div className={styles.container}>
      <div data-block-profile>
        <section data-profile>
          <div data-img={!!image?.attributes?.url!}>
            <NextImageMotion src={image?.attributes?.url!} alt="avatar" width={80} height={80} />
            {!!image?.attributes?.url ? <img data-absolute src="/svg/verified-tick.svg" alt="tick" width={32} height={32} /> : null}
          </div>
          <article>
            <h3>
              {firstName || "Имя"} {lastName || "Фамилия"}
            </h3>
            {geoData ? <p>{geoData?.additional}</p> : null}
            <time dateTime={`${dataUser?.data?.created!}`}>На Sheira с {dayFormat(dataUser?.data?.created!, "dd.MM.yyyy")}</time>
          </article>
        </section>
        <section data-about>
          <p>{about || "Обо мне..."}</p>
        </section>
        <section data-buttons>
          <Button
            type="button"
            typeButton="regular-primary"
            label="Редактировать профиль"
            onClick={() => dispatchModal(EModalData.UpdateProfile)}
            data-test="button-open-modal-update-profile"
          />
          <button type="button" data-circle onClick={handleOpenOption} data-test="button-open-option">
            <img src="/svg/accent-dots.svg" alt="..." width={16} height={16} />
          </button>
        </section>
        <BadgesColors userId={userId!} />
      </div>
      <div data-block-buttons>
        <button onClick={addDesiredService} data-services data-test="button-open-modal-add-desired-service">
          <h4>Желаемые услуги</h4>
          <article>
            <h3>{categories || "Добавить"}</h3>
            <img src="/svg/arrow-right.svg" alt="light" width={20} height={20} />
          </article>
        </button>
        <button onClick={handleOpen} data-friends data-test="button-open-modal-friends">
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
