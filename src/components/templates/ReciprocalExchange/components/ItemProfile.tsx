import type { IGetProfileIdResponse } from "@/services/profile/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { GeoTagging, NextImageMotion } from "@/components/common"

import styles from "../styles/profile.module.scss"

export const ItemProfile = ({ profile, geo }: { profile: IGetProfileIdResponse; geo: IAddressesResponse }) => {
    return (
        <div className={styles.container}>
            <div data-img>
                <NextImageMotion src={profile?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
            </div>
            <div data-info>
                <div data-names>
                    <h4>
                        {profile?.firstName || ""} {profile?.lastName || ""}
                    </h4>
                    <img src="/svg/verified-tick.svg" alt="verified" width={16} height={16} />
                </div>
                {geo && <GeoTagging location={geo?.additional!} size={14} fontSize={12} />}
            </div>
        </div>
    )
}
