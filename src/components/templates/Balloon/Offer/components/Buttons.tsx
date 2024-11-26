import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState, type ReactNode } from "react"

import { EnumStatusBarter } from "@/types/enum"
import { type IPostThreads } from "@/services/threads/types"
import { EnumProviderThreads, EnumSign } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import Button from "@/components/common/Button"

import { cx } from "@/lib/cx"
import { getBarters, postThread } from "@/services"
import { providerIsAscending } from "@/lib/sortIdAscending"
import { dispatchAuthModal, dispatchHasBalloon, dispatchModalClose, dispatchReciprocalExchange, useAuth } from "@/store"

function Buttons({ offer, children }: { offer: IResponseOffers; children: ReactNode }) {
  const { id, urgent } = offer ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { push, prefetch } = useRouter()
  const [loadingChat, setLoadingChat] = useState(false)

  function handle() {
    if (!userId) {
      return dispatchAuthModal({
        visible: true,
        type: EnumSign.SignIn,
      })
    } else if (!!userId && userId !== offer?.userId) {
      return dispatchReciprocalExchange({
        visible: true,
        offer: offer!,
        type: "current",
      })
    }
  }

  function handlePay() {
    if (!userId) {
      dispatchAuthModal({
        visible: true,
        type: EnumSign.SignIn,
      })
      return
    } else if (!!userId && userId !== offer?.userId) {
      prefetch(`/chat?offer-pay=${offer?.id}:${offer?.userId}`)
      push(`/chat?offer-pay=${offer?.id}:${offer?.userId}`)
      dispatchModalClose()
      closeHasBalloons()
      return
    }
  }

  const { data: dataExecutedBarter, isLoading: isLoadingExecutedBarter } = useQuery({
    queryFn: () =>
      getBarters({
        status: EnumStatusBarter.EXECUTED,
        user: userId!,
        order: "DESC",
      }),
    queryKey: ["barters", { userId: userId, status: EnumStatusBarter.EXECUTED }],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!userId && !!offer && userId !== offer?.userId,
  })
  const { data: dataInitiatedBarter, isLoading: isLoadingInitiatedBarter } = useQuery({
    queryFn: () =>
      getBarters({
        status: EnumStatusBarter.INITIATED,
        user: userId!,
        order: "DESC",
      }),
    queryKey: ["barters", { userId: userId, status: EnumStatusBarter.INITIATED }],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!userId && !!offer && userId !== offer?.userId,
  })
  //--

  const disabledReply = useMemo(() => {
    if (isLoadingExecutedBarter || isLoadingInitiatedBarter) return false
    const findExecuted = dataExecutedBarter?.data?.some((some) => some?.initiator?.id === id || some?.consigner?.id === id)
    if (findExecuted)
      return "В настоящий момент у вас идет обмен с данным пользователем. Когда он закончится, вы сможете создать новое предложение обмена"
    const findInitiated = dataInitiatedBarter?.data?.some((some) => some?.initiator?.id === id || some?.consigner?.id === id)
    if (findInitiated) return "Вы уже отправили данному пользователю свое предложение"
  }, [isLoadingExecutedBarter, isLoadingInitiatedBarter, dataExecutedBarter?.data, dataInitiatedBarter?.data, id])

  async function openUserChat() {
    if (!loadingChat) {
      setLoadingChat(true)
      const provider = providerIsAscending({
        type: EnumProviderThreads.HELP,
        ids: [userId!, offer.userId, offer.id!],
      })!

      const data_: IPostThreads = {
        title: provider,
        receiverIds: [offer.userId],
        provider: EnumProviderThreads.HELP,
        offerId: offer.id!,
        enabled: true,
      }
      const { res } = await postThread(data_)
      push(`/chat/${res?.id}`)
      dispatchModalClose()
      closeHasBalloons()
      setLoadingChat(false)
    }
  }

  const closeHasBalloons = () => dispatchHasBalloon({ visibleHasBalloon: false })

  return (
    <>
      {disabledReply && !isLoadingExecutedBarter && !isLoadingInitiatedBarter && userId !== offer?.userId ? (
        <div className="w-full px-5">
          <article className="w-full p-4 rounded-2xl border border-solid border-grey-stroke">
            <span className="text-text-primary text-sm text-start font-normal">{disabledReply}</span>
          </article>
        </div>
      ) : null}
      {children}
      {!!urgent ? (
        !!userId ? (
          <div className="w-full px-5">
            <Button
              type="button"
              className={cx("w-full h-11", (!userId || userId === offer.userId) && "!opacity-50 !cursor-no-drop")}
              typeButton="fill-primary"
              label="Написать сообщение"
              loading={loadingChat}
              onClick={(event) => {
                event.stopPropagation()
                if (!!userId && userId !== offer.userId) {
                  openUserChat()
                }
              }}
            />
          </div>
        ) : (
          <div className="w-full px-5 pt-5 flex items-center overflow-hidden border-t border-solid border-grey-stroke-light">
            <p className="w-full text-center text-sm font-medium">
              <span
                className="text-text-accent cursor-pointer"
                onClick={() => {
                  dispatchAuthModal({
                    visible: true,
                    type: EnumSign.SignUp,
                  })
                }}
              >
                Войдите в аккаунт
              </span>
              , чтобы написать сообщение
            </p>
          </div>
        )
      ) : (
        <div data-buttons className="w-full flex flex-row items-center gap-2.5 *:md:h-11 *:md:rounded-[1.375rem]">
          <Button
            type="button"
            typeButton="fill-primary"
            label="Откликнуться"
            onClick={(event) => {
              event.stopPropagation()
              handle()
            }}
            loading={isLoadingExecutedBarter || isLoadingInitiatedBarter}
            disabled={(!!userId && userId === offer?.userId) || !!disabledReply}
          />
          <Button
            type="button"
            typeButton="regular-primary"
            label="Заплатить"
            onClick={handlePay}
            disabled={!!userId && userId === offer?.userId}
          />
          {userId && userId !== offer?.userId ? (
            <Link
              className="relative w-9 p-[1.125rem] rounded-[1.125rem] md:w-11 md:p-[1.375rem] bg-[var(--btn-second-default)]"
              data-circle
              href={{ pathname: "/chat", query: { user: offer?.userId } }}
              onClick={() => {
                dispatchModalClose()
                closeHasBalloons()
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1/2 left-1/2 w-6 h-6 -translate-y-1/2 -translate-x-1/2"
              >
                <g id="message-dots-circle">
                  <path
                    id="Solid"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.0001 1.66699C5.39771 1.66699 1.66675 5.39795 1.66675 10.0003C1.66675 11.1073 1.88302 12.1657 2.27638 13.1343C2.31191 13.2218 2.33235 13.2723 2.34635 13.3096L2.35061 13.3211L2.35008 13.3251C2.34591 13.3558 2.33902 13.3978 2.32568 13.4778L1.82753 16.4666C1.80518 16.6005 1.78017 16.7502 1.77035 16.8803C1.75965 17.0221 1.75592 17.2477 1.85819 17.4862C1.98461 17.7809 2.21949 18.0158 2.51425 18.1422C2.75268 18.2445 2.9783 18.2408 3.12012 18.2301C3.25019 18.2202 3.39996 18.1952 3.53382 18.1729L6.52262 17.6747C6.60266 17.6614 6.64457 17.6545 6.67533 17.6503L6.67929 17.6498L6.6908 17.6541C6.7281 17.6681 6.7786 17.6885 6.86609 17.724C7.83466 18.1174 8.89315 18.3337 10.0001 18.3337C14.6025 18.3337 18.3334 14.6027 18.3334 10.0003C18.3334 5.39795 14.6025 1.66699 10.0001 1.66699ZM5.00008 10.0003C5.00008 9.30997 5.55973 8.75033 6.25008 8.75033C6.94044 8.75033 7.50008 9.30997 7.50008 10.0003C7.50008 10.6907 6.94044 11.2503 6.25008 11.2503C5.55973 11.2503 5.00008 10.6907 5.00008 10.0003ZM8.75008 10.0003C8.75008 9.30997 9.30973 8.75033 10.0001 8.75033C10.6904 8.75033 11.2501 9.30997 11.2501 10.0003C11.2501 10.6907 10.6904 11.2503 10.0001 11.2503C9.30973 11.2503 8.75008 10.6907 8.75008 10.0003ZM13.7501 8.75033C13.0597 8.75033 12.5001 9.30997 12.5001 10.0003C12.5001 10.6907 13.0597 11.2503 13.7501 11.2503C14.4404 11.2503 15.0001 10.6907 15.0001 10.0003C15.0001 9.30997 14.4404 8.75033 13.7501 8.75033Z"
                    fill="#6656db"
                    className="fill-[#6656db]"
                  />
                </g>
              </svg>
            </Link>
          ) : null}
        </div>
      )}
    </>
  )
}

Buttons.displayName = "Buttons"
export default Buttons

// <Button
//   type="button"
//   className="w-full h-11"
//   typeButton="fill-primary"
//   label="Войти"
//   onClick={() => dispatchAuthModal({ visible: true, type: EnumSign.SignIn })}
// />
