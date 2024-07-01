"use client"

import { useEffect } from "react"

import { EnumTypeProvider } from "@/types/enum"

import { usePush } from "@/helpers"
import { queryClient } from "@/context"
import { getIdOffer } from "@/services"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchModal, EModalData } from "@/store"

export default function () {
  const { handlePush } = usePush()

  useEffect(() => {
    const hash = window.location.hash
    if (!!hash && hash?.includes("#")) {
      const decode = decodeURIComponent(escape(window.atob(hash?.replace("#", ""))))
      const is = decode?.includes(":")

      if (is) {
        const id = decode?.split(":")?.[1]
        if (!!id) {
          queryClient
            .fetchQuery({
              queryFn: () => getIdOffer(id),
              queryKey: ["offers", { offerId: id }],
            })
            .then((response) => {
              if (!!response.data) {
                if (response?.data?.provider === EnumTypeProvider.offer) {
                  dispatchBallonOffer({ offer: response?.data! })
                } else if (response?.data?.provider === EnumTypeProvider.discussion) {
                  dispatchBallonDiscussion({ offer: response?.data! })
                } else if (response?.data?.provider === EnumTypeProvider.alert) {
                  dispatchBallonAlert({ offer: response?.data! })
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
