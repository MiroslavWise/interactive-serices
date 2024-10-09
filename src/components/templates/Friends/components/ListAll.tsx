import { useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { type TFriends } from "../constants/segments"

import ItemFriend from "./Item"
import NoFriends from "./NoFriends"
import LoadingFriends from "./LoadingFriends"

import { useAuth, useFriends } from "@/store"
import { getFiendId, getFriends } from "@/services"
import { DeclensionAllQuantityFriends } from "@/lib/declension"

function ListAll({ state }: { state: TFriends }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { profile } = useAuth(({ user }) => user) ?? {}
  const id = useFriends(({ id }) => id)

  const { data, isLoading } = useQuery({
    queryFn: () => getFiendId(id!),
    queryKey: ["friends", { user: id! }],
    enabled: !!id,
  })

  const { data: dataMyFriends, isLoading: isLoadingMyFriends } = useQuery({
    queryFn: () => getFriends({}),
    queryKey: ["friends", { userId: userId, filter: "list" }],
    enabled: !!userId,
    refetchOnMount: true,
  })
  const { data: dataRequest, isLoading: isLoadingRequest } = useQuery({
    queryFn: () => getFriends({ query: { filter: "request", order: "DESC" } }),
    queryKey: ["friends", { userId: userId, filter: "request" }],
    enabled: !!userId && !!id,
    refetchOnMount: true,
  })
  const {
    data: dataResponse,
    isLoading: isLoadingResponse,
    refetch: refetchResponse,
  } = useQuery({
    queryFn: () => getFriends({ query: { filter: "response", order: "DESC" } }),
    queryKey: ["friends", { userId: userId, filter: "response" }],
    enabled: !!userId && !!id,
    refetchOnMount: true,
  })

  const items = data?.data || []
  const myFriendsIds = dataMyFriends?.data?.map((item) => item.id) || []

  const filterFriends = useMemo(() => {
    if (state === "all") return items
    return items.filter((item) => myFriendsIds.includes(item.id))
  }, [state, items, myFriendsIds])

  const length = filterFriends.length
  const name = DeclensionAllQuantityFriends(length)

  const disabledOnFriendsRequest = useCallback(
    (id: number) => {
      if (!dataRequest?.data) return true
      return dataRequest?.data?.some((item) => item.id === id)
    },
    [dataRequest?.data],
  )

  const onDataResponseIs = useCallback(() => !!dataResponse?.data?.some((item) => item?.id === userId), [])

  if (isLoading || isLoadingMyFriends || isLoadingRequest || isLoadingResponse) return <LoadingFriends />

  if (length === 0) return <NoFriends id={id!} username={profile?.username!} />

  return (
    <article className="w-full px-5 flex flex-col gap-6 pt-6">
      <p className="text-left text-text-primary text-sm font-medium">{name}</p>
      <ul className="w-full flex flex-col gap-6 overflow-y-auto">
        {filterFriends.map((item) => (
          <ItemFriend
            key={`:key:friend:${item.id}:`}
            item={item}
            myFriendsIds={myFriendsIds}
            refetchResponse={refetchResponse}
            disabledOnFriendsRequest={disabledOnFriendsRequest}
            onDataResponseIs={onDataResponseIs}
          />
        ))}
      </ul>
    </article>
  )
}

ListAll.displayName = "ListAll"
export default ListAll
