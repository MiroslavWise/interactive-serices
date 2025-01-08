"use client"

import { type FeatureCluster } from "./AllClusters"

import { EnumTypeProvider } from "@/types/enum"

import DivMarker from "./DivMarker"
import IconHelp from "../icons/IconHelp"
import IconMap from "../icons/map-svg/IconMap"

import { formatOfMMM } from "@/helpers/functions/daysAgo"
import { dispatchBallonAlert, dispatchBallonOffer, dispatchBallonPost } from "@/store"
import { cx } from "@/lib/cx"

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
  const created = provider === EnumTypeProvider.POST ? post?.updated ?? post?.created : offer?.updated ?? offer?.created
  const urgent = provider === EnumTypeProvider.POST ? !!post?.urgent : !!offer?.urgent
  const company = provider === EnumTypeProvider.POST ? post?.company : offer?.company
  const images = provider === EnumTypeProvider.POST ? post?.notes?.find((note) => note.main)?.images ?? [] : offer?.images ?? []
  const description =
    provider === EnumTypeProvider.POST ? post?.notes?.find((note) => note.main)?.description ?? "" : offer?.description ?? ""
  const address = provider === EnumTypeProvider.POST ? post?.addresses?.[0]! : offer?.addresses?.[0]!

  const { title: companyTitle, erid: companyErid, inn: companyInn } = company ?? {}

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
        {urgent ? (
          <div
            className={cx(
              "-z-[1] [background:var(--more-red-gradient)] rounded-r-md py-1.5 pr-2.5 pl-6 grid-cols-[1rem_minmax(0,1fr)] gap-2 items-center absolute w-max max-w- left-0 top-1/2 pointer-events-none translate-x-3.5 -translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100",
              isAdvertising ? "hidden" : "grid",
            )}
          >
            <div className="w-4 h-4 relative p-2">
              <IconHelp />
            </div>
            <span className="text-xs text-text-button font-medium line-clamp-1 text-ellipsis">{title ?? "Щедрое сердце"}</span>
          </div>
        ) : (
          <div
            className={cx(
              "div-alert-text bg-text-button absolute w-max left-0 top-1/2 pointer-events-none translate-x-3.5 -translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100",
              isAdvertising ? "hidden" : "flex",
            )}
          >
            <section className="flex flex-col h-min">
              <p className="text-[#000] line-clamp-1 text-ellipsis text-sm font-medium">{title}</p>
              {company ? (
                <span className="text-text-secondary text-[0.625rem] line-clamp-2 text-ellipsis font-light leading-3">
                  <span className="text-text-disabled">Реклама:</span> {companyTitle} {companyErid} {companyInn}
                </span>
              ) : (
                <time className="text-text-secondary text-[0.8125rem] line-clamp-1 text-ellipsis font-normal leading-4">
                  {formatOfMMM(created ?? "")}
                </time>
              )}
            </section>
          </div>
        )}
      </DivMarker>
    </YMapMarker>
  )
}

Marker.displayName = "Marker"
export default Marker
