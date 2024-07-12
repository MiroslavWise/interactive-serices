import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { type ReactNode, useMemo, useState } from "react"

import { type IResponseThreads } from "@/services/threads/types"
import { EnumStatusBarter, EnumTypeProvider } from "@/types/enum"
import { type IResponseNotifications } from "@/services/notifications/types"
import { type TTypeIconCurrentNotification, type TTypeIconNotification } from "./types/type"

import ButtonsToComplete from "./components/Button"
import { ButtonsDots } from "./components/ButtonsDots"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { Button, ButtonLink, NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"
import {
  deleteThread,
  getBarterId,
  getIdOffer,
  getOffersCategories,
  getTestimonials,
  getUserId,
  patchBarter,
  serviceNotifications,
} from "@/services"
import { cx } from "@/lib/cx"
import { useWebSocket } from "@/context"
import { useAuth, dispatchVisibleNotifications, dispatchAddTestimonials, dispatchModal, EModalData } from "@/store"

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
  const { socket } = useWebSocket() ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []

  const idUser = useMemo(() => {
    if (provider === "offer-pay") {
      const dataTh = data as unknown as IResponseThreads & { emitterId: number; receiverIds: number[] }
      if (dataTh?.emitterId! === userId) {
        return dataTh?.receiverIds[0]
      } else if (dataTh?.receiverIds?.includes(userId!)) {
        return dataTh?.emitterId
      } else if (dataTh?.emitter?.id === userId) {
        return dataTh?.receivers[0]?.id
      } else if (dataTh?.receivers?.some((_) => _?.id === userId)) {
        return dataTh?.emitter?.id
      }
    }
    return null
  }, [provider, data, userId])

  const { data: dataUser } = useQuery({
    queryFn: () => getUserId(idUser!),
    queryKey: ["profile", idUser!],
    enabled: !!idUser,
  })

  const { data: resUser } = dataUser ?? {}
  const { profile } = resUser ?? {}

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
    enabled: !!offerId && ["barter", "offer-pay"].includes(provider),
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
        offer: categories?.find((item) => item?.id === dataOffer?.data?.categoryId),
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
        order: "DESC",
      }),
    queryKey: ["testimonials", { barterId: data?.id, targetId: offerId, provider: EnumTypeProvider.offer, order: "DESC" }],
    enabled:
      ["executed", "destroyed", "completed"]?.includes(data?.status!) &&
      !!offerId &&
      provider === "barter" &&
      ["completion-recall-no", "completion-recall"].includes(operation!),
  })

  const isFeedback = useMemo(() => {
    if (provider === "barter") {
      return dataTestimonials?.data?.some((item) => item?.userId === userId && item?.barterId === data?.id)
    } else {
      return undefined
    }
  }, [userId, data?.id, dataTestimonials?.data, provider])

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
              href={{ pathname: `/customer/${idUser}` }}
              onClick={(event) => {
                event.stopPropagation()
                dispatchVisibleNotifications(false)
              }}
            >
              {profile?.firstName} {profile?.lastName}
            </Link>{" "}
            состоялся?
            {!["completion-survey", "completion-no"].includes(operation!)
              ? " Обмен будет считаться завершенным, когда одна из сторон подтвердит завершение"
              : null}
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
                href={{ pathname: `/customer/${idUser}` }}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVisibleNotifications(false)
                }}
              >
                {profile?.firstName} {profile?.lastName}
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
                href={{ pathname: `/customer/${idUser}` }}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVisibleNotifications(false)
                }}
              >
                {profile?.firstName} {profile?.lastName}
              </Link>{" "}
              подтвердил, что обмен не состоялся. Вы можете рассказать как все прошло в отзывах.
            </p>
          )
        }
      }
      if (operation === "canceled") {
        return (
          <p>
            К сожалению,{" "}
            <span className="font-medium">
              {data?.consigner?.user?.firstName || "Имя"} {data?.consigner?.user?.lastName || "Фамилия"}
            </span>{" "}
            отклонил(а) ваш запрос на обмен «{data?.consigner?.category?.title || "Предложение"}». Давайте попробуем что-то другое!
          </p>
        )
      }
      if (operation === "accepted") {
        return (
          <p>
            Пользователь {profile?.firstName} {profile?.lastName} принял ваш запрос на обмен
          </p>
        )
      }
      if (data?.status === EnumStatusBarter.INITIATED) {
        if (data?.initiator?.userId === userId) {
          return (
            <p>
              Вы предложили обмен{" "}
              <Link
                href={{ pathname: `/customer/${idUser}` }}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVisibleNotifications(false)
                }}
              >
                {profile?.firstName} {profile?.lastName}
              </Link>
            </p>
          )
        } else {
          if (operation === "create" && userId === data?.consigner?.userId) {
            return (
              <p>
                <Link
                  href={{ pathname: `/customer/${idUser}` }}
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatchVisibleNotifications(false)
                  }}
                >
                  {profile?.firstName}
                </Link>{" "}
                предлагает вам <a>{categoryOfferName?.initiator?.title!}</a> взамен на <a>{categoryOfferName?.consigner?.title!}</a>:«
                {data?.initiator?.description!}».
              </p>
            )
          }
        }
      }
    }
    if (provider === "offer-pay") {
      const { firstName } = profile ?? {}
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
  }, [data, provider, userId, profile, categoryOfferName])

  const buttons: ReactNode | null = useMemo(() => {
    if (provider === "offer-pay") {
      if (operation === "create") {
        const dataThread = data as unknown as IResponseThreads

        return (
          <ButtonLink
            type="button"
            typeButton="fill-primary"
            label="Перейти в чат"
            href={{ pathname: `/chat/${dataThread?.id}` }}
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
      if (operation === "canceled") {
        return <ButtonLink href={{ pathname: "/" }} label="Перейти на карту" />
      }
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
        return <ButtonsToComplete refetch={refetch} notification={props} />
      }
      if (operation === "accepted") {
        if (data?.userId !== userId) {
          return (
            <ButtonLink
              type="button"
              typeButton="fill-primary"
              label="Перейти в чат"
              href={
                !!data?.threadId
                  ? {
                      pathname: `/chat/${data?.threadId}`,
                    }
                  : {
                      pathname: `/chat`,
                      query: {
                        "barter-id": `${data?.id}-${idUser}`,
                      },
                    }
              }
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
            return (
              <ButtonLink
                type="button"
                typeButton="fill-primary"
                label="Перейти в чат"
                href={
                  !!data?.threadId
                    ? {
                        pathname: `/chat/${data?.threadId}`,
                      }
                    : {
                        pathname: `/chat`,
                        query: {
                          "barter-id": `${data?.id}-${idUser}`,
                        },
                      }
                }
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchVisibleNotifications(false)
                  reading()
                }}
                data-threads
              />
            )
          }
          if (data.initiator.userId === userId) {
            return (
              <Button
                type="button"
                typeButton="regular-primary"
                label="Отменить"
                loading={loading}
                onClick={(event) => {
                  event.stopPropagation()
                  onCanceledAndDelete()
                }}
              />
            )
          }
        }
      }
    }

    return null
  }, [data, provider, userId, profile, operation, loading, isFeedback, categoryOfferName])

  function reading() {
    if (!read) {
      serviceNotifications.patch({ enabled: true, read: true }, id!).then((response) => {
        if (response.ok) refetch()
      })
    }
  }

  async function onCanceledAndDelete() {
    if (!loading) {
      setLoading(true)
      const { data: dataBarter } = await getBarterId(data?.id!)
      if (dataBarter?.threadId) {
        deleteThread(dataBarter?.threadId!).then(() => {
          socket!?.emit("barter", {
            receiverIds: [dataBarter?.consigner?.userId, dataBarter?.initiator?.userId],
            message: "Удалён чат",
            barterId: dataBarter?.id!,
            emitterId: userId!,
            status: "delete",
            threadId: dataBarter?.threadId!,
            created: new Date(),
          })
        })
      }
      Promise.all([
        serviceNotifications.patch({ enabled: false, read: true }, id),
        patchBarter({ enabled: false, status: EnumStatusBarter.CANCELED }, data?.id),
      ]).then((responses) => {
        refetch()
        setLoading(false)
      })
    }
  }

  function handleRecall() {
    serviceNotifications.patch({ enabled: true, read: true }, id!).then(() => refetch())
    dispatchAddTestimonials({
      user: resUser!,
      barterId: data?.id!,
      testimonials: dataTestimonials?.data!,
      notificationId: id!,
    })
    dispatchModal(EModalData.CompletionTransaction)
    dispatchVisibleNotifications(false)
  }

  const afterUser = useMemo(() => {
    if (provider === "offer-pay") {
      return profile?.image?.attributes?.url ? (
        <NextImageMotion
          className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={profile?.image?.attributes?.url}
          alt="avatar"
          width={44}
          height={44}
        />
      ) : (
        <IconEmptyProfile className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )
    }
    if (["barter", "personal"].includes(currentType!)) {
      const image =
        data?.initiator?.userId === userId
          ? data?.consigner?.user?.image?.attributes?.url
          : data?.consigner?.userId === userId
          ? data?.initiator?.user?.image?.attributes?.url
          : null
      return image ? (
        <NextImageMotion
          className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={image}
          alt="avatar"
          width={44}
          height={44}
        />
      ) : (
        <IconEmptyProfile className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )
    }
    if (["information", "warning", "error"].includes(type)) {
      return (
        <img
          className="absolute w-6 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={IMG_TYPE?.[currentType]!}
          alt="type"
          width={24}
          height={24}
        />
      )
    }
    return null
  }, [userId, currentType, type, profile?.image])

  return (
    <li
      className={cx(
        styles.container,
        "w-full relative p-3 rounded-2xl border border-grey-stroke-light border-solid gap-3 grid grid-cols-[2.5rem_minmax(0,1fr)] bg-BG-second hover:border-text-accent",
      )}
      data-type={type}
      data-active={!read}
    >
      <div
        data-avatar
        className={`relative h-10 w-10 overflow-hidden rounded-[0.625rem] p-5 ${type === "barter" && "bg-grey-stroke-light"}`}
      >
        {afterUser}
      </div>
      <section className="w-full pr-[1.625rem] flex flex-col gap-1">
        <article className="w-full flex flex-col gap-[0.0625rem]">
          {text}
          <time dateTime={created} className="text-text-secondary text-xs text-left font-normal">
            {daysAgo(created!)}
          </time>
          <ButtonsDots
            id={id}
            refetch={refetch}
            disabled={["completion-recall", "completion-recall-no", "completion-survey"].includes(operation!)}
          />
        </article>
        <div data-buttons className="w-fit flex flex-row items-center gap-2">
          {buttons}
        </div>
      </section>
    </li>
  )
}
