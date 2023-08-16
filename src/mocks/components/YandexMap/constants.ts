import type { IPeopleCardNotifications } from "@/components/common/PeopleCard/Notifications/types"

export const VALUE_CARD_PEOPLES: IPeopleCardNotifications[] = [
  {
    name: "Уэйд Пин",
    date: "01/02/2023",
    rate: 4.5,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
    avatar: "/mocks/alina.png",
  },
  {
    name: "Михаил Прохоров",
    date: "02/02/2023",
    rate: 4.5,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
    avatar: "/mocks/michael.png",
  },
  {
    name: "Алена Шварц",
    date: "03/02/2023",
    rate: 4.5,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
    avatar: "/mocks/elena.png",
  },
  {
    name: "Сильвана Веселицкая",
    date: "03/02/2023",
    rate: 4.5,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
    avatar: "/mocks/maria.png",
  },
]

const random = () => [55.75 + Number(`${(Math.random() < 0.5 ? "+" : "-")}${Math.random() / 100}`), 37.67 + Number(`${(Math.random() < 0.5 ? "+" : "-")}${Math.random() / 100}`)] as [number, number]

export const PLACEMARKs: { coordinates: [number, number], image: string, size: [number, number], isOpenImage: string }[] = [
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=Alert.png",
    isOpenImage: "/map/size=middle&type=Alert.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
  {
    coordinates: random(),
    image: "/map/size=small&type=News.png",
    isOpenImage: "/map/size=middle&type=News.png",
    size: [72, 81],
  },
]