"use client"

import { useQuery } from "@tanstack/react-query"

import UpdateCompanyInfo from "./components/UpdateCompanyInfo"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { getCompanyId } from "@/services/companies"

import styles from "./styles/spinner.module.scss"

export default () => {
  const { company: c } = useAuth(({ user }) => user) ?? {}
  const { id } = c ?? {}

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryFn: () => getCompanyId(id!),
    queryKey: ["company", id],
    enabled: !!id,
  })

  const company = data?.data

  return (
    <section className="relative w-full bg-BG-second h-full px-5">
      {isLoading || isFetching ? (
        <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img className={cx("w-20 h-20 rotate-0", styles.img)} src="/svg/spinner.svg" alt="loading" width={50} height={50} />
        </article>
      ) : !!company ? (
        <UpdateCompanyInfo company={company!} refetch={refetch} />
      ) : null}
    </section>
  )
}
