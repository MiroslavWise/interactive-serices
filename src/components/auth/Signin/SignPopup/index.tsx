"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"
import { useState, useMemo, type ReactNode } from "react"

import type { IResetEmailData } from "./components/ui/types/types"

import {
    HeaderModal,
    ContentSignUp,
    ContentSignIn,
    ContentForgotPassword,
    ContentFirstLoginQR,
    ContentOtpCode,
    ContentResetPassword,
    ContentSelectVerification,
    ContentCodeVerification,
} from "@/components/auth/Signin/SignPopup/components"
import { ButtonClose } from "@/components/common/Buttons"
import { Glasses } from "../SignPopup/components/ui/components/Glasses"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks/useAuth"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function SignPopup() {
    const { isAuth } = useAuth()
    const [valueEmail, setValueEmail] = useState<IResetEmailData>({
        email: "",
        password_reset_expires: null,
        password_reset_token: "",
    })
    const [valueSecret, setValueSecret] = useState<{
        url: string
        secret: string
    }>({ url: "", secret: "" })
    const [typeVerification, setTypeVerification] = useState<
        "email" | "phone" | null
    >("email")
    const { type, visible, setVisibleAndType } = useVisibleAndTypeAuthModal()

    const content: ReactNode | null = useMemo(() => {
        if (type === null) return null
        return {
            SignIn: <ContentSignIn setValueSecret={setValueSecret} />,
            SignUp: <ContentSignUp />,
            ForgotPassword: (
                <ContentForgotPassword setValueEmail={setValueEmail} />
            ),
            FirstLoginQR: <ContentFirstLoginQR valueSecret={valueSecret} />,
            OtpCode: <ContentOtpCode />,
            SelectVerification: (
                <ContentSelectVerification
                    typeVerification={typeVerification}
                    setTypeVerification={setTypeVerification}
                />
            ),
            CodeVerification: (
                <ContentCodeVerification
                    typeVerification={typeVerification}
                    valueEmail={valueEmail}
                />
            ),
            ResetPassword: <ContentResetPassword />,
        }[type]
    }, [
        type,
        setValueSecret,
        valueSecret,
        setValueEmail,
        typeVerification,
        valueEmail,
    ])

    return !isAuth ? (
        isMobile ? (
            visible ? (
                <motion.div
                    className={cx("wrapper-fixed", styles.overviewMobile)}
                    data-visible={visible}
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                >
                    <ButtonClose
                        onClick={() =>
                            setVisibleAndType({
                                visible: false,
                                type: type,
                            })
                        }
                        position={{
                            right: 12,
                            top: 12,
                        }}
                    />
                    <div className={styles.contentMobile}>
                        <HeaderModal
                            email={valueEmail.email}
                            typeVerification={typeVerification}
                        />
                        {content}
                    </div>
                    <Glasses />
                </motion.div>
            ) : null
        ) : (
            <div className={cx(styles.overlay, visible && styles.visible)}>
                {visible ? (
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, visibility: "hidden" }}
                        animate={{ opacity: 1, visibility: "visible" }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, visibility: "hidden" }}
                    >
                        <ButtonClose
                            onClick={() =>
                                setVisibleAndType({
                                    visible: false,
                                    type: type,
                                })
                            }
                            position={{
                                right: 12,
                                top: 12,
                            }}
                        />
                        <div className={styles.content}>
                            <HeaderModal
                                email={valueEmail.email}
                                typeVerification={typeVerification}
                            />
                            {content}
                        </div>
                        <Glasses />
                    </motion.div>
                ) : null}
            </div>
        )
    ) : null
}
