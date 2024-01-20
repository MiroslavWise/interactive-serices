import { isMobile } from "react-device-detect"

import { Badges } from "@/components/profile/StatisticAndFeedback/components/Budges"
import { MobileInteractive, MobileMainInfo, StatisticAndFeedback, MainInfo } from "@/components/profile"

import { IUserResponse } from "@/services/users/types/usersService"

import styles from "@/scss/page.module.scss"

export const UserIdPage = ({ id, user, ok }: { id: string; user: IUserResponse; ok: boolean }) => {
    return isMobile ? (
        <ul className={styles.containerMobile} id="user-id">
            <MobileMainInfo user={user!} />
            <Badges id={id} />
            <MobileInteractive />
        </ul>
    ) : (
        <section className={styles.container}>
            <MainInfo user={user!} />
            <StatisticAndFeedback id={id} />
        </section>
    )
}
