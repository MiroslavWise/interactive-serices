import { useMemo, useState } from "react"

import type { IResponseOffersCategories } from "@/services/offers-categories/types"

import { patchUser } from "@/services"
import { IconCategory } from "@/lib/icon-set"
import { useAuth, useOffersCategories } from "@/store"

export const BlockCategories = ({ stateCategory, refetch }: { stateCategory: IResponseOffersCategories[]; refetch(): Promise<any> }) => {
  const [loading, setLoading] = useState(false)
  const userId = useAuth(({ userId }) => userId)
  const categories = useOffersCategories(({ categories }) => categories)

  async function handleDeleteCategory(id: number) {
    if (!loading) {
      setLoading(true)
      const ids: number[] = []

      for (const item of stateCategory) {
        if (item.id !== id) {
          ids.push(item.id)
        }
      }

      return patchUser({ categories: ids }, userId!).then((response) => {
        console.log("---RESPONSE UPDATE CATEGORIES--- ", response)
        if (response.ok) {
          refetch().then(() => {
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
    }
  }

  const categoriesMain = useMemo(() => {
    return categories?.filter((item) => item?.provider === "main") || []
  }, [categories])

  return (
    <div data-cards>
      {stateCategory?.map((item) => (
        <a key={`::${item.id}::key::category::form::`}>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              handleDeleteCategory(item.id)
            }}
            disabled={loading}
          >
            <img src={loading ? "/svg/spinner.svg" : "/svg/x-close.svg"} alt="X" width={16} height={16} />
          </button>
          <article data-title>
            <div data-img>
              <img
                src={IconCategory(item.id!)}
                alt="cat"
                height={16}
                width={16}
                onError={(error: any) => {
                  if (error?.target) {
                    try {
                      error.target.src = `/svg/category/default.svg`
                    } catch (e) {
                      console.log("catch e: ", e)
                    }
                  }
                }}
              />
            </div>
            <p>{categoriesMain?.find((itemC) => itemC.slug === item.provider)?.title!}</p>
          </article>
          <article data-sub>
            <p>{item.title}</p>
          </article>
        </a>
      ))}
    </div>
  )
}
