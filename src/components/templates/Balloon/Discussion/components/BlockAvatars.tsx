import { memo } from "react"
import { useQueries } from "@tanstack/react-query"

import { serviceProfile } from "@/services/profile"
import { NextImageMotion } from "@/components/common"

export const BlockAvatars = memo(function BlockAvatars({ idsUser }: { idsUser: number[] }) {
    const responses = useQueries({
        queries: idsUser.map((item) => ({
            queryFn: () => serviceProfile.getUserId(item!),
            queryKey: ["profile", item!],
            enabled: !!item,
            refetchOnMount: false,
        })),
    })

    const images = responses?.map((item) => ({
        url: item?.data?.res?.image?.attributes?.url!,
        id: item?.data?.res?.image?.id,
    }))

    return (
        <div data-block-avatars>
            <div data-avatars>
                {images
                    ?.filter((item) => !!item?.url)
                    ?.slice(0, 6)
                    ?.map((item, index) => (
                        <div data-img={index > 0} key={`::item::avatars::comments::${item?.id}`}>
                            <NextImageMotion src={item?.url} alt="avatar" width={24} height={24} />
                        </div>
                    ))}
            </div>
            <p>{idsUser?.length || 0} участников</p>
        </div>
    )
})
