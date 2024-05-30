// "use client"

// import { load } from "@2gis/mapgl"
// import { useTheme } from "next-themes"
// import { useContext, useEffect } from "react"

// import { MapContext } from "@/context/Context2gis"

// const DARK_STYLE = "56f8fe51-5c8a-4dfe-a2e1-47de956dde9a"
// const LIGHT_STYLE = "116e173b-67a9-4fe8-97f8-1f9e1addd2a6"

// type S = "dark" | "light"

// const stylesTheme: Map<S, string> = new Map([
//   ["dark", DARK_STYLE],
//   ["light", LIGHT_STYLE],
// ])

export default () => {
  return null
  // const { systemTheme } = useTheme()
  // const [_, setMapInstance] = useContext(MapContext)
  // useEffect(() => {
  //   if (systemTheme) {
  //     let map: any
  //     load().then((mapglAPI) => {
  //       map = new mapglAPI.Map("map-container", {
  //         center: [30.19, 59.57],
  //         zoom: 13,
  //         key: "6c14233a-30c8-463c-a172-169d133501a6",
  //         style: stylesTheme.get(systemTheme ?? "dark"),
  //       })
  //     })

  //     setMapInstance(map)

  //     return () => map && map?.destroy && map.destroy()
  //   }
  // }, [stylesTheme])

  // return (
  //   <main style={{ width: "100%", height: "100%" }}>
  //     <div id="map-container" style={{ width: "100%", height: "100%" }}></div>
  //   </main>
  // )
}
