export function WalletPay() {
  return (
    <div className="w-full grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 items-start p-4 bg-BG-second rounded-2xl border border-solid border-grey-stroke-light">
      <div className="relative w-6 h-6 p-3">
        <img
          src="/svg/wallet-pay.svg"
          alt="pay"
          width={24}
          height={24}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6"
        />
      </div>
      <p className="text-text-primary text-sm font-normal">
        Пользователи Sheira смогут не только меняться с вами, но и покупать ваши услуги. Для обсуждения условий наш сервис автоматически
        создаст чат между вами и покупателем.
      </p>
    </div>
  )
}
