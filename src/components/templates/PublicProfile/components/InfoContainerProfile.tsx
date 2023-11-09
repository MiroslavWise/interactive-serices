import { useMemo } from "react"
import Image from "next/image"

import type { TInfoContainerProfile } from "../types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ButtonFill, ButtonsCircle } from "@/components/common/Buttons"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { usePush } from "@/helpers"
import { useProfilePublic } from "@/store/state/useProfilePublic"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { AddFriend } from "@/components/profile/MainInfo/components/AddFriend"

export const InfoContainerProfile: TInfoContainerProfile = (props) => {
    const { profile, addresses, id } = props ?? {}
    const { dispatchProfilePublic } = useProfilePublic()
    const { userId } = useAuth()
    const { handlePush } = usePush()
    const { dispatchVisibleBarter } = useVisibleModalBarter()

    const geo = useMemo(() => {
        if (!addresses || !Array.isArray(addresses)) {
            return null
        }
        return (
            addresses?.find((item) => item.addressType === "main")
                ?.additional || null
        )
    }, [addresses])

    function handleMessage() {
        if (userId) {
            dispatchProfilePublic({ visible: false })
            handlePush(`/messages?user=${profile.userId}`)
        }
    }

    function handleBarter() {
        // if (userId) {
        //     dispatchVisibleBarter({
        //         isVisible: true,
        //         dataProfile: {
        //             photo: profile?.image?.attributes
        //                 ?.url!,
        //             fullName: profile?.username,
        //             idUser: id!,
        //         },
        //     })
        // }
    }

    return (
        <div data-info-container>
            <div data-avatar-and-achievements>
                <div data-avatar>
                    {profile?.image?.attributes?.url ? (
                        <NextImageMotion
                            alt="avatar"
                            src={profile?.image?.attributes?.url}
                            width={94}
                            height={94}
                        />
                    ) : (
                        <ImageStatic
                            src="/png/default_avatar.png"
                            alt="avatar"
                            width={94}
                            height={94}
                        />
                    )}
                    <Image
                        data-verified
                        src="/svg/verified-tick.svg"
                        alt="tick"
                        width={32}
                        height={32}
                    />
                </div>
            </div>
            <div data-title-and-geo-and-description>
                <div data-name-geo-description>
                    <div data-name-and-geo>
                        <h2>
                            {profile?.firstName} {profile?.lastName}
                        </h2>
                        {geo ? <GeoTagging location={geo} /> : null}
                    </div>
                    <p data-description>{profile?.about}</p>
                </div>
                {userId !== profile?.userId && !!userId ? (
                    <section data-buttons>
                        <AddFriend user={props!} />
                        <ButtonsCircle
                            src="/svg/message-dots-circle.svg"
                            type="primary"
                            onClick={handleMessage}
                        />
                        <ButtonsCircle
                            src="/svg/repeat-01.svg"
                            type="primary"
                            onClick={handleBarter}
                        />
                    </section>
                ) : null}
            </div>
        </div>
    )
}
