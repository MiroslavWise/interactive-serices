import { type THeader } from "./types/types"

import { Segments } from "@/components/common/Segments"

import { SEGMENTS } from "../constants"

export const Header: THeader = ({ value, setValue }) => {
  return (
    <header className="w-full flex flex-col items-center gap-4 px-5">
      <h4 className="text-text-primary text-center text-lg font-semibold">Мои обмены</h4>
      <Segments type="primary" VALUES={SEGMENTS} active={value} setActive={setValue} isBorder />
    </header>
  )
}
