import { ICompany } from "@/services/types/company"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"

interface IProps {
  company: ICompany
}

function AdvertisingData({ company }: IProps) {
  const { title: companyTitle, erid: companyErid, inn: companyInn, ad } = company ?? {}
  const [isOpenCompany, setIsOpenCompany, refCompany] = useOutsideClickEvent()

  return (
    <span
      className="relative text-[0.625rem] font-light text-text-disabled cursor-pointer -mt-1 w-fit"
      ref={refCompany}
      onClick={(event) => {
        event.stopPropagation()
        setIsOpenCompany((_) => !_)
      }}
    >
      Реклама
      <div
        className={cx(
          "py-3 px-2 flex flex-col gap-1 rounded-sm absolute z-20 bottom-full left-0 shadow-md min-w-32 max-w-fit bg-BG-second transition-all duration-200",
          isOpenCompany ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        <span className="text-text-primary text-xs font-medium">{companyTitle}</span>
        <span className="text-text-primary text-xs font-medium whitespace-nowrap">ИНН: {companyInn}</span>
        <span className="text-text-primary text-xs font-normal whitespace-nowrap">erid: {companyErid}</span>
      </div>
    </span>
  )
}

export default AdvertisingData
