import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs"

import { ICompanyExtend } from "@/services/companies"

import { NextImageMotion } from "@/components/common"
import { cx } from "@/lib/cx"

function ItemOfListCompany(props: ICompanyExtend) {
  const { title = "", image, inn, ogrn, id, erid } = props ?? {}
  const [companyId, setCompanyId] = useQueryState("companyId", parseAsInteger)
  const [_, setIsEdit] = useQueryState("is-edit", parseAsBoolean.withDefault(false))

  return (
    <i
      className="w-full grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 bg-transparent hover:bg-grey-stroke-light transition-colors p-2 items-center cursor-pointer border-b border-grey-field last:border-none"
      onClick={() => {
        setIsEdit(false)
        if (id === companyId) {
          setCompanyId(null)
        } else {
          setCompanyId(id)
        }
      }}
    >
      <div className="rounded-sm overflow-hidden relative w-10 h-10 flex items-center justify-center bg-grey-field">
        {image ? (
          <NextImageMotion
            src={image.attributes.url}
            alt={title ?? ""}
            width={80}
            height={80}
            hash={image.attributes.blur}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
          />
        ) : (
          <span className="text-2xl font-bold text-text-primary">{title[0]}</span>
        )}
      </div>
      <div className="w-full flex flex-col gap-1">
        <h3 className="text-current text-sm font-medium">{title}</h3>
        <div className="w-full flex items-center gap-0.5 flex-nowrap overflow-hidden">
          <span className={cx("text-xs font-light text-text-secondary whitespace-nowrap", !inn && "hidden")}>ИНН: {inn}</span>
          <span className={cx("text-xs font-light text-text-secondary whitespace-nowrap", !ogrn && "hidden")}>ОГРН: {ogrn}</span>
          <span className={cx("text-xs font-light text-text-secondary whitespace-nowrap", !erid && "hidden")}>ERID: {erid}</span>
        </div>
      </div>
    </i>
  )
}

ItemOfListCompany.displayName = "ItemOfListCompany"
export default ItemOfListCompany
