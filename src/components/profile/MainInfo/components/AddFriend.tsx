import { useEffect, useMemo, useState } from "react"
import { useQueries } from "@tanstack/react-query"

import { IUserResponse } from "@/services/users/types"

import { Button } from "@/components/common"

import { useAuth } from "@/store"
import { serviceFriends } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"

export const AddFriend = ({ user }: { user: IUserResponse }) => {
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const [isFriends, setIsFriends] = useState(false)
    const [isRequest, setIsRequest] = useState(false)
    const [isResponse, setIsResponse] = useState(false)
    const { on } = useToast()

    const [
        { data: dataRequest, isLoading: isLoadingRequest },
        { data: dataResponse, isLoading: isLoadingResponse },
        { data: dataUserFriends, refetch, isLoading },
    ] = useQueries({
        queries: [
            {
                queryFn: () => serviceFriends.get({ filter: "request" }),
                queryKey: ["friends", `user=${userId}`, `filter=request`],
                enabled: !!userId && !!user?.id,
                refetchOnMount: true,
            },
            {
                queryFn: () => serviceFriends.get({ filter: "response" }),
                queryKey: ["friends", `user=${userId}`, `filter=response`],
                enabled: !!userId && !!user?.id,
                refetchOnMount: true,
            },
            {
                queryFn: () => serviceFriends.getId(user?.id!),
                queryKey: ["friends", `user=${user?.id!}`],
                enabled: !!user?.id && !!userId,
                refetchOnMount: true,
            },
        ],
    })

    useEffect(() => {
        setIsFriends(!!dataUserFriends?.res?.some((item) => item?.id === userId!))
    }, [dataUserFriends, userId])
    useEffect(() => {
        setIsRequest(!!dataRequest?.res?.some((item) => item?.id === user?.id!))
    }, [dataRequest, user?.id])
    useEffect(() => {
        setIsResponse(!!dataResponse?.res?.some((item) => item?.id === user?.id!))
    }, [dataResponse, user?.id])

    const isLoadingAll = useMemo(() => {
        return isLoading && isLoadingResponse && isLoadingRequest
    }, [isLoadingRequest, isLoadingResponse, isLoading])

    function handleOnFriends() {
        if (user?.id! !== userId! && userId) {
            if (!loading) {
                setLoading(true)
                serviceFriends.post({ id: Number(user?.id!) }).then((response) => {
                    if (response?.ok) {
                        if (isResponse) {
                            setIsResponse(false)
                            on({ message: "Вы приняли заявку в друзья" }, "success")
                        }
                        if (!isResponse && !isLoadingAll) {
                            setIsRequest(true)
                            on(
                                {
                                    message: `Заявка на добавление в друзья отправлена`,
                                },
                                "default",
                            )
                        }
                    }
                    setLoading(false)
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
                    if (response?.ok) {
                        if (isResponse) {
                            setIsResponse(false)
                        } else if (isFriends) {
                            setIsFriends(false)
                        } else if (isRequest) {
                            setIsRequest(false)
                        }
                    }
                    setLoading(false)
                    console.log("delete friend: ", response)
                })
            }
        }
    }

    return (
        <div data-is-friend>
            {isFriends ? (
                <>
                    <Button type="button" typeButton="regular-primary" label="В друзьях" loading={loading} />
                    <button data-circle-gradient onClick={handleDelete}>
                        <img src="/svg/x-close-primary.svg" alt="X" width={20} height={20} />
                    </button>
                </>
            ) : isRequest ? (
                <>
                    <Button type="button" typeButton="regular-primary" label="Ожидает" loading={loading} />
                    <button data-circle-gradient onClick={handleDelete}>
                        <img src="/svg/x-close-primary.svg" alt="X" width={20} height={20} />
                    </button>
                </>
            ) : isResponse ? (
                <>
                    <Button type="button" typeButton="fill-primary" label="Добавить" onClick={handleOnFriends} loading={loading} />
                    <button data-circle-gradient onClick={handleDelete}>
                        <img src="/svg/x-close-primary.svg" alt="X" width={20} height={20} />
                    </button>
                </>
            ) : !isLoadingAll ? (
                <Button type="button" typeButton="fill-primary" label="Добавить в друзья" onClick={handleOnFriends} loading={loading} />
            ) : null}
        </div>
    )
}
