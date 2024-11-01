"use client"

import { useQuery } from "@tanstack/react-query"

import Loading from "./loading"
import FriendB from "./components/FriendB"
import AboutData from "./components/AboutData"
import { ButtonLink } from "@/components/common"
import ProfileData from "./components/ProfileData"
import BlockButtons from "./components/BlockButtons"
import MenuCustomer from "./components/MenuCustomer"
import Accomplishments from "./components/Accomplishments"

import { cx } from "@/lib/cx"
import { useAuth, useCollapseChat } from "@/store"
import { getThreadId, getUserId } from "@/services"
import { userInterlocutor } from "@/helpers/user-interlocutor"

export default ({ params: { id } }: { params: { id: string } }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const collapse = useCollapseChat(({ collapse }) => collapse)

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
    <section
      className={cx(
        "w-full h-full rounded-2 bg-BG-second max-md:hidden px-5 flex flex-col md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] overflow-y-auto",
        collapse && "hidden",
      )}
    >
      <ProfileData user={userData?.data!} />
      <Accomplishments user={userData?.data!} />
      <AboutData about={userData?.data?.profile?.about!} />
      <BlockButtons user={userData?.data!} />
      <footer
        className={cx(
          "w-full pb-5 grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] pt-2.5 mt-auto gap-2.5",
          "*:h-9 *:rounded-[1.125rem] *:p-[1.125rem]",
          "[&>button]:bg-btn-second-default hover:[&>button]:bg-btn-second-hover [&>button]:w-9 [&>button]:relative",
        )}
      >
        <ButtonLink
          href={{
            pathname: `/customer/${idUser}`,
          }}
          typeButton="fill-primary"
          label="Посмотреть профиль"
          prefetch
        />
        <FriendB user={userData?.data!} />
        <MenuCustomer user={userData?.data!} id={id} />
      </footer>
    </section>
  )
}
