import { Placemark } from "@pbe/react-yandex-maps"

import { PLACEMARKs } from "@/mocks/components/YandexMap/constants"

export const NewsPlaceMark = () => {

  return PLACEMARKs.map((item, index) => (
    <Placemark
      key={`${item.coordinates[0]}_${item.coordinates[1]}_${index}`}
      geometry={item.coordinates}
      options={{
        iconLayout: "default#image",
        iconImageHref: item.image,
        iconImageSize: item.size,
      }}
    />
  ))
}