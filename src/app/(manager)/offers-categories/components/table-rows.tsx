"use client"

import { useQuery } from "@tanstack/react-query"

import IconEdit from "@/components/icons/IconEdit"

import { serviceOffersCategories } from "@/services"
import { IResponseOffersCategories } from "@/services/offers-categories/types"

interface IPropRow extends IResponseOffersCategories {}

const Row = ({ id, title, slug }: IPropRow) => (
  <tr>
    <td></td>
    <td>{title}</td>
    <td>{slug}</td>
    <td>
      <button type="button">
        <IconEdit />
      </button>
    </td>
  </tr>
)

function TableRows() {
  const { data } = useQuery({
    queryFn: () => serviceOffersCategories.get(),
    queryKey: ["offers-categories"],
  })

  const list = data?.res || []

  return list.map((item) => <Row key={`::ket`} {...item} />)
}

TableRows.displayName = "TableRows"
export default TableRows
