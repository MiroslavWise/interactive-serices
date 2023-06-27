"use client"

import { Map, Placemark } from "@pbe/react-yandex-maps"

import { TYandexMap } from "./types"

export const YandexMap: TYandexMap = ({ }) => {

        return (
                <>
                        <Map
                                width={"100%"}
                                height={"100vh"}
                                defaultState={{ center: [55.75, 37.57], zoom: 12 }}
                                onLoad={(api) => {
                                        console.log("api load: ", api)
                                }}
                        >
                                <Placemark
                                        geometry={[55.684758, 37.738521]}
                                        properties={{
                                                
                                        }}
                                        options={{
                                                iconLayout: "default#image",
                                                iconImageHref: "/icons/fill/apple.svg",
                                                balloonContent: "<img src='/icons/fill/apple.svg'  />",
                                                preset: "islands#yellowStretchyIcon",
                                        }}
                                />
                        </Map>
                </>
        )
}