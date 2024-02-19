import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { IResponseOffers } from "@/services/offers/types"

import { NextImageMotion, LoadingProfile } from "@/components/common"

import { cx } from "@/lib/cx"
import { getProfileUserId } from "@/services"
import { IconCategory } from "@/lib/icon-set"
import { dispatchBallonOffer, dispatchMapCoordinates, useOffersCategories } from "@/store"

import styles from "../styles/offer.module.scss"
import styleMain from "../styles/main.module.scss"

export function GeneralOffer({ offer }: { offer: IResponseOffers }) {
  const { categoryId, title = "", userId, addresses = [], images = [] } = offer ?? {}

  const categories = useOffersCategories(({ categories }) => categories)

  const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
    queryFn: () => getProfileUserId(userId!),
    queryKey: ["profile", userId],
    enabled: !!userId,
  })

  const geo = addresses?.length > 0 ? addresses[0] : null

  const iconTitleCategory = useMemo(() => {
    let img = "/svg/category/default.svg"
    let title = ""

    if (categoryId) {
      img = IconCategory(categoryId!)!
    }

    if (categories && categoryId) {
      for (const category of categories) {
        if (category.id === categoryId) {
          title = category.title
          break
        }
      }
    }

    return { img, title }
  }, [categoryId, categories])

  function handle() {
    const [address] = addresses

    if (address) {
      dispatchMapCoordinates({
        coordinates: address?.coordinates?.split(" ")?.reverse()?.map(Number),
      })
    }

    dispatchBallonOffer({
      visible: true,
      offer: offer,
    })
  }

  return (
    <div
      className={cx(styleMain.container, styles.container)}
      onClick={(event) => {
        event.stopPropagation()
        handle()
      }}
    >
      <header>
        <div data-img>
          <img
            src={iconTitleCategory.img}
            alt={`${categoryId!}`}
            width={18}
            height={18}
            onError={(error: any) => {
              if (error?.target) {
                try {
                  error.target.src = `/svg/category/default.svg`
                } catch (e) {
                  console.log("catch e: ", e)
                }
              }
            }}
          />
        </div>
        <h3>{iconTitleCategory.title}</h3>
      </header>
      {isLoadingProfile ? (
        <LoadingProfile />
      ) : (
        <section>
          <div data-avatar>
            <NextImageMotion src={dataProfile?.res?.image?.attributes?.url!} alt="avatar" width={40} height={40} />
          </div>
          <h4>
            <span>
              {dataProfile?.res?.firstName || ""} {dataProfile?.res?.lastName || ""}
            </span>
            <div data-icon>
              <img src="/svg/verified-tick.svg" alt="tick" width={16} height={16} />
            </div>
          </h4>
        </section>
      )}
      <article>
        <p>{title}</p>
      </article>
      {geo ? (
        <footer>
          <div data-geo>
            <img src="/svg/geo-marker.svg" alt="geo" width={16} height={16} />
          </div>
          <span>{geo?.additional}</span>
        </footer>
      ) : null}
    </div>
  )
}
