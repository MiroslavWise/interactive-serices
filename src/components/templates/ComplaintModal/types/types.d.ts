export interface IValuesForm {
    subject: string
    text: string
    type: TValue
    email: string
}

type TValue = "fraud" | "other" | "insult" | "spam" | "demeanor"
