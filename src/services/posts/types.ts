import { IAddressesResponse } from "../addresses/types/serviceAddresses"
import { IUserOffer as IUserSmall } from "../offers/types"
import { IResponse } from "../request"

export interface IBodyPost {
  title: string
  slug: string
  addresses: number[]
}

export interface IPosts {
  id: number
  enabled: boolean
  title: string //varChar - 256
  slug: string //varChar - 256
  userId: number
  user: IUserSmall
  addresses: IAddressesResponse[]
  updated: string
  created: string
  questionnaireId?: number //id опросника
  questionnaire: IQuestionnaire
  archived: boolean //default - false
  archive: string //время, когда запись была отправлена в архив
}

interface IQuestionnaire {
  id: number
  title: string
  description: string
  enabled: boolean
  userId: number
  user: IUserSmall
  updated: string
  created: string
  questionsIds: number[]
  questions: IQuestion[]
  isOptionChange: boolean // Возможность изменить свой ответ
  isManyVariants: boolean // при true - множественный выбор
}

interface IQuestion {
  id: number
  name: string
  userAnswers: number[] // {{user_id}}[]
}

export type TPostPosts = (body: IBodyPost) => Promise<IResponse<IPosts>>
