import dayjs from "dayjs"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { type ReactNode, useMemo, useState } from "react"

import { IResponseThreads } from "@/services/threads/types"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"
import type { IResponseNotifications } from "@/services/notifications/types"
import type { TTypeIconCurrentNotification, TTypeIconNotification } from "./types/types"

import { ButtonsDots } from "./components/ButtonsDots"
import { Button, ButtonLink, NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"
import { getIdOffer, getProfileUserId, getTestimonials, patchBarter, serviceNotifications } from "@/services"
import { useAuth, dispatchVisibleNotifications, dispatchAddTestimonials, useOffersCategories, dispatchReasonBarters } from "@/store"

import styles from "./styles/style.module.scss"

const IMG_TYPE: Record<TTypeIconCurrentNotification, string> = {
  chat: "/svg/notifications/chat.svg",
  alert: "/svg/notifications/alert-circle.svg",
  barter: "/svg/notifications/repeat.svg",
  sos: "/svg/notifications/sos.svg",
  personal: "/svg/notifications/profile.svg",
  default: "/svg/notifications/default.svg",
}

export const ItemNotification = (props: IResponseNotifications) => {
  const { created, provider, operation, data, id, read } = props ?? {}
  const [loading, setLoading] = useState(false)
  const userId = useAuth(({ userId }) => userId)
  const categories = useOffersCategories(({ categories }) => categories)

  const idUser = useMemo(() => {
    if (provider === "barter") return data?.consigner?.userId === userId ? data?.initiator?.userId : data?.consigner?.userId
    if (provider === "offer-pay") {
      const dataTh = data as unknown as IResponseThreads
      if (dataTh?.emitterId! === userId) {
        return dataTh?.receiverIds[0]
      } else if (dataTh?.receiverIds?.includes(userId!)) {
        return dataTh?.emitterId
      }
    }
    return null
  }, [provider, data, userId])

  const { data: dataProfile } = useQuery({
    queryFn: () => getProfileUserId(idUser!),
    queryKey: ["profile", idUser!],
    enabled: !!idUser,
  })

  const { refetch } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: false,
  })

  const offerId: number | null = useMemo(() => {
    if (!data || !userId) {
      return null
    }
    if (provider === "barter") {
      if (Number(data?.initiator?.userId!) === Number(userId)) {
        return Number(data?.consignedId!)
      } else {
        return Number(data?.initialId!)
      }
    }

    if (provider === "offer-pay") {
      const dataTh = data as unknown as IResponseThreads
      return dataTh?.offerId!
    }

    return null
  }, [data, userId, provider])

  const { data: dataOffer } = useQuery({
    queryFn: () => getIdOffer(offerId!),
    queryKey: ["offers", { offerId: offerId }],
    enabled: !!offerId && provider === "offer-pay",
  })

  const categoryOfferName = useMemo(() => {
    if (!data || !categories?.length) {
      return null
    }

    if (provider === "barter") {
      return {
        initiator: categories?.find((item) => item?.id === data?.initiator?.categoryId),
        consigner: categories?.find((item) => item?.id === data?.consigner?.categoryId),
      }
    }

    if (provider === "offer-pay") {
      return {
        offer: categories?.find((item) => item?.id === dataOffer?.res?.categoryId),
      }
    }

    return null
  }, [categories, data, provider, dataOffer])

  const { data: dataTestimonials } = useQuery({
    queryFn: () =>
      getTestimonials({
        target: offerId!,
        provider: EnumTypeProvider.offer,
        barter: data?.id!,
      }),
    queryKey: ["testimonials", { barterId: data?.id, targetId: offerId, provider: EnumTypeProvider.offer }],
    enabled:
      ["executed", "destroyed", "completed"]?.includes(data?.status!) &&
      !!offerId &&
      provider === "barter" &&
      ["completion-recall-no", "completion-recall"].includes(operation!),
  })

  const isFeedback = useMemo(() => {
    if (provider === "barter") {
      return dataTestimonials?.res?.some((item) => item?.userId === userId && item?.barterId === data?.id)
    } else {
      return undefined
    }
  }, [userId, data?.id, dataTestimonials?.res, provider])

  const type: TTypeIconNotification = useMemo(() => {
    switch (provider) {
      case "barter":
        return "barter"
      case "offer-pay":
        return "barter"
      default:
        return "barter"
    }
  }, [provider])

  const currentType: TTypeIconCurrentNotification = useMemo(() => {
    switch (provider) {
      case "barter":
        return "barter"
      case "offer-pay":
        return "personal"
      default:
        return "default"
    }
  }, [provider])

  const text: ReactNode | string | null = useMemo(() => {
    if (provider === "barter") {
      if (["completion-yes", "completion-survey", "completion-no"].includes(operation!)) {
        return (
          <p>
            Расскажите, обмен с пользователем{" "}
            <Link
              href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
              onClick={(event) => {
                event.stopPropagation()
                dispatchVisibleNotifications(false)
              }}
            >
              {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
            </Link>{" "}
            состоялся? Обмен будет считаться завершенным, когда одна из сторон подтвердит завершение
          </p>
        )
      }
      if (["feedback-received", "completion-recall"].includes(operation!)) {
        if (data?.updatedById === userId) {
          return <p>Вы подтвердили, что обмен состоялся. Здорово! Вы можете рассказать как все прошло в отзывах.</p>
        } else {
          return (
            <p>
              Пользователь{" "}
              <Link
                href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVisibleNotifications(false)
                }}
              >
                {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
              </Link>{" "}
              подтвердил, что обмен состоялся. Здорово! Вы можете рассказать как все прошло в отзывах.
            </p>
          )
        }
      }
      if (["feedback-received-no", "completion-recall-no"].includes(operation!)) {
        if (data?.updatedById === userId) {
          return <p>Вы не подтвердили, что обмен состоялся. Вы можете рассказать как все прошло в отзывах.</p>
        } else {
          return (
            <p>
              Пользователь{" "}
              <Link
                href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVisibleNotifications(false)
                }}
              >
                {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
              </Link>{" "}
              подтвердил, что обмен не состоялся. Вы можете рассказать как все прошло в отзывах.
            </p>
          )
        }
      }
      if (operation === "accepted") {
        return (
          <p>
            Пользователь {dataProfile?.res?.firstName} {dataProfile?.res?.lastName} принял ваш запрос на обмен
          </p>
        )
      }
      if (data?.status === EnumStatusBarter.INITIATED) {
        if (data?.initiator?.userId === userId) {
          return (
            <p>
              Вы предложили обмен{" "}
              <Link
                href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVisibleNotifications(false)
                }}
              >
                {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
              </Link>
            </p>
          )
        } else {
          if (operation === "create" && userId === data?.consigner?.userId) {
            return (
              <p>
                <Link
                  href={{ pathname: "/user", query: { id: dataProfile?.res?.userId! } }}
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchVisibleNotifications(false)
                  }}
                >
                  {dataProfile?.res?.firstName}
                </Link>{" "}
                предлагает вам <a>{categoryOfferName?.initiator?.title!}</a> взамен на <a>{categoryOfferName?.consigner?.title!}</a>:«
                {data?.initiator?.title!}».
              </p>
            )
          }
        }
      }
    }
    if (provider === "offer-pay") {
      const { image, firstName, lastName } = dataProfile?.res ?? {}
      // const dataThread = data as unknown as IResponseThreads
      const { title } = categoryOfferName?.offer ?? {}
      if (operation === "create") {
        return (
          <p>
            <a>{firstName}</a> предлагает оплатить вашу услугу: «{title}». Договоритесь о цене и условиях оплаты в чате
          </p>
        )
      }
    }

    return null
  }, [data, provider, userId, dataProfile, categoryOfferName])

  const buttons: ReactNode | null = useMemo(() => {
    if (provider === "offer-pay") {
      if (operation === "create") {
        const dataThread = data as unknown as IResponseThreads
        const chat = { thread: dataThread?.id }

        return (
          <ButtonLink
            type="button"
            typeButton="fill-primary"
            label="Перейти в чат"
            href={{ pathname: `/messages`, query: chat }}
            onClick={(event) => {
              event.stopPropagation()
              dispatchVisibleNotifications(false)
              reading()
            }}
            data-threads
          />
        )
      }
    }

    if (provider === "barter") {
      if (operation === "completion-yes") {
        return (
          <span data-operation={operation}>
            <div data-img>
              <img src="/svg/check-primary.svg" alt="check" width={16} height={16} />
            </div>{" "}
            Обмен состоялся
          </span>
        )
      }
      if (operation === "completion-no") {
        return (
          <span data-operation={operation}>
            <div data-img>
              <img src="/svg/x-red.svg" alt="check" width={16} height={16} />
            </div>{" "}
            Обмен не состоялся
          </span>
        )
      }
      if (operation === "feedback-received") {
        return (
          <span data-operation={operation}>
            <div data-img>
              <img src="/svg/check-primary.svg" alt="check" width={16} height={16} />
            </div>{" "}
            Вы оставили отзыв
          </span>
        )
      }
      if (
        ["completion-recall", "completion-recall-no"].includes(operation!) &&
        [EnumStatusBarter.COMPLETED, EnumStatusBarter.DESTROYED].includes(data?.status!) &&
        typeof isFeedback !== "undefined" &&
        isFeedback === false
      ) {
        return <Button type="button" typeButton="fill-primary" label="Написать отзыв" onClick={handleRecall} />
      }
      if (["completion-survey"].includes(operation!) && ["completed", "executed", "destroyed"].includes(data?.status!)) {
        return (
          <>
            <Button
              type="button"
              typeButton="fill-primary"
              label="Да"
              onClick={(event) => {
                event.stopPropagation()
                handleCompletion(true)
              }}
              loading={loading}
              data-yes-or-not
            />
            <Button
              type="button"
              typeButton="regular-primary"
              label="Нет"
              onClick={(event) => {
                event.stopPropagation()
                handleCompletion(false)
                reading()
              }}
              loading={loading}
              data-yes-or-not
            />
          </>
        )
      }
      if (operation === "accepted") {
        if (data?.userId !== userId) {
          const chat = data?.threadId ? { thread: data?.threadId } : { "barter-id": `${data?.id!}-${idUser}` }

          return (
            <ButtonLink
              type="button"
              typeButton="fill-primary"
              label="Перейти в чат"
              href={{ pathname: `/messages`, query: chat }}
              onClick={(event) => {
                event.stopPropagation()
                dispatchVisibleNotifications(false)
                reading()
              }}
              data-threads
            />
          )
        }
      }
      if (operation === "create") {
        if (data?.status === EnumStatusBarter.INITIATED) {
          if (userId === data?.consigner?.userId) {
            const chat = data?.threadId ? { thread: data?.threadId } : { "barter-id": `${data?.id!}-${idUser}` }
            return (
              <ButtonLink
                type="button"
                typeButton="fill-primary"
                label="Перейти в чат"
                href={{ pathname: `/messages`, query: chat }}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVisibleNotifications(false)
                  reading()
                }}
                data-threads
              />
            )
          }
        }
      }
    }

    return null
  }, [data, provider, userId, dataProfile, operation, loading, isFeedback, categoryOfferName])

  function reading() {
    if (!read) {
      serviceNotifications.patch({ enabled: true, read: true }, id!).then((response) => {
        if (response.ok) refetch()
      })
    }
  }

  function handleCompletion(value: boolean) {
    if (!loading) {
      if (value) {
        setLoading(true)
        Promise.all([
          // serviceNotifications.patch({ enabled: true, operation: "completion-yes", read: true }, id!),
          patchBarter({ enabled: true, status: EnumStatusBarter.COMPLETED }, data?.id!),
        ]).then(() => {
          refetch().then(() => {
            setLoading(false)
          })
        })
      } else {
        dispatchReasonBarters({
          visible: true,
          notificationId: id!,
          barterId: data?.id!,
        })
        dispatchVisibleNotifications(false)
      }
    }
  }

  function handleRecall() {
    serviceNotifications.patch({ enabled: true, read: true }, id!).then(() => refetch())
    dispatchAddTestimonials({
      visible: true,
      profile: dataProfile?.res!,
      threadId: data?.threadId!,
      barterId: data?.id!,
      testimonials: dataTestimonials?.res!,
      notificationId: id!,
    })
    dispatchVisibleNotifications(false)
  }

  return (
    <li className={styles.container} data-type={type} data-active={!read}>
      <div data-avatar>
        {["barter", "personal"].includes(currentType!) ? (
          <NextImageMotion src={dataProfile?.res?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
        ) : ["information", "warning", "error"].includes(type) ? (
          <img src={IMG_TYPE?.[currentType]!} alt="type" width={24} height={24} />
        ) : null}
      </div>
      <section>
        <article>
          {text}
          <time dateTime={created}>{daysAgo(dayjs(created).format()!)} назад</time>
          <ButtonsDots
            id={id}
            refetch={refetch}
            disabled={["completion-recall", "completion-recall-no", "completion-survey"].includes(operation!)}
          />
        </article>
        <div data-buttons>{buttons}</div>
      </section>
    </li>
  )
}
