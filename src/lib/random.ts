

export const randomArrayTwoNumber = () => [55.75 + Number(`${(Math.random() < 0.5 ? "+" : "-")}${Math.random() / 100}`), 37.67 + Number(`${(Math.random() < 0.5 ? "+" : "-")}${Math.random() / 100}`)] as [number, number]