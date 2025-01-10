"use client"

import { type FeatureCluster } from "./AllClusters"

import { EnumTypeProvider } from "@/types/enum"

import DivMarker from "./DivMarker"
import IconMap from "../icons/map-svg/IconMap"

import { dispatchBallonAlert, dispatchBallonOffer, dispatchBallonPost } from "@/store"

function Marker({ properties, geometry, reactifiedApi, is }: FeatureCluster) {
  if (!reactifiedApi) return null

  const { YMapMarker } = reactifiedApi ?? {}

  const { provider, post, offer } = properties ?? {}

  if (!is(geometry.coordinates as number[])) return null

  const title =
    provider === EnumTypeProvider.POST
      ? post?.title
      : provider === EnumTypeProvider.offer
      ? offer?.title ?? offer?.category?.title
      : offer?.title
  const urgent = provider === EnumTypeProvider.POST ? !!post?.urgent : !!offer?.urgent
  const company = provider === EnumTypeProvider.POST ? post?.company : offer?.company
  const images = provider === EnumTypeProvider.POST ? post?.notes?.find((note) => note.main)?.images ?? [] : offer?.images ?? []
  const description =
    provider === EnumTypeProvider.POST ? post?.notes?.find((note) => note.main)?.description ?? "" : offer?.description ?? ""
  const address = provider === EnumTypeProvider.POST ? post?.addresses?.[0]! : offer?.addresses?.[0]!

  const isAdvertising = !!company

  return (
    <YMapMarker coordinates={geometry.coordinates}>
      <DivMarker
        isAdvertising={isAdvertising}
        provider={provider}
        title={title! ?? ""}
        images={images}
        description={description}
        address={address}
        company={company!}
        offer={offer}
        post={post}
      >
        <IconMap
          isAdvertising={isAdvertising}
          provider={provider}
          urgent={urgent}
          onClick={() => {
            if (provider === EnumTypeProvider.offer) {
              dispatchBallonOffer({ offer: offer! })
              return
            }
            if (provider === EnumTypeProvider.alert) {
              dispatchBallonAlert({ offer: offer! })
              return
            }
            if (provider === EnumTypeProvider.POST) {
              dispatchBallonPost(post!)
              return
            }
          }}
        />
      </DivMarker>
    </YMapMarker>
  )
}

Marker.displayName = "Marker"
export default Marker
