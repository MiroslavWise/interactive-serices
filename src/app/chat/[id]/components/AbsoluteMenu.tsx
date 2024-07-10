import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { EnumProviderThreads } from "@/types/enum"
import { type IResponseThread } from "@/services/threads/types"

import IconBlock from "@/components/icons/IconBlock"
import IconProfile from "@/components/icons/IconProfile"
import IconComplaint from "@/components/icons/IconComplaint"
import IconTrashBlack from "@/components/icons/IconTrashBlack"
import IconDefaultOffer from "@/components/icons/IconDefaultOffer"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import { getBarterId, getIdOffer } from "@/services"
import { useOutsideClickEvent } from "@/helpers"
import { userInterlocutor } from "@/helpers/user-interlocutor"
import { dispatchBallonOffer, dispatchComplaintModalUser, dispatchOpenDeleteChat, useAuth } from "@/store"

function AbsoluteMenu({ thread }: { thread: IResponseThread }) {
  const [open, set, ref] = useOutsideClickEvent()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const user = userInterlocutor({ m: thread?.emitter!, r: thread?.receivers!, userId: userId! })

  const barterId = thread?.provider === EnumProviderThreads.BARTER ? thread?.barterId : null
  const offerId = thread?.provider === EnumProviderThreads.OFFER_PAY ? thread?.offerId : null

  const { data: dataBarter } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: !!barterId,
  })
  const { data: dataOffer } = useQuery({
    queryFn: () => getIdOffer(thread?.offerId!),
    queryKey: ["offers", { offerId: thread?.offerId! }],
    enabled: !!offerId,
  })

  const { data: dataB } = dataBarter ?? {}
  const { data: dataO } = dataOffer ?? {}

  const offer = user?.id === dataB?.consigner?.userId ? dataB?.consigner : user?.id === dataB?.initiator?.userId ? dataB?.initiator : null

  function onComplaint() {
    dispatchComplaintModalUser({
      user: {
        about: user?.about ?? "",
        birthdate: null,
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        image: user?.image!,
        username: user?.username ?? "",
        id: user?.id!,
        gender: user?.gender!,
      },
    })
  }

  return (
    <button
      type="button"
      className="[&>svg>path]:fill-text-primary z-20"
      ref={ref}
      onClick={(event) => {
        event.stopPropagation()
        set((_) => !_)
      }}
    >
      <IconDotsHorizontal />
      <article
        className={cx(
          "absolute top-full md:top-[calc(100%_+_0.625rem)] right-1 md:-right-2.5 shadow-menu-absolute p-3 flex flex-col gap-0.5 bg-BG-second w-fit min-w-60 rounded-xl",
          "*:py-2 *:gap-2.5 *:grid *:grid-cols-[1.25rem_minmax(0,1fr)] *:px-1.5 *:rounded-md hover:*:bg-grey-field",
          "[&>a>div]:w-5 [&>a>div]:h-5 [&>a>div]:relative [&>a>div]:p-2.5",
          "[&>a>div>svg]:absolute [&>a>div>svg]:top-1/2 [&>a>div>svg]:left-1/2 [&>a>div>svg]:-translate-x-1/2 [&>a>div>svg]:-translate-y-1/2 [&>a>div>svg]:w-5 [&>a>div>svg]:h-5",
          "[&>a>span]:whitespace-nowrap [&>a>span]:text-text-primary [&>a>span]:text-sm [&>a>span]:text-left [&>a>span]:font-normal",
          open ? " opacity-100 visible z-50" : "opacity-0 invisible -z-10",
        )}
      >
        <Link href={{ pathname: `/customer/${user?.id!}` }}>
          <div>
            <IconProfile />
          </div>
          <span>Перейти в профиль</span>
        </Link>
        {!!dataB ? (
          <a
            onClick={(event) => {
              event.stopPropagation()
              dispatchBallonOffer({ offer: offer! })
            }}
          >
            <div>
              <IconDefaultOffer />
            </div>
            <span className="line-clamp-1 text-ellipsis">{offer?.category?.title || "Предложение"}</span>
          </a>
        ) : !!dataO ? (
          <a
            onClick={(event) => {
              event.stopPropagation()
              dispatchBallonOffer({ offer: dataO! })
            }}
          >
            <div>
              <IconDefaultOffer />
            </div>
            <span className="line-clamp-1 text-ellipsis">{dataO?.category?.title || "Предложение"}</span>
          </a>
        ) : null}
        {/* <a>
          <div>
            <IconBlock />
          </div>
          <span className="!text-text-error">Заблокировать</span>
        </a> */}
        <a
          onClick={(event) => {
            event.stopPropagation()
            set(false)
            onComplaint()
          }}
        >
          <div>
            <IconComplaint />
          </div>
          <span className="!text-text-error">Пожаловаться</span>
        </a>
        <a
          onClick={(event) => {
            event.stopPropagation()
            set(false)
            dispatchOpenDeleteChat(thread?.id)
          }}
        >
          <div className="[&>svg>path]:!fill-text-error">
            <IconTrashBlack />
          </div>
          <span className="!text-text-error">Удалить чат</span>
        </a>
      </article>
    </button>
  )
}

AbsoluteMenu.displayName = "AbsoluteMenu"
export default AbsoluteMenu
