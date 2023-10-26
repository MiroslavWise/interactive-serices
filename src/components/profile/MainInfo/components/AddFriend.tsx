import { useMemo, useState } from "react"
import { useQuery } from "react-query"

import { IUserResponse } from "@/services/users/types/usersService"

import {
    ButtonCircleGradient,
    ButtonDefault,
    ButtonFill,
} from "@/components/common/Buttons"

import { useAuth } from "@/store/hooks"
import { serviceFriends } from "@/services/friends"

export const AddFriend = ({ user }: { user: IUserResponse }) => {
    const [loading, setLoading] = useState(false)
    const { userId } = useAuth()

    const { data, refetch } = useQuery({
        queryFn: () => serviceFriends.get({ filter: "request" }),
        queryKey: ["friends", `user=${userId}`, `filter=request`],
        enabled: !!userId && !!user?.id,
    })

    function handleOnFriends() {
        if (user?.id! !== userId! && userId) {
            if (!loading) {
                setLoading(true)
                serviceFriends
                    .post({ id: Number(user?.id!) })
                    .then((response) => {
                        refetch().finally(() => {
                            setLoading(false)
                        })
                        console.log("serviceFriends: ", response)
                    })
            }
        }
    }
    function handleDelete() {
        if (user?.id! !== userId! && userId) {
            if (!loading) {
                setLoading(true)
                serviceFriends.delete(user?.id!).then((response) => {
                    refetch().finally(() => {
                        setLoading(false)
                    })
                    console.log("delete friend: ", response)
                })
            }
        }
    }

    console.log("%c ---friend: ", "color: #034234", data)

    const isFriend = useMemo(() => {
        if (!data?.res || !user) return null
        return data?.res?.some((item) => +item.id === +user?.id!)
    }, [data?.res, user])

    console.log("%c ---isFriend: ", "color: #0d0304", isFriend)

    return isFriend ? (
        <div data-is-friend>
            <ButtonDefault label="В друзьях" type="primary" />
            <ButtonCircleGradient
                type="primary"
                icon="/svg/x-close-primary.svg"
                handleClick={handleDelete}
            />
        </div>
    ) : (
        <ButtonFill
            label="Добавить в друзья"
            small
            shadow
            handleClick={handleOnFriends}
        />
    )
}
