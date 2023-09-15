"use client"

import { useMemo } from "react"
import { useQuery } from "react-query"

import type { TItemsAdress } from "./types/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { ItemLIAdress } from "./ItemLIAdress"

import { useAuth } from "@/store/hooks"
import { serviceAddresses } from "@/services/addresses"

import styles from "./styles/style.module.scss"

export const ItemsAdress: TItemsAdress = ({}) => {
    const { userId, addresses } = useAuth()
    const { data, isLoading, error } = useQuery(["addresses", userId], () =>
        serviceAddresses.getAddresses({}),
    )

    const listAdress: IAddressesResponse[] = useMemo(() => {
        if (addresses && addresses?.length > 0) {
            return addresses
        }
        return []
    }, [addresses])

    return (
        <ul className={styles.containerItemsAdress}>
            {listAdress.map((item) => (
                <ItemLIAdress
                    key={`${item.id}_adress`}
                    active={item.enabled!}
                    item={item}
                />
            ))}
            {listAdress.length < 5 ? <ItemLIAdress active={false} /> : null}
        </ul>
    )
}
