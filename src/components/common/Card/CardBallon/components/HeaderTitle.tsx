import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import { ImageCategory } from "@/components/common/Image"

import { getOffersCategories } from "@/services"
import { cx } from "@/lib/cx"

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
    let title = ""

    if (categories && categoryId) {
      for (const category of categories) {
        if (category.id === categoryId) {
          title = category.title
          break
        }
      }
    }

    return { title }
  }, [categoryId, categories, provider])

  return (
    <header data-provider={provider} className="w-full flex flex-row items-start gap-3 overflow-hidden">
      <div
        className={cx(
          "relative h-[1.625rem] w-[1.625rem] p-[0.8125rem] [&>img]:absolute [&>img]:!-translate-x-1/2 [&>img]:!-translate-y-1/2 [&>img]:!left-1/2 [&>img]:!top-1/2",
          provider === EnumTypeProvider.offer && "[&>img]:h-full [&>img]:w-full",
          provider === EnumTypeProvider.alert && "rounded-[0.8125rem] bg-element-error",
        )}
      >
        {provider === EnumTypeProvider.offer && iconTitleCategory ? (
          <ImageCategory id={categoryId!} />
        ) : provider === EnumTypeProvider.alert ? (
          <img className="w-4 h-4" src="/svg/SOS.svg" alt="SOS" width={18} height={18} />
        ) : provider === EnumTypeProvider.discussion ? (
          <img className="h-full w-full" src="/svg/discussin-card.svg" alt="dis" width={26} height={26} />
        ) : null}
      </div>
      <h3 className="text-text-primary text-base font-semibold">
        {provider === EnumTypeProvider.offer && iconTitleCategory
          ? iconTitleCategory.title
          : provider === EnumTypeProvider.alert
          ? title
            ? title
            : "SOS-сообщение"
          : provider === EnumTypeProvider.discussion
          ? title
            ? title
            : "Обсуждение"
          : null}
      </h3>
    </header>
  )
}

export default HeaderTitle
