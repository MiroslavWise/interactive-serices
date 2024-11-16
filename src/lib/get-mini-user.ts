import { IUserResponse } from "@/services/users/types"

export const getMiniUser = (user: IUserResponse) => ({
  about: "",
  id: user?.id!,
  image: user?.profile?.image!,
  firstName: user?.profile?.firstName ?? "Имя",
  lastName: user?.profile?.lastName || "",
  username: user?.profile?.username ?? "",
  gender: user?.profile?.gender!,
})
