import { memo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumProviderThreads, EnumStatusBarter } from "@/types/enum"
import { type IResponseThread } from "@/services/threads/types"

import IconReAccent from "@/components/icons/IconReAccent"
import { Button, NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import { useWebSocket } from "@/context"
import { getBarterId, patchBarter } from "@/services"
import { dispatchOpenCancelExchange, useAuth } from "@/store"
import { userInterlocutor } from "@/helpers/user-interlocutor"

function ExchangeStatus({ thread, isLoading }: { thread: IResponseThread; isLoading: boolean }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)
  const barterId = thread?.provider === EnumProviderThreads.BARTER ? thread?.barterId : null
  const { socket } = useWebSocket()
  const {
    data: dataBarter,
    isLoading: isLoadingBarter,
    isFetching: isFetchingBarter,
    refetch: refetchBarters,
  } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: !!barterId,
    refetchOnMount: true,
  })
  const { data: dataB } = dataBarter ?? {}
  const user = userInterlocutor({ m: thread?.emitter!, r: thread?.receivers!, userId: userId! })

  function handleAccept() {
    if (!loading) {
      setLoading(true)
      patchBarter({ status: EnumStatusBarter.EXECUTED }, barterId!).then((response) => {
        if (response.ok) {
          const date = new Date()
          const receiverIds = [Number(user?.id)]
          const message = `Пользователь ${user?.username} согласился принять ваш запрос на обмен!`
          socket!?.emit("barter", {
            receiverIds: receiverIds,
            message: message,
            barterId: barterId!,
            emitterId: userId!,
            status: "accepted",
            threadId: thread?.id!,
            created: date,
          })
          refetchBarters().then(() => {
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
    }
  }

  if (thread?.provider === EnumProviderThreads.PERSONAL) return null
  if (isLoadingBarter || isLoading)
    return (
      <div className="loading-screen w-full bg-BG-second mb-auto md:px-5 md:py-3 flex flex-col md:grid md:justify-between md:grid-cols-[minmax(0,1fr)_9.375rem] gap-2.5 border-b border-solid border-grey-stroke-light">
        <article className="w-full flex flex-col items-start justify-center md:max-w-[22.0625rem] gap-2.5 *:w-full *:h-4 *:rounded-lg">
          <span className="max-w-[33%]" />
          <span />
          <span />
        </article>
        <article className="w-full flex flex-row md:flex-col gap-2.5 *:w-full *:h-9 *:rounded-[1.125rem]">
          <span />
          <span />
        </article>
      </div>
    )

  const { initiator, consigner, status, id } = dataB ?? {}

  if (thread?.provider === EnumProviderThreads.BARTER)
    return (
      <div
        className={cx(
          "mb-auto w-full md:grid flex flex-col gap-2.5 py-2.5 md:py-3 px-3 md:px-5 shadow-box-down bg-BG-second",
          [EnumStatusBarter.EXECUTED, EnumStatusBarter.COMPLETED, EnumStatusBarter.DESTROYED].includes(status!)
            ? "md:grid-cols-[minmax(0,1fr)]"
            : "md:grid-cols-[minmax(0,1fr)_9.375rem]",
        )}
      >
        <div className="w-full flex flex-col gap-2.5 md:gap-2">
          <p
            className={cx(
              "text-sm text-left line-clamp-1 text-ellipsis",
              EnumStatusBarter.DESTROYED === status ? "text-text-error" : "text-text-secondary",
            )}
          >
            {[EnumStatusBarter.INITIATED].includes(status!)
              ? initiator?.userId === userId
                ? `Вы предлагаете`
                : `${consigner?.user?.firstName || "Имя"} предлагает`
              : EnumStatusBarter.EXECUTED === status
              ? `В процессе`
              : EnumStatusBarter.COMPLETED === status
              ? `Обмен завершён`
              : EnumStatusBarter.DESTROYED === status
              ? `Обмен не состоялся`
              : null}
          </p>
          <div className="w-full flex flex-col gap-1 *:w-full *:gap-[0.4375rem] *:items-center">
            <article className="flex flex-row items-center flex-nowrap">
              <div className="w-6 h-6 p-3 relative rounded-full overflow-hidden *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2">
                {!!initiator?.user?.image ? (
                  <NextImageMotion
                    className="overflow-hidden w-6 h-6"
                    src={initiator?.user?.image?.attributes?.url}
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                ) : (
                  <IconEmptyProfile className="w-4 h-4" />
                )}
              </div>
              <p className="text-text-primary text-sm text-center font-normal whitespace-nowrap w-min line-clamp-1 text-ellipsis">
                {initiator?.category?.title}
              </p>
              <div
                className={cx(
                  "relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-3 *:h-3",
                  EnumStatusBarter.EXECUTED === status
                    ? "w-5 h-5 p-2.5 rounded-full bg-[#FEA032] [&>svg>g>path]:!stroke-element-white"
                    : "w-4 h-4 p-2",
                )}
              >
                <IconReAccent />
              </div>
            </article>
            <article className="grid grid-cols-[1.5rem_minmax(0,1fr)]">
              <div className="w-6 h-6 p-3 relative rounded-full overflow-hidden *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2">
                {!!consigner?.user?.image ? (
                  <NextImageMotion
                    className="overflow-hidden w-6 h-6"
                    src={consigner?.user?.image?.attributes?.url}
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                ) : (
                  <IconEmptyProfile className="w-4 h-4" />
                )}
              </div>
              <p className="text-text-primary text-sm text-center font-normal whitespace-nowrap w-min line-clamp-1 text-ellipsis">
                {consigner?.category?.title}
              </p>
            </article>
          </div>
        </div>
        <div
          className={cx(
            "w-full flex flex-row md:flex-col justify-end *:h-9 *:rounded-[1.125rem] gap-2",
            [EnumStatusBarter.EXECUTED, EnumStatusBarter.COMPLETED, EnumStatusBarter.DESTROYED].includes(status!) ||
              (EnumStatusBarter.INITIATED === status! && consigner?.userId !== userId)
              ? "hidden"
              : "",
          )}
        >
          {EnumStatusBarter.INITIATED === status! && consigner?.userId === userId ? (
            <>
              <Button
                type="button"
                typeButton="fill-primary"
                label="Принять"
                loading={isFetchingBarter || loading}
                onClick={handleAccept}
              />
              <Button
                type="button"
                typeButton="regular-primary"
                label="Отказаться"
                loading={isFetchingBarter || loading}
                onClick={() => {
                  dispatchOpenCancelExchange({ barterId: barterId!, threadId: thread?.id! })
                }}
              />
            </>
          ) : null}
        </div>
      </div>
    )

  return null
}

export default memo(ExchangeStatus)
