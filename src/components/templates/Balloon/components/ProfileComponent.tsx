import { useQuery } from "@tanstack/react-query"

import { IResponseOffers } from "@/services/offers/types"

import { getUserId } from "@/services"
import { LoadingProfile } from "@/components/common"
import { ItemProfile } from "./ItemProfile"

interface IProps {
  offer: IResponseOffers
}

export function ProfileComponent({ offer }: IProps) {
  const { data, isLoading: isLoadUser } = useQuery({
    queryFn: () => getUserId(offer?.userId!),
    queryKey: ["user", { userId: offer?.userId }],
    enabled: !!offer?.userId,
  })
  const { res } = data ?? {}
  const { profile } = res ?? {}

  return isLoadUser ? <LoadingProfile /> : <ItemProfile profile={profile!} offer={offer as unknown as IResponseOffers} />
}
