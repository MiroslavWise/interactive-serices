import { EnumHelper } from "@/types/enum"

import IconHelp from "@/components/icons/IconHelp"

function ComponentHelper({ urgent }: { urgent: EnumHelper }) {
  return (
    <article className="w-full [background:linear-gradient(101deg,_#F56B59_0%,_#FA4E80_100%)] rounded-t-3xl md:rounded-t-[2rem] flex flex-row items-center justify-center gap-2 py-2 px-2.5">
      <div className="w-5 h-5 relative *:w-5 *:h-5">
        <IconHelp />
      </div>
      <span className="text-text-button text-sm font-medium">Помощь Курску</span>
    </article>
  )
}

export default ComponentHelper
