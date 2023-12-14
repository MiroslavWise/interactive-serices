"use client"

import { isMobile } from "react-device-detect"

import { BannerAboutMobile } from "./components/Mobile"
import { BannerAboutDesktop } from "./components/Desktop"

export const BannerAbout = () => (isMobile ? <BannerAboutMobile /> : <BannerAboutDesktop />)
