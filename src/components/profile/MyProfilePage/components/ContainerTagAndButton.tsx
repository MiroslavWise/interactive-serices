"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import type { TContainerTagAndButton } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"

import { useAddress } from "@/helpers"
import { useVisibleNewServiceBarterRequests } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ContainerTagAndButton: TContainerTagAndButton = ({
    isOfferOrRequest,
    setIsOfferOrRequest,
}) => {
    const { setIsVisibleNewServiceBarterRequests } =
        useVisibleNewServiceBarterRequests()
    const { isAddresses } = useAddress()

    function handle(value: "offer" | "request") {
        setIsOfferOrRequest(value)
    }

    return (
        <div data-mobile={isMobile} className={styles.containerTagAndButton}>
            <h4>
                Мои{" "}
                <span
                    data-active={isOfferOrRequest === "offer"}
                    onClick={() => handle("offer")}
                >
                    предложения
                </span>{" "}
                и{" "}
                <span
                    data-active={isOfferOrRequest === "request"}
                    onClick={() => handle("request")}
                >
                    запросы
                </span>
            </h4>
            <ButtonFill
                type="primary"
                label="Добавить"
                classNames={styles.widthButton}
                suffix={
                    <Image
                        src="/svg/plus.svg"
                        alt="plus"
                        width={16}
                        height={16}
                    />
                }
                handleClick={() => {
                    if (isAddresses) {
                        setIsVisibleNewServiceBarterRequests(true)
                    }
                }}
            />
        </div>
    )
}
