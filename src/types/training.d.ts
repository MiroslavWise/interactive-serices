interface IThreadsBarter {
    id: number
    typeId: number | number[] //barterId | chatId | offerId
    members: number[]
    title: string
    created: Date
    updated: Date
    enabled: boolean
    type: "barter" | "chat" | "offer"
}
