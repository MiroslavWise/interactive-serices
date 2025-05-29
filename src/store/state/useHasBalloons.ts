// import { create } from "zustand"

// import { type IResponseOffers } from "@/services/offers/types"
// import { type IPosts } from "@/services/posts/types"

// export const useHasBalloons = create<IStateHasBalloons>(() => ({
//   items: [],
//   visibleHasBalloon: false,
// }))

// export const dispatchHasBalloon = (values: IAction) => {
//   if (values.visibleHasBalloon) {
//     useHasBalloons.setState(
//       () => ({
//         items: values?.items ?? [],
//         visibleHasBalloon: true,
//       }),
//       true,
//     )
//   } else {
//     useHasBalloons.setState(
//       () => ({
//         items: [],
//         visibleHasBalloon: false,
//       }),
//       true,
//     )
//   }
// }

// interface IStateHasBalloons {
//   visibleHasBalloon: boolean
//   items?: IResponseOffers[] & IPosts[]
// }

// export interface IAction {
//   visibleHasBalloon: boolean
//   items?: IResponseOffers[] & IPosts[]
// }
