import { useQuery } from "react-query"

import type { TItemListFriend } from "../types/types"

import { NextImageMotion } from "@/components/common/Image"
import { GeoTagging } from "@/components/common/GeoTagging"
import {
    ButtonCircleGradient,
    ButtonDefault,
} from "@/components/common/Buttons"

import { serviceFriends } from "@/services/friends"
import { serviceUsers } from "@/services/users"
import { useMemo } from "react"

export const ItemListFriend: TItemListFriend = ({ id, type }) => {
    const { data } = useQuery({
        queryFn: () => serviceUsers.getId(id!),
        queryKey: ["users", `user=${id}`],
        enabled: !!id,
    })

    const geo = useMemo(() => {
        if (!data?.res?.addresses || !data?.res?.addresses?.length) {
            return null
        }

        return (
            data?.res?.addresses?.find((item) => item.addressType === "main") ||
            null
        )
    }, [data?.res])

    function handleSuccess() {
        serviceFriends.post({ id: id })
    }

    return (
        <li>
            <div data-block-profile>
                <div data-block-avatar>
                    <NextImageMotion
                        src={data?.res?.profile?.image?.attributes?.url!}
                        alt="avatar"
                        width={60}
                        height={60}
                    />
                </div>
                <div data-name-geo>
                    <h4>
                        {data?.res?.profile?.firstName}{" "}
                        {data?.res?.profile?.lastName}
                    </h4>
                    {geo ? (
                        <GeoTagging
                            location={geo?.additional!}
                            fontSize={14}
                            size={16}
                        />
                    ) : null}
                </div>
            </div>
            <div data-block-buttons>
                <ButtonCircleGradient
                    type="primary"
                    icon="/svg/message-dots-circle-primary.svg"
                    size={20}
                />
                {type === "list" ? (
                    <ButtonDefault label="Удалить из друзей" />
                ) : null}
                {type === "request" ? (
                    <>
                        <ButtonCircleGradient
                            type="primary"
                            icon="/svg/x-close-primary.svg"
                            size={20}
                        />
                        <ButtonCircleGradient
                            type="primary"
                            icon="/svg/check-circle-primary.svg"
                            size={20}
                            handleClick={handleSuccess}
                        />
                    </>
                ) : null}
            </div>
        </li>
    )
}
