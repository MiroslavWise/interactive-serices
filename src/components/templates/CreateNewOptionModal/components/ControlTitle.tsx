import { useRef } from "react"
import { Control, Controller } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"

import { cx } from "@/lib/cx"
import { LIMIT_TITLE, TSchemaCreate } from "../utils/create.schema"
import { titleContent, titlePlaceholderContent } from "../constants/titles"

interface IProps {
  control: Control<TSchemaCreate, any>
  typeAdd: EnumTypeProvider
}

function ControlTitle({ control, typeAdd }: IProps) {
  const limit = typeAdd === EnumTypeProvider.offer ? 54 : LIMIT_TITLE
  const refSpan = useRef<HTMLSpanElement>(null)
  const refInput = useRef<HTMLInputElement>(null)

  return (
    <Controller
      name="title"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <fieldset id="fieldset-create-option-modal-offer" data-test="fieldset-create-new-option-title">
          <label htmlFor={field.name}>{titleContent(typeAdd!)}</label>
          <div className="w-full relative">
            <input
              {...field}
              ref={refInput}
              onChange={(event) => {
                field.onChange(event.target.value.replace(/\s{2,}/g, " "))
                if (refSpan.current) {
                  const width = refSpan.current.clientWidth
                  if (refInput.current) {
                    refInput.current.style.paddingRight = `${(width + 28) / 16}rem`
                  }
                }
              }}
              type="text"
              placeholder={titlePlaceholderContent(typeAdd!)}
              data-error={!!error}
              maxLength={limit}
            />
            <span
              ref={refSpan}
              className={cx(
                "absolute top-1/2 -translate-y-1/2 text-xs text-text-secondary right-3 font-medium",
                field.value.length === limit ? "text-text-error" : "text-text-secondary",
              )}
            >
              {field.value.length}/{limit}
            </span>
          </div>
          {!!error ? <i>{error.message}</i> : null}
        </fieldset>
      )}
    />
  )
}

ControlTitle.displayName = "ControlTitle"
export default ControlTitle
