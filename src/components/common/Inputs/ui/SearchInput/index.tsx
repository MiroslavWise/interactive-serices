"use client"

import Image from "next/image"

import type { TSearchInput } from "./types"

import styles from "./style.module.scss"



export const SearchInput: TSearchInput = ({
  placeholder
}) => {

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src="/svg/search-lg.svg"
        alt="search"
        width={20}
        height={20}
      />
      <input
        type="text"
        placeholder={placeholder}
      />
    </div>
  )
}