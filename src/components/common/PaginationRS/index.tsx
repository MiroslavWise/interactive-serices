"use client"

import Pagination from "rsuite/Pagination"
import { Dispatch, useEffect, useState } from "react"

interface IProps {
  total?: number
  pageSize?: number
  page: number
  onPage: Dispatch<number>
}

import "rsuite/Pagination/styles/index.css"

function PaginationRS({ total, pageSize = 12, page = 1, onPage }: IProps) {
  const [t, setT] = useState(total || 0)

  useEffect(() => {
    if (typeof total === "number") {
      setT(total)
    }
  }, [total])

  return <Pagination prev next size="lg" total={t} limit={pageSize} activePage={page} onChangePage={onPage} />
}

export default PaginationRS
