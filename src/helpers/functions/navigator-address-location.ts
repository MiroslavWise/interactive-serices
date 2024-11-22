import { dispatchMapCoordinates } from "@/store"

export function handleAddressLocation(on: (value: any) => void) {
  if ("geolocation" in navigator) {
    navigator?.geolocation?.getCurrentPosition(
      (position) => {
        let latitude = position?.coords?.latitude
        let longitude = position?.coords?.longitude

        if (latitude && longitude) {
          dispatchMapCoordinates({
            coordinates: [longitude, latitude],
          })
        }
      },
      (error) => {
        console.log("%c error location: ", "color: #f00", error)
        if (error.code === 1) {
          on({
            message: "Вы не дали доступ к геолокации. Посмотрите в браузере разрешения к геолокации",
          })
        } else {
          on({
            message: "Вы не дали доступ к геолокации или у вас какая-то проблема с определением места локации",
          })
        }
      },
    )
  } else {
    on({
      message: "Ваш браузер не поддерживает поиск по геолокации. Посмотрите другие решения браузеров",
    })
    console.error("%c Вы не дали доступ к геолокации", "color: #f00")
  }
}
