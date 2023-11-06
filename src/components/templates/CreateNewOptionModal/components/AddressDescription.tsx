import type { TAddressDescription } from "./types/types"

import styles from "./styles/address-description.module.scss"

export const AddressDescription: TAddressDescription = ({ address }) => {
    return (
        <h4 className={styles.h4}>
            По адресу: <i>{address}</i>
        </h4>
    )
}
