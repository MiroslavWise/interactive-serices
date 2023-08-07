import { useState, useRef, useEffect } from "react"
import { Placemark } from "@pbe/react-yandex-maps"

interface IValues {
  x: string | number | null
  y: string | number | null
  isVisible: boolean
}

export const NewsPlaceMark = () => {
  // const [coordinatesVisible, setCoordinatesVisible] = useState<IValues>({
  //   x: null, y: null, isVisible: false,
  // })

  function handlePlacemarkClick(event: MouseEvent) {
    console.log("event: ", event)
    // setCoordinatesVisible(state =>({
    //   x: event.x,
    //   y: event.y,
    //   isVisible: !state.isVisible,
    // }))
  }

  return (
    <Placemark
      geometry={[55.75, 37.57]}
      options={{
        iconLayout: "default#image",
        iconImageHref: "/map/size-small&type=News.png",
        iconImageSize: [48, 54],
      }}
      // properties={{
      //   events: addEventListener("click", (event: MouseEvent) => handlePlacemarkClick(event))
      // }}
      width={48}
      height={54}
    />
  )
}