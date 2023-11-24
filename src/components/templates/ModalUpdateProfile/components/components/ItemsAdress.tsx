"use client"

import { useMemo } from "react"

import type { TItemsAdress } from "./types/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { ItemLIAdress } from "./ItemLIAdress"

import { useAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ItemsAdress: TItemsAdress = ({}) => {
    const { addresses } = useAuth((_) => ({ addresses: _.addresses }))

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
            {!listAdress.length ? <ItemLIAdress active={false} /> : null}
        </ul>
    )
}
