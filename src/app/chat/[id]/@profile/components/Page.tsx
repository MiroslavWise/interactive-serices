"use client"

import { useQuery } from "@tanstack/react-query"

import Loading from "../loading"
import ProfileData from "./ProfileData"
import BlockButtons from "./BlockButtons"
import Accomplishments from "./Accomplishments"
import { ButtonLink } from "@/components/common"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { getThreadId, getUserId } from "@/services"
import { userInterlocutor } from "@/helpers/user-interlocutor"

export default ({ id }: { id: string | number }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data: dataThread, isLoading: isLoadingThread } = useQuery({
    queryFn: () => getThreadId(id!),
    queryKey: ["threads", { userId: userId, threadId: id }],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
    enabled: !!id,
  })

  const { data } = dataThread ?? {}

  const { id: idUser } = userInterlocutor({ m: data?.emitter!, r: data?.receivers!, userId: userId! }) ?? {}

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryFn: () => getUserId(idUser!),
    queryKey: ["user", { userId: idUser! }],
    enabled: !!idUser,
  })

  if (isLoadingThread || isLoadingUser) return <Loading />

  return (
    <section className="w-full h-full rounded-[2rem] bg-BG-second max-md:hidden px-5 flex flex-col">
      <ProfileData user={userData?.data!} />
      <Accomplishments user={userData?.data!} />
      <p className="w-full py-2.5 text-sm font-normal text-text-primary line-clamp-5">{userData?.data?.profile?.about ?? ""}</p>
      <BlockButtons user={userData?.data!} />
      <footer
        className={cx(
          "w-full pb-5 grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] pt-2.5 mt-auto gap-2.5",
          "*:h-9 *:rounded-[1.125rem]",
          "[&>button]:bg-btn-second-default hover:[&>button]:bg-btn-second-hover [&>button]:w-9 [&>button]:relative",
        )}
      >
        <ButtonLink
          href={{
            pathname: `/customer/${idUser}`,
          }}
          typeButton="fill-primary"
          label="Посмотреть профиль"
        />
        <button></button>
        <button
          type="button"
          className="[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:h-5 [&>svg]:w-5 "
        >
          <IconDotsHorizontal />
        </button>
      </footer>
    </section>
  )
}
