import { Controller, type Control } from "react-hook-form"

import { TSchemaCreatePostUpdate, type TSchemaCreatePost } from "../schema"

import IconCheck from "@/components/icons/IconCheck"

import { cx } from "@/lib/cx"

interface IProps {
  control: Control<TSchemaCreatePost, any>
}

function ControlParticipant({ control }: IProps) {
  return (
    <Controller
      name="isParticipants"
      control={control}
      render={({ field: { name, value, onChange } }) => (
        <section className="w-full grid gap-2.5 grid-cols-[1rem_minmax(0,1fr)]">
          <label
            htmlFor={name}
            className={cx(
              "relative w-4 h-4 *:w-4 *:h-4 flex *:transition-opacity transition-colors rounded-[0.25rem] border border-solid cursor-pointer",
              "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2",
              value ? "*:opacity-100 bg-element-accent-1 border-element-accent-1" : "*:opacity-0 bg-transparent border-text-disabled",
            )}
            onClick={() => onChange(!value)}
          >
            <IconCheck />
          </label>
          <article className="w-full flex flex-col gap-0.5">
            <p className="text-sm font-medium text-text-primary">Регистрировать участников</p>
            <span className="text-sm font-normal text-text-secondary">
              Отметьте, чтобы отслеживать число участников и видеть их полный список
            </span>
          </article>
        </section>
      )}
    />
  )
}

ControlParticipant.displayName = "ControlParticipant"
export default ControlParticipant
