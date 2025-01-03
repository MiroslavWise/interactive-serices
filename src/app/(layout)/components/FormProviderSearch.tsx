/**
 * @date 2025-01-03
 * @author @MiroslavWise
 * @version 1.0.0
 * @public
 */

"use client"

import { useForm, FormProvider } from "react-hook-form"
import { useState, type PropsWithChildren, createContext, useContext } from "react"

import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"
import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import { getSearch } from "@/services/search"
import { queryClient } from "@/context/QueryClientProviderContext"
import { resolverSchemaSearch, TSchemaSearch } from "@/components/content/BannerSearch/utils/schema"

const FormProviderSearchContext = createContext<IFormProviderSearchContext>({
  posts: [],
  offers: [],

  isF: false,
  loading: false,

  setIsF: () => {},
  setLoading: () => {},
  onSearch: () => Promise.resolve(),
})

export default ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false)

  /** Списки для отображения в результатах поиска */
  const [valuesPosts, setValuesPosts] = useState<IPosts[]>([])
  const [valuesOffers, setValuesOffers] = useState<IResponseOffers[]>([])
  const [isF, setIsF] = useState(false)

  const methods = useForm<TSchemaSearch>({
    resolver: resolverSchemaSearch,
    defaultValues: { input: "" },
  })

  async function onSearch(value: string) {
    if (value.length > 1) {
      if (!loading) {
        setLoading(true)
        const response = await queryClient.fetchQuery({
          queryFn: () => getSearch({ query: { query: value } }),
          queryKey: ["search", { search: value }],
        })
        setIsF(true)
        setLoading(false)

        const { data } = response

        if (data) {
          const posts = data?.posts ?? []
          const offers = data?.offers ?? []

          setValuesPosts(posts)
          setValuesOffers(offers)
        }
      }
    }
  }

  return (
    <FormProviderSearchContext.Provider value={{ isF, setIsF, loading, setLoading, onSearch, posts: valuesPosts, offers: valuesOffers }}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormProviderSearchContext.Provider>
  )
}

export const useFormProviderSearch = () => useContext(FormProviderSearchContext)

interface IFormProviderSearchContext {
  isF: boolean
  loading: boolean

  posts: IPosts[]
  offers: IResponseOffers[]

  setIsF: (isF: boolean) => void
  setLoading: (loading: boolean) => void
  onSearch: (value: string) => Promise<void>
}
