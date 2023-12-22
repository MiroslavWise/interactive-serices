"use client"

import { toast } from "react-toastify"
import { isMobile } from "react-device-detect"
import { type DispatchWithoutAction } from "react"
import { ButtonCircleGradient, ButtonDefault } from "@/components/common"
import { NextImageMotion } from "@/components/common/Image"

interface IValue {
    message?: string
    userId?: number
    id?: number
    photo?: string
    name?: string
    username?: string
}

export const useToast = () => {
    const classNames: Record<TTypeToast, string> = {
        success: "toast-success",
        error: "toast-error",
        warning: "toast-warning",
        barter: "toast-barter",
        default: "toast-default",
        message: "toast-message",
    }

    function on(value: IValue, type?: TTypeToast, onClick?: DispatchWithoutAction) {
        const buttons = (
            <div data-buttons>
                <ButtonDefault
                    label="Посмотреть"
                    handleClick={() => {
                        if (onClick) onClick()
                    }}
                />
                <ButtonCircleGradient type="primary" icon="/svg/x-close-primary.svg" />
            </div>
        )

        const message = (
            <div className="toast-data-render" data-mobile={isMobile}>
                {type === "message" ? (
                    <>
                        <div data-content className="message">
                            <div data-user>
                                <NextImageMotion src={value?.photo!} alt="avatar" height={40} width={40} />
                                <i>
                                    {value?.name} {value?.username ? <span>@{value?.username}</span> : null}
                                </i>
                            </div>
                            <p>{value?.message || ""}</p>
                        </div>
                        {buttons}
                    </>
                ) : (
                    <div data-content>
                        <p>{value?.message || ""}</p>
                    </div>
                )}
            </div>
        )

        return toast(message, {
            toastId: value.id || Math.random(),
            position: isMobile ? "bottom-center" : "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: classNames?.[type!] || classNames.default,
        })
    }

    return { on }
}

type TTypeToast = "success" | "error" | "warning" | "default" | "barter" | "message"
