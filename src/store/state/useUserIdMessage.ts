import { create } from "zustand"

import { IUserResponse } from "@/services/users/types/usersService"

export const useUserIdMessage = create<{ userData?: IUserResponse }>(() => ({}))

export const dispatchDataUser = (value?: IUserResponse) =>
    useUserIdMessage.setState((_) => ({
        userData: value,
    }))
