import { ReactNode } from "react"

export const ICON: Record<TKeyItem, ReactNode> = {
  barters: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <g clipPath="url(#clip0_6418_49539)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.75 5.9998C0.75 3.67034 2.48696 1.9998 4.75 1.9998L8.69061 1.9998C8.45883 1.74075 8.43183 1.34624 8.6461 1.0553C8.89173 0.721771 9.36123 0.65052 9.69475 0.896151L9.69648 0.897422L9.7 0.900027L9.71221 0.909102L9.75574 0.941774C9.7926 0.969619 9.8446 1.00929 9.90673 1.05777C10.0302 1.15413 10.1974 1.28816 10.3667 1.43519C10.5323 1.57899 10.7173 1.75003 10.8667 1.91916C10.9407 2.00287 11.0219 2.10382 11.0886 2.21454C11.1429 2.30467 11.25 2.5 11.25 2.75005C11.25 3.00009 11.1429 3.19541 11.0886 3.28554C11.0219 3.39625 10.9407 3.49721 10.8667 3.58092C10.7173 3.75005 10.5323 3.92109 10.3667 4.06489C10.1974 4.21193 10.0302 4.34596 9.90675 4.44231C9.84462 4.4908 9.79262 4.53047 9.75576 4.55832L9.71223 4.59099L9.70002 4.60006L9.6965 4.60267L9.69541 4.60347C9.36189 4.84911 8.89176 4.77833 8.64612 4.44481C8.4317 4.15368 8.45886 3.75884 8.69107 3.4998L4.75 3.4998C3.29977 3.4998 2.25 4.51429 2.25 5.9998C2.25 6.41401 1.91421 6.7498 1.5 6.7498C1.08579 6.7498 0.75 6.41401 0.75 5.9998ZM11.25 5.9998C11.25 8.32926 9.51304 9.9998 7.25 9.9998H3.30939C3.54117 10.2588 3.56817 10.6534 3.3539 10.9443C3.10827 11.2778 2.63877 11.3491 2.30525 11.1034L2.30352 11.1022L2.3 11.0996L2.28779 11.0905L2.24426 11.0578C2.2074 11.03 2.1554 10.9903 2.09327 10.9418C1.9698 10.8455 1.80265 10.7114 1.6333 10.5644C1.46767 10.4206 1.28272 10.2496 1.13328 10.0804C1.05931 9.99673 0.978143 9.89577 0.911398 9.78505C0.857064 9.69492 0.749998 9.4996 0.75 9.24955C0.750002 8.99951 0.857066 8.80418 0.911398 8.71406C0.978141 8.60334 1.05931 8.50238 1.13327 8.41868C1.28271 8.24954 1.46766 8.07851 1.63328 7.9347C1.80263 7.78767 1.96978 7.65364 2.09325 7.55728C2.15538 7.50879 2.20738 7.46912 2.24424 7.44128L2.28777 7.40861L2.29998 7.39953L2.3035 7.39692L2.30459 7.39612C2.63811 7.15048 3.10825 7.22126 3.35388 7.55478C3.5683 7.84592 3.54114 8.24076 3.30893 8.4998H7.25C8.70023 8.4998 9.75 7.4853 9.75 5.9998C9.75 5.58558 10.0858 5.2498 10.5 5.2498C10.9142 5.2498 11.25 5.58558 11.25 5.9998Z"
          fill="url(#paint0_linear_6418_49539)"
        />
      </g>
      <defs>
        <linearGradient id="paint0_linear_6418_49539" x1="0.75" y1="0.75" x2="13.1902" y2="4.14933" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8B89F5" />
          <stop offset="1" stop-color="#625FF9" />
        </linearGradient>
        <clipPath id="clip0_6418_49539">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  rating: (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
      <g clipPath="url(#clip0_6418_49545)">
        <path
          d="M6.33106 0.625977C6.85569 0.625977 7.26895 1.02224 7.53278 1.55693L8.41379 3.33356C8.44051 3.38854 8.50384 3.46597 8.59904 3.5368C8.69414 3.60755 8.78728 3.64658 8.84856 3.65688L10.4434 3.92404C11.0194 4.02084 11.5023 4.30322 11.659 4.79493C11.8157 5.28622 11.5862 5.79678 11.1719 6.2118L11.1715 6.2122L9.93257 7.4614C9.88346 7.51092 9.82845 7.60419 9.79396 7.7257C9.75969 7.84639 9.75665 7.95632 9.77219 8.02735L9.7724 8.02833L10.1269 9.57367C10.2739 10.2169 10.2252 10.8546 9.77155 11.1881C9.31637 11.5226 8.69435 11.3743 8.12927 11.0378L6.63429 10.1455C6.57151 10.108 6.46369 10.0776 6.33356 10.0776C6.20437 10.0776 6.09429 10.1076 6.02743 10.1465L6.02648 10.147L4.53445 11.0376C3.97003 11.3753 3.34878 11.521 2.89356 11.1861C2.44025 10.8526 2.38908 10.216 2.53656 9.57334L2.89096 8.02833L2.89117 8.02735C2.90671 7.95632 2.90367 7.84639 2.86941 7.7257C2.83491 7.60419 2.7799 7.51091 2.7308 7.4614L1.49093 6.2113C1.07933 5.79629 0.850611 5.28618 1.00598 4.7956C1.1618 4.3036 1.64372 4.02088 2.22017 3.92401L3.81367 3.65707L3.81417 3.65699C3.87259 3.64685 3.96436 3.60825 4.05925 3.53732C4.15431 3.46625 4.2178 3.38865 4.24457 3.33356L4.24592 3.33081L5.12582 1.55646L5.12617 1.55576C5.39249 1.02151 5.80702 0.625977 6.33106 0.625977Z"
          fill="url(#paint0_linear_6418_49545)"
        />
      </g>
      <defs>
        <linearGradient id="paint0_linear_6418_49545" x1="1.629" y1="1.56666" x2="9.69204" y2="9.36151" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D571F8" />
          <stop offset="1" stop-color="#6B5AE7" />
        </linearGradient>
        <clipPath id="clip0_6418_49545">
          <rect width="12" height="12" fill="white" transform="translate(0.332031)" />
        </clipPath>
      </defs>
    </svg>
  ),
  feedback: (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
      <g clipPath="url(#clip0_6418_49551)">
        <path
          d="M11.668 5.19445C11.6701 6.00104 11.4816 6.79671 11.118 7.51667C10.6868 8.3794 10.0239 9.10505 9.20362 9.61234C8.38333 10.1196 7.438 10.3885 6.47352 10.3889C5.70862 10.3909 4.95354 10.2215 4.26354 9.89388C4.19128 9.85957 4.10861 9.85312 4.03273 9.87841L1.23718 10.8103C1.00265 10.8884 0.77953 10.6653 0.857705 10.4308L1.78956 7.63524C1.81485 7.55936 1.8084 7.47669 1.77409 7.40443C1.44645 6.71443 1.27708 5.95935 1.27908 5.19445C1.27945 4.22997 1.54834 3.28464 2.05563 2.46435C2.56292 1.64406 3.28856 0.981196 4.1513 0.550017C4.87125 0.186364 5.66693 -0.00208557 6.47352 1.74094e-05H6.77907C8.05284 0.07029 9.25593 0.607926 10.158 1.50998C11.06 2.41204 11.5977 3.61513 11.668 4.8889V5.19445Z"
          fill="url(#paint0_linear_6418_49551)"
        />
      </g>
      <defs>
        <linearGradient id="paint0_linear_6418_49551" x1="0.667969" y1="0" x2="13.7006" y2="3.56109" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8B89F5" />
          <stop offset="1" stop-color="#625FF9" />
        </linearGradient>
        <clipPath id="clip0_6418_49551">
          <rect width="12" height="12" fill="white" transform="translate(0.667969)" />
        </clipPath>
      </defs>
    </svg>
  ),
}

