import { isMobile } from "react-device-detect"

import type { IUserResponse } from "@/services/users/types"

import { Badges } from "@/components/profile/StatisticAndFeedback/components/Budges"
import { MobileInteractive, MobileMainInfo, StatisticAndFeedback, MainInfo } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export const UserIdPage = ({ id, user, ok, isLoading }: { id: string; user: IUserResponse; ok: boolean; isLoading: boolean }) => {
    return isMobile ? (
        <ul className={styles.containerMobile} id="user-id">
            <MobileMainInfo user={user!} />
            <Badges id={id} />
            <MobileInteractive user={user} />
        </ul>
    ) : (
        <section className={styles.container}>
            <MainInfo user={user!} />
            <StatisticAndFeedback id={id} />
        </section>
    )
}
