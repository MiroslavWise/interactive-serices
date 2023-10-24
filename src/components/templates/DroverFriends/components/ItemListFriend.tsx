import { useQuery } from "react-query"

import type { TItemListFriend } from "../types/types"
import { NextImageMotion } from "@/components/common/Image"
import { useAuth } from "@/store/hooks"
import { GeoTagging } from "@/components/common/GeoTagging"
import {
    ButtonCircleGradient,
    ButtonDefault,
} from "@/components/common/Buttons"

export const ItemListFriend: TItemListFriend = ({ id, type }) => {
    const { imageProfile } = useAuth()

    return (
        <li>
            <div data-block-profile>
                <div data-block-avatar>
                    <NextImageMotion
                        src={imageProfile?.attributes.url!}
                        alt="avatar"
                        width={60}
                        height={60}
                    />
                </div>
                <div data-name-geo>
                    <h4>Мария Иванова</h4>
                    <GeoTagging
                        location="Cir. Shiloh, Hawaii 81063"
                        fontSize={14}
                        size={16}
                    />
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
                        />
                    </>
                ) : null}
            </div>
        </li>
    )
}
