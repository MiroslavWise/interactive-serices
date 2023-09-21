interface IStandardPropsPlace {
    time: string | Date
    title: string
    idPlace: string
    id: number | string
}

export interface IAlertBalloon extends IStandardPropsPlace {}

export interface IOfferBallon extends IStandardPropsPlace {}
export interface IDiscussionBallon extends IStandardPropsPlace {}
export interface IRequestBallon extends IStandardPropsPlace {}
