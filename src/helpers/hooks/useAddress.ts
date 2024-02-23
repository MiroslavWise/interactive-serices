"use client"

import { useMemo } from "react"

import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { useAuth } from "@/store"

export const useAddress = () => {
  const addresses = useAuth(({ addresses }) => addresses)

  const idsAddresses: number[] | null = useMemo(() => {
    if (!addresses) return null
    if (Array.isArray(addresses) && addresses.length === 0) return null
    const array: number[] = addresses.map((item) => item.id)
    return array
  }, [addresses])

  const coordinatesAddresses: number[][] | null = useMemo(() => {
    if (!addresses) return null
    if (Array.isArray(addresses) && addresses.length === 0) return null
    const array: number[][] = addresses.map((item) => (item.coordinates ? item.coordinates.split(" ").map(Number) : [0, 0]))
    return array
  }, [addresses])

  const addressMain: IAddressesResponse | null = useMemo(() => {
    if (addresses?.length) {
      return addresses?.find((item) => item?.addressType === "main")! || null
    }

    return null
  }, [addresses])
  const addressMainMany: IAddressesResponse[] | null = useMemo(() => {
    if (addresses?.length) {
      return addresses?.filter((item) => item?.addressType === "main")! || null
    }

    return null
  }, [addresses])

  const isAddresses: boolean = Array.isArray(addresses) && addresses?.length > 0 && !!addressMain

  return {
    idsAddresses,
    isAddresses,
    coordinatesAddresses,
    addressMain,
    addressMainMany,
  }
}
