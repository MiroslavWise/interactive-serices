"use client"

import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs"

import { EnumTypeProvider } from "@/types/enum"

import { cx } from "@/lib/cx"
import { TLOffer } from "../utils/constants"

import styles from "../styles/link-nav-offer.module.scss"

interface IProps {
  q: TLOffer
  label: string
}

function OfferItemLink({ q, label }: IProps) {
  const [state, setState] = useQueryState(
    "type",
    parseAsStringEnum<EnumTypeProvider>(Object.values(EnumTypeProvider)).withDefault(EnumTypeProvider.offer),
  )
  const [_, setPage] = useQueryState("page", parseAsInteger)

  const is = state === q

  return (
    <a
      className={cx(styles.link, "relative no-underline cursor-pointer", is && styles.is)}
      onClick={() => {
        setState(q)
        setPage(null)
      }}
    >
      <span className={cx("text-sm font-medium transition-colors", is ? "text-text-accent" : "text-text-primary")}>{label}</span>
    </a>
  )
}

OfferItemLink.displayName = "OfferItemLink"
export default OfferItemLink
