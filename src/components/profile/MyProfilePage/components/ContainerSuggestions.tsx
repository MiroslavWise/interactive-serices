"use client"

import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { MotionUL } from "@/components/common/Motion"
import { CardSuggestion } from "@/components/common/Card"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const ContainerSuggestions = () => {
    const { userId, user, imageProfile } = useAuth()

    const { data } = useQuery({
        queryFn: () => serviceOffer.getUserId(userId!, { provider: "offer" }),
        queryKey: ["offers", `user=${userId}`, "provider=offer"],
    })

    return (
        <MotionUL
            classNames={[
                styles.containerSuggestions,
                isMobile && styles.mobile,
            ]}
        >
            {Array.isArray(data?.res)
                ? data?.res.map((item, index) => (
                      <CardSuggestion
                          key={`${item.id}+${index}-offers`}
                          {...item}
                          rating={{
                              average: 4.5,
                              total: 21,
                          }}
                          profile={{
                              name: `${user?.firstName || ""} ${
                                  user?.lastName || ""
                              }`,
                              userId: userId!,
                              photo: imageProfile?.attributes?.url!,
                          }}
                      />
                  ))
                : null}
        </MotionUL>
    )
}
