"use client"

import { useQuery } from "@tanstack/react-query"
import { createContext, type PropsWithChildren, useContext } from "react"

import { IUserOffer } from "@/services/offers/types"

import { clg } from "@console"
import { useAuth } from "@/store"
import { getCompanyId, ICompanyExtend } from "@/services/companies"

const create = createContext<IContext>({
  isLoading: true,
  users: [],

  company: null,
  refetch: () => Promise.resolve(),
})

function ContextCompany({ children }: PropsWithChildren) {
  const { company: c } = useAuth(({ user }) => user) ?? {}
  const { id } = c ?? {}

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryFn: () => getCompanyId(id!),
    queryKey: ["company", id],
    enabled: !!id,
    retry: (count) => {
      clg("data?.error: ", data?.error, "warning")
      if (!!data?.error) {
        return count >= 3 ? false : true
      } else {
        return false
      }
    },
    retryDelay: 2_000,
  })

  const company = data?.data!
  const users = data?.data?.users ?? []

  return (
    <create.Provider
      value={{
        company: company,
        isLoading: isFetching || isLoading,
        users: users,
        refetch: refetch,
      }}
    >
      {children}
    </create.Provider>
  )
}

export const useContextCompany = () => useContext(create)

export default ContextCompany

interface IContext {
  isLoading: boolean
  users: IUserOffer[]
  company: ICompanyExtend | null

  refetch(): Promise<any>
}
