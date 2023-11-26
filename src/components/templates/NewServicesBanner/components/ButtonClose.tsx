import Image from "next/image"

import { useVisibleBannerNewServices } from "@/store/hooks/useVisible"

import styles from "./styles/styles.module.scss"

export const ButtonClose = () => {
    const dispatchNewServicesBanner = useVisibleBannerNewServices(
        ({ dispatchNewServicesBanner }) => dispatchNewServicesBanner,
    )
    return (
        <div
            className={styles.containerClose}
            onClick={() => dispatchNewServicesBanner(false)}
        >
            <Image
                src="/svg/x-close.svg"
                alt="x"
                width={20}
                height={20}
                unoptimized
            />
        </div>
    )
}
