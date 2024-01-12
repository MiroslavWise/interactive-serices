"use client"

import { memo, useEffect, useRef, useState } from "react"

import styles from "./styles/style.module.scss"

export const CursorProfile = memo(function CursorProfile() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const body = document.getElementById("body-layout")

        function cursorPosition(event: MouseEvent) {
            const x = event.clientX
            const y = event.clientY
            if (ref.current) {
                ref.current.style.transform = `translate(${x}px, ${y}px)`
            }
        }

        body?.addEventListener("mousemove", cursorPosition)

        return () => body?.removeEventListener("mousemove", cursorPosition)
    }, [ref])

    return <div className={styles.container} ref={ref} />
})
