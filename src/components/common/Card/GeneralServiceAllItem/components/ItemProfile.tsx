"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { LoadingProfile } from "@/components/common/Loading"

import { getProfileUserId, getTestimonials } from "@/services"
import { NextImageMotion } from "@/components/common/Image"
import { dispatchProfilePublic } from "@/store"

const IconRating = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M4.99789 0.520752C5.43508 0.520752 5.77946 0.850974 5.99932 1.29655L6.7335 2.77707C6.75576 2.82289 6.80854 2.88741 6.88787 2.94643C6.96713 3.0054 7.04474 3.03792 7.0958 3.0465L8.42482 3.26914C8.90488 3.34981 9.30725 3.58512 9.43787 3.99488C9.56839 4.40429 9.37716 4.82975 9.03195 5.1756L9.03161 5.17594L7.99914 6.21694C7.95822 6.2582 7.91238 6.33593 7.88364 6.43719C7.85508 6.53776 7.85255 6.62937 7.8655 6.68856L7.86568 6.68938L8.16107 7.97716C8.28358 8.51315 8.24298 9.04463 7.86496 9.32249C7.48564 9.60131 6.9673 9.47772 6.4964 9.19726L5.25058 8.45368C5.19826 8.42242 5.10841 8.3971 4.99997 8.3971C4.89232 8.3971 4.80058 8.42208 4.74486 8.4545L4.74407 8.45496L3.50071 9.19709C3.03037 9.47852 2.51265 9.59992 2.13331 9.32084C1.75555 9.04292 1.7129 8.51243 1.83581 7.97689L2.13114 6.68938L2.13132 6.68856C2.14427 6.62937 2.14173 6.53776 2.11318 6.43719C2.08443 6.33593 2.03859 6.2582 1.99767 6.21694L0.964449 5.17518C0.621448 4.82935 0.430848 4.40425 0.560323 3.99544C0.690176 3.58544 1.09177 3.34984 1.57215 3.26911L2.90006 3.04666L2.90048 3.04659C2.94917 3.03815 3.02564 3.00598 3.10471 2.94687C3.18393 2.88764 3.23684 2.82298 3.25915 2.77707L3.26027 2.77478L3.99352 1.29616L3.99381 1.29557C4.21575 0.850367 4.56119 0.520752 4.99789 0.520752Z"
      fill="var(--element-accent-1)"
    />
  </svg>
)

export const ItemProfile = ({ id }: { id: number }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getProfileUserId(id!),
    queryKey: ["profile", id],
    enabled: !!id,
  })

  const { data: dataTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: id! }),
    queryKey: ["testimonials", { receiver: id }],
    enabled: !!id,
  })

  const rating = useMemo(() => {
    if (!dataTestimonials?.res || dataTestimonials?.res?.length === 0) return null

    let sum = 0
    let count = 0

    for (const item of dataTestimonials?.res) {
      sum += item.rating
      count = count + 1
    }

    return Number(sum / count)
  }, [dataTestimonials])

  const name = `${data?.res?.firstName || " "} ${data?.res?.lastName || " "}`

  function handleProfile() {
    dispatchProfilePublic({ visible: true, idUser: id })
  }

  return isLoading ? (
    <LoadingProfile />
  ) : (
    <section data-profile>
      <div data-footer-profile>
        <div
          data-profile
          onClick={(event) => {
            event.stopPropagation()
            handleProfile()
          }}
        >
          <div data-avatar>
            <NextImageMotion src={data?.res?.image?.attributes?.url!} alt="avatar" width={24} height={24} />
          </div>
          <p>{name}</p>
        </div>
        {rating ? (
          <div data-rating>
            <div data-icon>
              <IconRating />
            </div>
            <span>{rating?.toFixed(1)}</span>
          </div>
        ) : null}
      </div>
    </section>
  )
}
