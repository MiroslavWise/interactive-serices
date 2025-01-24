"use client"

import { type Dispatch, useEffect, useState } from "react"
import ResponsivePagination from "react-responsive-pagination"

import "react-responsive-pagination/themes/classic.css"

interface IProps {
  /**
   * Общее кол-во записей
   *  @default 0 */
  total?: number
  /**
   * Номер страницы
   * @default 1 */
  page: number
  onChange: Dispatch<number>
  /**
   * Кол-во записей на страницу
   * @default 10 */
  pageCount?: number
}

function Pagination({ page = 1, pageCount = 10, total = 0, onChange }: IProps) {
  const [pagesTotal, setPagesTotal] = useState(0)

  useEffect(() => {
    if (total) {
      setPagesTotal(Math.ceil(total / pageCount))
    }
  }, [total])

  return <ResponsivePagination aria-label="Pagination" current={page} total={pagesTotal} onPageChange={(event) => onChange(event)} />
}

export default Pagination
