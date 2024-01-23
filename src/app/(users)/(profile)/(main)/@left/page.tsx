"use client"

import { isMobile } from "react-device-detect"

import { LeftAsideProfile } from "@/components/profile"

export default function LeftDataProfile() {
    return !isMobile ? <LeftAsideProfile /> : null
}
