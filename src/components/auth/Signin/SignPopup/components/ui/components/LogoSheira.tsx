import { isMobile } from "react-device-detect"
import Image from "next/image"

export const LogoSheira = () => (
  <Image
    src="/logo/wordmark.svg"
    alt="sheira"
    width={isMobile ? 119 : 140}
    height={isMobile ? 31 : 37}
  />
)