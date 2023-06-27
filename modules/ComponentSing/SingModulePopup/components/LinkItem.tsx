import Image from "next/image"

import type { TLinkItem } from "../types"

import styles from "./styles/style.module.scss"

export const LinkItem: TLinkItem = ({src }) => {
        
        return (
                <div className={styles.itemLink}>
                        <Image
                                src={src}
                                alt={src}
                                height={24}
                                width={24}
                        />
                </div>
        )
}