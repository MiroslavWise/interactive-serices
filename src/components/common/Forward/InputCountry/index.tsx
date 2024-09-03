"use client"

import { InputMask } from "@react-input/mask"
import { type DetailedHTMLProps, Dispatch, forwardRef, type InputHTMLAttributes, useState } from "react"

import IconChevronDown from "@/components/icons/IconChevronDown"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { EnumCountry, FLAGS_OBJ } from "./constants"

const InputCountry = forwardRef(
  (props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { replaceValue: Dispatch<string> }) => {
    const { replaceValue, ...rest } = props
    const [open, setOpen, refDiv] = useOutsideClickEvent()
    const [state, setState] = useState(EnumCountry.ru)
    const current = FLAGS_OBJ[state]

    return (
      <div className="w-full h-12 relative z-40" ref={refDiv}>
        <InputMask
          type="text"
          className="w-full h-12 rounded-3xl text-text-primary !pl-[calc(0.875rem_+_1.625rem_+_0.5rem_+_1rem_+_0.5rem)] !tracking-wide"
          defaultValue={FLAGS_OBJ[EnumCountry.ru].code}
          mask={current.mask}
          placeholder={current.placeholder}
          {...rest}
          replacement={{ _: /\d/ }}
          autoComplete="__number_off__"
        />
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 left-3.5 flex flex-row items-center gap-2"
          onClick={(event) => {
            event.stopPropagation()
            setOpen((_) => !_)
          }}
        >
          <div className="relative w-[1.625rem] h-5 px-[0.8125rem] py-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.625rem] *:h-5">
            {current?.img()}
          </div>
          <section
            className={cx(
              "w-4 h-4 flex items-center justify-center",
              "*:w-4 *:transition-all *:h-4 [&>svg>path]:fill-element-grey-light",
              open && "*:rotate-180",
            )}
          >
            <IconChevronDown />
          </section>
        </button>
        <article
          className={cx(
            "absolute -z-10 top-[calc(100%_+_0.25rem)] w-full left-0 bg-BG-second rounded-xl max-h-[14.25rem] shadow-box-down overflow-hidden",
            "opacity-0 invisible overflow-y-auto",
            open && "!opacity-100 !visible !z-50",
          )}
        >
          <ul className="flex flex-col w-full p-1 overflow-x-hidden overflow-y-auto">
            {Object.values(FLAGS_OBJ).map((item) => (
              <li
                key={`::key::item::flag::${item.short}::`}
                className="w-full grid grid-cols-[1.625rem_minmax(0,1fr)] gap-2.5 items-center py-3 px-2 bg-BG-second rounded-lg hover:bg-grey-field cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation()
                  setState(item.short)
                  setOpen(false)
                  if (replaceValue) {
                    replaceValue(item.code)
                  }
                }}
              >
                <div
                  className={cx(
                    "relative w-[1.625rem] h-5 px-[0.8125rem] py-2.5",
                    "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.625rem] *:h-5",
                  )}
                >
                  {item.img()}
                </div>
                <span className="text-text-primary text-sm font-normal">
                  {item.name} {item.code}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    )
  },
)

InputCountry.displayName = "InputCountry"
export default InputCountry
