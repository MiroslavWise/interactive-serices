"use client"

import dynamic from "next/dynamic"

const Clusters = dynamic(() => import("@/components/YandexMap/Clusters"), { ssr: false })
const ContextMap = dynamic(() => import("@/components/YandexMap/ContextMap"), { ssr: false })

export default () => {
  return (
    <>
      <ContextMap>
        <Clusters />
      </ContextMap>
    </>
  )
}
