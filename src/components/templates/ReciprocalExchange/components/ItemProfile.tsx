import { type IGetProfileIdResponse } from "@/services/profile/types"
import { type IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import Avatar from "@avatar"
import { GeoTagging } from "@/components/common"

import styles from "../styles/profile.module.scss"

export const ItemProfile = ({ profile, geo }: { profile: IGetProfileIdResponse; geo: IAddressesResponse }) => {
  return (
    <div className={styles.container}>
      <Avatar className="w-11 h-11 p-[1.375rem] rounded-[0.625rem]" image={profile?.image} />
      <div data-info>
        <div data-names>
          <h4>
            {profile?.firstName || "Имя"} {profile?.lastName || "Фамилия"}
          </h4>
          <img src="/svg/verified-tick.svg" alt="verified" width={16} height={16} />
        </div>
        {geo && <GeoTagging location={geo?.additional!} fontSize={12} />}
      </div>
    </div>
  )
}
