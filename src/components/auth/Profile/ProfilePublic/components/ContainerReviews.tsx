import type { TContainerReviews } from "./types";

import { CardReview } from "@/components/common/CardReview";

const VALUES: {
  user: string;
  date: string;
  rate: number;
  description: string;
  images: string[];
}[] = [
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 4,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      images: [
        '/mocks/Frame_50127758.png',
        '/mocks/Frame_50127759.png',
        '/mocks/Frame_50127759.png',
        '/mocks/Frame_50127759.png',
        '/mocks/Frame_50127759.png',
        '/mocks/Frame_50127759.png',
      ]
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 3,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      images: []
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 5,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      images: [
        '/mocks/Frame_50127758.png',
        '/mocks/Frame_50127759.png',
      ]
    },
    {
      user: "@tasnim",
      date: "20/06/2022",
      rate: 4.5,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      images: [
        '/mocks/Frame_50127758.png',
        '/mocks/Frame_50127759.png',
      ]
    },
  ]

import styles from "./style.module.scss"

export const ContainerReviews: TContainerReviews = ({ }) => {

  return (
    <ul className={styles.containerReviews}>
      {
        VALUES.map((item, index) => (
          <CardReview
            key={`${item?.user}_${index}`}
            user={item?.user}
            date={item?.date}
            rate={item?.rate}
            description={item?.description}
            images={item?.images}
          />
        ))
      }
    </ul>
  )
}