"use client";

import { useForm } from "react-hook-form";

import type { TSearchField } from "./types";

import styles from "./search-field.module.scss";
import { KeyboardEvent } from "react";
import Image from "next/image";

export const SearchField: TSearchField = ({ onSearch }) => {
  const { register, watch, handleSubmit } = useForm<{ input: string }>();

  const handleSearch = (values: { input: string }) => {
    onSearch(values.input);
  }

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement | HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleSubmit(handleSearch);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleSearch)}>
        <input
          type="text"
          placeholder="Что Вы ищете?"
          className={styles.input}
          {...register("input")}
          onKeyDown={e => handlePressEnter(e)}
        />
      </form>
      <Image
        src={watch("input") ? "/svg/search-fill.svg" : "/svg/search-gray.svg"}
        alt="search"
        width={20}
        height={20}
        className={styles.searchImg}
      />
      <div
        className={styles.filtersDiv}
        onClick={() => {}}
      >
        <Image
          src="/svg/sliders-01.svg"
          alt="slide"
          width={20}
          height={20}
        />
      </div>
    </div>
  )
}