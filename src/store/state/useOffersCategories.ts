import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseOffersCategories } from "../types/useOffersCategories"

import { arrayHash } from "@/lib/hashArray"
import { getOffersCategories } from "@/services/offers-categories"

export const useOffersCategories = create(
  persist<IUseOffersCategories>(
    (set, get) => ({
      categories: [],
      hash: undefined,

      async getCategories() {
        return getOffersCategories().then((response) => {
          if (response?.ok) {
            if (!!response?.res) {
              if (Array.isArray(response?.res)) {
                const hash = arrayHash(
                  response?.res?.map((item) =>
                    JSON.stringify({
                      i: item?.id!,
                      j: item?.slug,
                    }),
                  ),
                )
                if (hash !== get().hash) {
                  set({
                    categories: response?.res!,
                    hash: hash!,
                  })
                }
              }
            }
          }
          return response?.ok
        })
      },
    }),
    {
      name: "offers-categories",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
