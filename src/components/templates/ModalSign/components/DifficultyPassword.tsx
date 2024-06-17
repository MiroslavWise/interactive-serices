import { useMemo, useRef } from "react"

import { passwordValidation_0_9, passwordValidation_A_Z, passwordValidation_a_z } from "../utils/password.schema"
import { cx } from "@/lib/cx"

const specReg = new RegExp(/[?!@#$%^&*-=+/<>]/g)

const DESCRIPTION = "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и быть не менее 6 символов."

type TDifficulty = "weak" | "medium" | "complex"

const PASSWORD_DIFFICULTY: Record<TDifficulty, string> = {
  weak: "Слабый пароль",
  medium: "Ненадёжный пароль, добавьте символов",
  complex: "Надёжный пароль",
}

const COLOR_DIFFICULTY_TEXT: Record<TDifficulty, string> = {
  weak: "text-text-error",
  medium: "text-text-attention",
  complex: "text-more-green",
}
const COLOR_DIFFICULTY_BG: Record<TDifficulty, string> = {
  weak: "var(--text-error)",
  medium: "var(--text-attention)",
  complex: "var(--more-field)",
}

import styles from "../styles/difficulty.module.scss"

function DifficultyPassword({ value = "" }: { value: string }) {
  const trim = value.trim()
  const ref = useRef<HTMLDivElement>(null)

  const state: TDifficulty = useMemo(() => {
    let obj = {
      _a_z: 0,
      _A_Z: 0,
      _0_9: 0,
      _length: 0,
      _length_8: 0,
      _length_10: 0,
      _length_12: 0,
      spec: 0,
    }

    if (passwordValidation_a_z.test(trim)) {
      passwordValidation_a_z.lastIndex = 0
      obj = {
        ...obj,
        _a_z: 1,
      }
    }
    if (passwordValidation_A_Z.test(trim)) {
      passwordValidation_A_Z.lastIndex = 0
      obj = {
        ...obj,
        _A_Z: 1,
      }
    }
    if (passwordValidation_0_9.test(trim)) {
      passwordValidation_0_9.lastIndex = 0
      obj = {
        ...obj,
        _0_9: 1,
      }
    }
    if (specReg.test(trim)) {
      specReg.lastIndex = 0
      obj = {
        ...obj,
        spec: 1,
      }
    }
    const length = trim.length

    if (length >= 6) {
      obj = {
        ...obj,
        _length: 1,
      }
    }
    if (length >= 8) {
      obj = {
        ...obj,
        _length_8: 1,
      }
    }
    if (length >= 10) {
      obj = {
        ...obj,
        _length_10: 1,
      }
    }
    if (length >= 12) {
      obj = {
        ...obj,
        _length_12: 1,
      }
    }

    const countSymbol = Object.values({ 1: obj._a_z, 2: obj._A_Z, 3: obj._0_9, 4: obj._length }).reduce((acc, current) => acc + current, 0)
    const allCount = Object.values(obj).reduce((acc, current) => acc + current, 0)

    const percent = allCount ? (allCount / 8) * 100 : 0

    const status = [2, 3].includes(countSymbol) ? "medium" : countSymbol >= 4 ? "complex" : "weak"

    if (ref.current) {
      ref.current.style.setProperty("--w", `${percent}%`)
      ref.current.style.setProperty("--color", COLOR_DIFFICULTY_BG[status])
    }

    return status
  }, [trim])

  return (
    <article className="w-full flex flex-col gap-0.625">
      <section className={cx("w-full flex flex-col gap-1", trim.length === 0 && "invisible hidden")}>
        <div
          ref={ref}
          className={cx(
            styles.div,
            "relative w-full h-1 rounded-sm bg-grey-stroke-light",
            "before:h-full before:absolute before:left-0 before:top-0 before:rounded-sm before:z-10",
          )}
        />
        <span className={`text-xs font-medium ${COLOR_DIFFICULTY_TEXT[state]}`}>{PASSWORD_DIFFICULTY[state]}</span>
      </section>
      <p className="text-text-primary text-xs font-normal !text-left">{DESCRIPTION}</p>
    </article>
  )
}

DifficultyPassword.displayName = "DifficultyPassword"
export default DifficultyPassword
