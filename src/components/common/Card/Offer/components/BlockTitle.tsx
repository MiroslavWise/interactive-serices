import { useMemo } from "react"
import Image from "next/image"

import type { TBlockTitle } from "./types/types"

import { BlockCoin } from "./BlockCoin"
import { GeoTagging } from "@/components/common/GeoTagging"
import { NextImageMotion } from "@/components/common/Image"

import { usePush } from "@/helpers"

import styles from "./styles/style.module.scss"

export const BlockTitle: TBlockTitle = ({ profile, addresses, id: userId }) => {
    const { handlePush } = usePush()

    const geo = useMemo(() => {
        if (!addresses) {
            return null
        }
        if (Array.isArray(addresses) && !addresses.length) {
            return null
        }
        return addresses[0]?.additional
    }, [addresses])

    return (
        <div className={styles.title}>
            <div
                className={styles.avatar}
                onClick={() => handlePush(`/user?id=${userId}`)}
            >
                <NextImageMotion
                    src={profile?.image?.attributes?.url!}
                    alt="avatar"
                    width={400}
                    height={400}
                    className={styles.photo}
                />
                <div className={styles.rating}>
                    <Image
                        src="/svg/star.svg"
                        alt="stars"
                        width={9.8}
                        height={9.8}
                    />
                    <p>{4.5}</p>
                </div>
            </div>
            <div className={styles.nameGeo}>
                <h4>
                    {profile?.firstName || ""} {profile?.lastName || ""}
                </h4>
                {geo ? (
                    <GeoTagging size={14} fontSize={12} location={geo} />
                ) : null}
                {/* <BlockCoin coin={300} /> */}
            </div>
        </div>
    )
}
