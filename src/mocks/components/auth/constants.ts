export const MOCK_ACHIEVEMENTS: string[] = [
    "/svg/achievements/arms.svg",
    "/svg/achievements/gold-medal.svg",
    "/svg/achievements/shield-crown.svg",
    "/svg/achievements/shield.svg",
]

export const BADGES: {
    title: string
    total: number
    // rating_movement?: "up" | "down"
}[] = [
    {
        title: "Предложения",
        total: 24,
        // rating_movement: "up",
    },
    {
        title: "Обмены",
        total: 18,
        // rating_movement: "down",
    },
    {
        title: "Рейтинг",
        total: 4.5,
        // rating_movement: "up",
    },
]

export const MOCKS_REVIEW_VALUES: {
    user: string
    date: string
    rate: number
    description: string
    images: string[]
}[] = [
    {
        user: "@tasnim",
        date: "20/06/2022",
        rate: 4,
        description:
            "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
        images: [
            "/mocks/Frame_50127758.png",
            "/mocks/Frame_50127759.png",
            "/mocks/Frame_50127759.png",
            "/mocks/Frame_50127759.png",
            "/mocks/Frame_50127759.png",
            "/mocks/Frame_50127759.png",
        ],
    },
    {
        user: "@tasnim",
        date: "20/06/2022",
        rate: 3,
        description:
            "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
        images: [],
    },
    {
        user: "@tasnim",
        date: "20/06/2022",
        rate: 5,
        description:
            "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
        images: ["/mocks/Frame_50127758.png", "/mocks/Frame_50127759.png"],
    },
    {
        user: "@tasnim",
        date: "20/06/2022",
        rate: 4.5,
        description:
            "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
        images: ["/mocks/Frame_50127758.png", "/mocks/Frame_50127759.png"],
    },
    {
        user: "@tasnim",
        date: "20/06/2022",
        rate: 4.5,
        description:
            "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
        images: ["/mocks/Frame_50127758.png", "/mocks/Frame_50127759.png"],
    },
    {
        user: "@tasnim",
        date: "20/06/2022",
        rate: 4.5,
        description:
            "Lorem Ipsum - это просто фиктивный текст, используемый в полиграфии и типографском деле. Lorem Ipsum является стандартным фиктивным текстом в полиграфии с 1500-х годов, когда неизвестный печатник взял галилейный шрифт и зашифровал его.",
        images: ["/mocks/Frame_50127758.png", "/mocks/Frame_50127759.png"],
    },
]
