import Link from "next/link"

import IconHelpTelegram from "@/components/icons/IconHelpTelegram"

const LABEL = "Обратная связь"

function ButtonHelpTelegram() {
  return (
    <Link
      title={LABEL}
      aria-label={LABEL}
      aria-labelledby={LABEL}
      href="https://t.me/sheirainfo"
      target="_blank"
      className="fixed bottom-6 left-3 w-10 h-10 bg-text-accent rounded-[1.25rem] z-[888] group hover:w-fit hidden md:flex flex-row"
    >
      <IconHelpTelegram />
      <div className="invisible hidden pl-12 group-hover:flex group-hover:visible h-10 pr-4 items-center justify-center">
        <span className="text-text-button text-sm font-normal">{LABEL}</span>
      </div>
    </Link>
  )
}

ButtonHelpTelegram.displayName = "ButtonHelpTelegram"
export default ButtonHelpTelegram
