"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { IQueryOffersCategories, IResponseOffersCategories } from "@/services/offers-categories/types"

import { Button } from "@/components/common"
import IconEdit from "@/components/icons/IconEdit"
import IconTrashBlack from "@/components/icons/IconTrashBlack"

import { getOffersCategories } from "@/services"

interface IPropRow extends IResponseOffersCategories {}

const Row = ({ id, title, slug, provider }: IPropRow) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td>{provider}</td>
    <td>{slug}</td>
    <td>
      <button type="button">
        <IconEdit />
      </button>
      <button type="button">
        <IconTrashBlack />
      </button>
    </td>
  </tr>
)

const LoadRow = () => (
  <tr data-load>
    <td />
    <td>
      <span />
    </td>
    <td>
      <span />
    </td>
    <td>
      <span />
    </td>
    <td />
  </tr>
)

function TableRows() {
  const [page, setPage] = useState(1)

  const query = useMemo(() => {
    const q: IQueryOffersCategories = {
      limit: 15,
      page: page,
    }

    return q
  }, [page])

  const { data, isLoading } = useQuery({
    queryFn: () => getOffersCategories({ query: query }),
    queryKey: ["offers-categories", query],
  })

  const list = data?.res || []
  const total = data?.meta?.total || 0

  const maxPage = Math.ceil(total / 15) | 1
  const onIncrement = () => setPage((_) => (_ < maxPage - 1 ? _ + 1 : _))
  const onDecrement = () => setPage((_) => (_ <= 1 ? 1 : _ - 1))

  return (
    <>
      <tbody>
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => <LoadRow key={`::key::load::item::${item}::`} />)
          : list.map((item) => <Row key={`::key::item::row::${item.id}::`} {...item} />)}
      </tbody>
      <tfoot>
        <div data-buttons>
          <Button type="button" typeButton="fill-primary" label="Предыдущая" onClick={onDecrement} disabled={page <= 1} />
          <Button type="button" typeButton="fill-primary" label="Следующая" onClick={onIncrement} disabled={page >= maxPage} />
        </div>
        <span>{total || 0}</span>
      </tfoot>
    </>
  )
}

TableRows.displayName = "TableRows"
export default TableRows
