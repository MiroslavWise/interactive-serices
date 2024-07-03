import { FlagBY, FlagKZ, FlagRU } from "./icons-flags"

export enum EnumCountry {
  "ru" = "ru",
  "by" = "by",
  "kz" = "kz",
}

export interface IFlag {
  img: () => JSX.Element
  short: EnumCountry
  name: string
  code: string
  mask: string
  placeholder: string
  selectionStart: number
}

export const FLAGS: IFlag[] = [
  {
    img: FlagRU,
    short: EnumCountry.ru,
    name: "Россия",
    code: "+7",
    mask: "+7 (___) ___-__-__",
    placeholder: "+7 999 000-00-00",
    selectionStart: 2,
  },
  {
    img: FlagBY,
    short: EnumCountry.by,
    name: "Беларусь",
    code: "+375",
    mask: "+375 (__) ___-__-__",
    placeholder: "+375 (29) 000-00-00",
    selectionStart: 4,
  },
  {
    img: FlagKZ,
    short: EnumCountry.kz,
    name: "Казахстан",
    code: "+7",
    mask: "+7 (___) ___-__-__",
    placeholder: "+7 (999) 000-00-00",
    selectionStart: 2,
  },
]
