import type { FC, ReactNode, Dispatch, SetStateAction } from 'react'

import type { ISegmentValues } from 'types/general'

interface ISegments{
        values: ISegmentValues[]
        active: ISegmentValues
        setActive: Dispatch<SetStateAction<ISegmentValues>>
        type: 'primary' | 'optional-1'
}

export type TSegments = FC<ISegments>