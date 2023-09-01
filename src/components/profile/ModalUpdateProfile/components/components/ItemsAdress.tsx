"use client"

import { useMemo, useState } from "react"
import { useQuery } from "react-query"

import type { TItemsAdress } from "./types/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { ItemLIAdress } from "./ItemLIAdress"

import { useAuth } from "@/store/hooks"
import { serviceAddresses } from "@/services/addresses"

import styles from "./styles/style.module.scss"

export const ItemsAdress: TItemsAdress = ({ }) => {
    const { userId } = useAuth()
    const { data, isLoading, error } = useQuery(["addresses", userId], () => serviceAddresses.getAddresses({}))

    const listAdress: IAddressesResponse[] = useMemo(() => {
        return data?.res || []
    }, [data])

    return (
        <ul className={styles.containerItemsAdress}>
            {
                listAdress.map(item => (
                    <ItemLIAdress
                        key={`${item.id}_adress`}
                        active={item.enabled!}
                    />
                ))
            }
            {listAdress.length < 5 ? <ItemLIAdress active={false} /> : null}
        </ul>
    )
}