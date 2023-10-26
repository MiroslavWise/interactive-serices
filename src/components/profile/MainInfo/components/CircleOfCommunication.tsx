"use client"

import { useQuery } from "react-query"

import { IUserResponse } from "@/services/users/types/usersService"

import { BlockOther } from "./BlockOther"
import { NextImageMotion } from "@/components/common/Image"

import { serviceFriends } from "@/services/friends"

import styles from "../styles/circle-of-communication.module.scss"

export const CircleOfCommunication = ({ user }: { user: IUserResponse }) => {
    const { data } = useQuery({
        queryFn: () => serviceFriends.getId(user?.id!),
        queryKey: ["friends", `user=${user?.id!}`],
        enabled: !!user?.id,
    })

    console.log("data: ", data)

    return (
        <BlockOther label="Круг общения">
            <></>
            {/* {PEOPLES.map((item) => (
                <div key={item.assignment} className={styles.people}>
                    <NextImageMotion
                        src={item.src}
                        alt={item.assignment}
                        width={33}
                        height={33}
                        className={styles.img}
                    />
                </div>
            ))}
            <div className={styles.more}>
                <p>12+</p>
            </div> */}
        </BlockOther>
    )
}
