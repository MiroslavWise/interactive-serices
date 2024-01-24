"use client"

import { Placemark } from "@pbe/react-yandex-maps"

import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"

export const StandardContextMenu = ({ addressInit }: { addressInit: IPostAddress | null }) => {
    return null
    // return addressInit ? (
    //     <Placemark
    //         geometry={addressInit.coordinates?.split(" ").reverse()}
    //         options={{
    //             iconOffset: [-8, 11],
    //             iconLayout: "default#image",
    //             iconImageHref: "/map/not.png",
    //             iconImageSize: [48, 48],
    //             hideIconOnBalloonOpen: false,
    //             zIndex: 45,
    //             zIndexActive: 50,
    //         }}
    //     />
    // ) : null
}
