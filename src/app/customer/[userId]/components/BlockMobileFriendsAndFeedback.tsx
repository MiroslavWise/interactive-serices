import { cache } from "react"

import PlaqueFriends from "../@profile/components/PlaqueFriends"

import { getTestimonials } from "@/services"
import ButtonFeedbackMobile from "./ButtonFeedbackMobile"

const get = cache(getTestimonials)

async function BlockMobileFriendsAndFeedback({ id }: { id: string | number }) {
  const { res } = await get({ receiver: id! })

  const items = res || []
  const allRating = items.reduce((acc, cur) => acc + +cur.rating, 0)
  const length = items.length
  const average = (allRating / (length || 1)).toFixed(1)

  return (
    <article className="w-full flex md:hidden flex-col py-1 px-3 bg-BG-second rounded-2xl max-md:-mt-0.875">
      <PlaqueFriends id={id} />
      <section className="w-full py-2 flex flex-row items-center justify-between gap-2 border-t-[1px] border-solid border-grey-stroke-light">
        <p className="text-text-primary text-sm font-medium">{length} отзывов</p>
        <article className="flex flex-row items-center gap-0.625">
          <div className="flex flex-row items-center gap-1">
            <div className="w-3 h-3 relative p-0.375">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3"
              >
                <g clip-path="url(#__ra__)">
                  <path
                    d="M5.99903 0.625977C6.52366 0.625977 6.93692 1.02224 7.20075 1.55693L8.08176 3.33356C8.10847 3.38854 8.17181 3.46597 8.26701 3.5368C8.36211 3.60755 8.45525 3.64658 8.51652 3.65688L10.1113 3.92404C10.6874 4.02084 11.1703 4.30322 11.327 4.79493C11.4836 5.28622 11.2542 5.79678 10.8399 6.2118L10.8395 6.2122L9.60053 7.4614C9.55143 7.51092 9.49642 7.60419 9.46192 7.7257C9.42766 7.84639 9.42462 7.95632 9.44016 8.02735L9.44037 8.02833L9.79484 9.57367C9.94185 10.2169 9.89314 10.8546 9.43952 11.1881C8.98433 11.5226 8.36232 11.3743 7.79724 11.0378L6.30225 10.1455C6.23948 10.108 6.13166 10.0776 6.00152 10.0776C5.87234 10.0776 5.76226 10.1076 5.6954 10.1465L5.69445 10.147L4.20242 11.0376C3.638 11.3753 3.01675 11.521 2.56153 11.1861C2.10822 10.8526 2.05705 10.216 2.20453 9.57334L2.55893 8.02833L2.55914 8.02735C2.57468 7.95632 2.57164 7.84639 2.53738 7.7257C2.50288 7.60419 2.44787 7.51091 2.39876 7.4614L1.1589 6.2113C0.7473 5.79629 0.51858 5.28618 0.67395 4.7956C0.829773 4.3036 1.31169 4.02088 1.88814 3.92401L3.48164 3.65707L3.48214 3.65699C3.54056 3.64685 3.63233 3.60825 3.72721 3.53732C3.82228 3.46625 3.88577 3.38865 3.91254 3.33356L3.91388 3.33081L4.79379 1.55646L4.79414 1.55576C5.06046 1.02151 5.47499 0.625977 5.99903 0.625977Z"
                    fill="#FEA032"
                    className="fill-[#FEA032]"
                  />
                </g>
                <defs>
                  <clipPath id="__ra__">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="text-text-primary text-sm font-medium">{average}</p>
          </div>
          <ButtonFeedbackMobile />
        </article>
      </section>
    </article>
  )
}

export default BlockMobileFriendsAndFeedback
