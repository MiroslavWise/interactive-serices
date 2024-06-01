import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { IconCategory } from "@/lib/icon-set"
import { getOffersCategories } from "@/services"

interface IProps {
  offer: IResponseOffers
}

function HeaderTitle({ offer }: IProps) {
  const { provider, categoryId, title } = offer ?? {}

  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []

  const iconTitleCategory = useMemo(() => {
    if (!categoryId) return null

    let img = "/svg/category/default.svg"
    let title = ""

    if (categoryId) {
      img = IconCategory(categoryId!)!
    }

    if (categories && categoryId) {
      for (const category of categories) {
        if (category.id === categoryId) {
          title = category.title
          break
        }
      }
    }

    return { img, title }
  }, [categoryId, categories, provider])

  return (
    <header data-provider={provider}>
      {provider === EnumTypeProvider.offer && iconTitleCategory ? (
        <>
          <div data-img>
            <img
              src={iconTitleCategory.img}
              alt={`${categoryId!}`}
              width={18}
              height={18}
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
          <h3>{iconTitleCategory.title}</h3>
        </>
      ) : provider === EnumTypeProvider.alert ? (
        <>
          <div data-img>
            <img src="/svg/SOS.svg" alt="SOS" width={18} height={18} />
          </div>
          <h3>{title ? title : "SOS-сообщение"}</h3>
        </>
      ) : provider === EnumTypeProvider.discussion ? (
        <>
          <div data-img>
            <img src="/svg/discussin-card.svg" alt="dis" width={26} height={26} />
          </div>
          <h3>{title ? title : "Обсуждение"}</h3>
        </>
      ) : null}
    </header>
  )
}

export default memo(HeaderTitle)
