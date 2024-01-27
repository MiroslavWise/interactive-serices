export interface IValuesForm {
    comment: string
    type: TValue
}

type TValue = "fraud" | "other" | "insult" | "spam" | "demeanor"
