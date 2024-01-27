"use client"

import { isMobile } from "react-device-detect"

import { LeftAsideProfile } from "@/components/profile"

export default function Default() {
    return !isMobile ? <LeftAsideProfile /> : null
}
