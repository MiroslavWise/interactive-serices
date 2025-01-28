import { Control, Controller } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"

import { description } from "../constants/titles"
import { placeholderDescription } from "../constants/titles"
import { LIMIT_DESCRIPTION, TSchemaCreate } from "../utils/create.schema"

interface IProps {
  control: Control<TSchemaCreate, any>
  typeAdd: EnumTypeProvider
}

function ComponentDescription({ typeAdd, control }: IProps) {
  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <fieldset id="fieldset-create-option-modal-title" data-test="fieldset-create-new-option-description">
          <label htmlFor={field.name}>{description(typeAdd!)}</label>
          <div data-text-area>
            <textarea
              {...field}
              placeholder={placeholderDescription(typeAdd!)}
              data-error={!!error}
              maxLength={LIMIT_DESCRIPTION + 2}
              className="whitespace-pre-wrap"
            />
            <span data-error={field.value?.length + 20 >= LIMIT_DESCRIPTION}>
              {field.value?.length || 0}/{LIMIT_DESCRIPTION}
            </span>
          </div>
          {!!error ? <i>{error.message}</i> : null}
        </fieldset>
      )}
    />
  )
}

ComponentDescription.displayName = "ComponentDescription"
export default ComponentDescription
