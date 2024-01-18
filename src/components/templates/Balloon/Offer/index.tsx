import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Button, ButtonClose } from "@/components/common"

import { ItemProfile } from "./components/ItemProfile"
import { ItemProposal } from "./components/ItemProposal"

import { cx } from "@/lib/cx"
import { dispatchAuthModal, dispatchBallonOffer, dispatchReciprocalExchange, useAuth, useBalloonOffer, useOffersCategories } from "@/store/hooks"
import { serviceUser } from "@/services/users"
import { ICON_OBJECT_OFFERS } from "@/lib/icon-set"

import styles from "./styles/style.module.scss"
import common from "../styles/general.module.scss"
import { flushSync } from "react-dom"

export const BalloonOffer = () => {
    const userId = useAuth(({ userId }) => userId)
    const categories = useOffersCategories(({ categories }) => categories)
    const visible = useBalloonOffer(({ visible }) => visible)
    const offer = useBalloonOffer(({ offer }) => offer)

    const categoryCurrent = categories?.find((item) => item?.id === offer?.categoryId)

    const { data } = useQuery({
        queryFn: () => serviceUser.getId(offer?.userId!),
        queryKey: ["user", offer?.userId!],
        enabled: !offer?.userId,
    })

    const { res } = data ?? {}
    const { profile } = res ?? {}

    function handle() {
        if (!userId) {
            dispatchAuthModal({
                visible: true,
                type: "SignIn",
            })
            flushSync(() => {
                dispatchBallonOffer({ visible: false })
            })
            return
        } else if (!!userId && userId !== offer?.userId) {
            dispatchReciprocalExchange({
                visible: true,
                offer: offer!,
                type: "current",
            })
            flushSync(() => {
                dispatchBallonOffer({ visible: false })
            })
            return
        }
    }

    return (
        <div className={cx("wrapper-fixed", styles.wrapper, common.wrapper)} data-visible={visible}>
            <section data-section-modal>
                <header>
                    <div data-category-img>
                        {offer?.categoryId ? (
                            <img
                                src={ICON_OBJECT_OFFERS.hasOwnProperty(offer?.categoryId) ? ICON_OBJECT_OFFERS[offer?.categoryId!] : ICON_OBJECT_OFFERS.default}
                                alt="category"
                                width={16}
                                height={16}
                            />
                        ) : null}
                    </div>
                    <h3>{categoryCurrent?.title}</h3>
                </header>
                <ButtonClose position={{}} onClick={() => dispatchBallonOffer({ visible: false })} />
                <div data-container>
                    <ItemProfile profile={profile!} />
                    <ItemProposal />
                    <div data-buttons>
                        <Button type="button" typeButton="fill-primary" label="Откликнуться" onClick={handle} disabled={!!userId && userId === offer?.userId} />
                        {userId && userId !== offer?.userId ? (
                            <Link
                                data-circle
                                href={{ pathname: "/messages", query: { user: offer?.userId } }}
                                onClick={() => {
                                    dispatchBallonOffer({ visible: false })
                                }}
                            >
                                <img src="/svg/message-dots-circle.svg" alt="chat" width={20} height={20} />
                            </Link>
                        ) : null}
                    </div>
                </div>
            </section>
        </div>
    )
}
