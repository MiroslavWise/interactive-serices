const arrayOne: number[] = []

for (let i = 1; i <= 18; i++) {
    arrayOne.push(i)
}

export const ICON_SET_OFFERS: number[] = [...arrayOne, 20, 21, 22, 23, 24, 54, 55, 57, 58, 66, 69, 77]

export const ICON_OBJECT_OFFERS: IIconObjectOffers = {
    ...ICON_SET_OFFERS.reduce(
        (obj, value) => ({
            ...obj,
            [value]: `/svg/category/${value}.svg`,
        }),
        { default: "/svg/category/default.svg" },
    ),
}

interface IIconObjectOffers {
    default: string
    [key: string | number]: string
}

export function IconCategory(id: string | number) {
    return ICON_OBJECT_OFFERS.hasOwnProperty(id!) ? ICON_OBJECT_OFFERS[id!] : ICON_OBJECT_OFFERS.default
}