export const badges = ({ rating, feedback }: { rating: string; feedback: number }): IPropsItem[] => [
  // {
  //   id: "barters",
  //   title: "Обмены",
  //   count: barters,
  // },
  // {
  //   id: "rating",
  //   title: "Рейтинг",
  //   count: rating,
  // },
  // {
  //   id: "feedback",
  //   title: "Отзывы",
  //   count: feedback,
  // },
]

async function Accomplishments({ id }: { id: number | string }) {
  // const [{ data }, { data: dataTestimonials }] = await Promise.all([getUserId(id), getTestimonials({ receiver: id!, order: "DESC" })])

  // const itemsAllBarters = data?.barters?.filter((_) => _.status === EnumStatusBarter.COMPLETED) || []
  // const itemsTestimonials = dataTestimonials || []

  // const lengthAllBarters = itemsAllBarters.length
  // const lengthTestimonials = itemsTestimonials.length
  // const averageRating = Number(
  //   itemsTestimonials.reduce((acc, cur) => acc + Number(cur.rating ?? 0), 0) / (lengthTestimonials || 1),
  // ).toFixed(1)

  return null
  // return (
  //   <article className="w-full rounded-2xl grid grid-cols-3 gap-2 p-3 md:p-2.5 bg-BG-second">
  //     {badges({ feedback: lengthTestimonials, rating: averageRating, barters: lengthAllBarters }).map(({ id, title, count }) => (
  //       <Item key={`::key::item::accomplishments::${id}`} id={id} title={title} count={count} />
  //     ))}
  //   </article>
  // )
}

Accomplishments.displayName = "Accomplishments"
export default Accomplishments

type TKeyItem = "barters" | "rating" | "feedback"

interface IPropsItem {
  id: TKeyItem
  title: string
  count: number | string
}

const Item = ({ title, count, id }: IPropsItem) => (
  <a className="w-full bg-grey-field flex flex-col gap-0.5 py-2 px-4 rounded-.625">
    <article className="w-full flex flex-row gap-1 items-center [&>svg]:w-3 [&>svg]:h-3">
      <p className="text-text-primary text-sm font-normal">{title}</p>
      {ICON[id]}
    </article>
    <h3 className="text-text-primary text-start text-lg font-semibold">{count}</h3>
  </a>
)
