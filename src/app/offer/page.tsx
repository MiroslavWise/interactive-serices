"use client"

import { useEffect } from "react"

import { EnumTypeProvider } from "@/types/enum"

import { usePush } from "@/helpers"
import { queryClient } from "@/context"
import { getIdOffer } from "@/services"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer } from "@/store"

export default function () {
  const { handlePush } = usePush()

  useEffect(() => {
    const hash = window.location.hash
    if (!!hash && hash?.includes("#")) {
      const decode = decodeURIComponent(escape(window.atob(hash?.replace("#", ""))))

      const is = decode?.includes(":")
      if (is) {
        const id = decode?.split(":")?.[1]

        console.log("is: ", is)

        if (!!id) {
          console.log("id:", id)

          queryClient
            .fetchQuery({
              queryFn: () => getIdOffer(id),
              queryKey: ["offers", { offerId: id }],
            })
            .then((response) => {
              if (response.ok) {
                if (response?.res?.provider === EnumTypeProvider.offer) {
                  dispatchBallonOffer({
                    visible: true,
                    offer: response?.res!,
                  })
                } else if (response?.res?.provider === EnumTypeProvider.discussion) {
                  dispatchBallonDiscussion({
                    visible: true,
                    offer: response?.res!,
                  })
                } else if (response?.res?.provider === EnumTypeProvider.alert) {
                  dispatchBallonAlert({
                    visible: true,
                    offer: response?.res!,
                  })
                }
                handlePush("/")
              } else {
                handlePush("/")
              }
            })

          return
        }
      }
    } else {
      handlePush("/")
    }
  }, [])
}
