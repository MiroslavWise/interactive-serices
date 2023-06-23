'use client'

import { ButtonFill, ButtonDefault } from 'components'



export const TestComponent = ({ }) => {
        
        return (
                <div>
                        <ButtonFill
                                label='Кнопка'
                                handleClick={() => { }}
                                type='secondary'
                        />
                        <ButtonDefault
                                label='Кнопка'
                                handleClick={() => { }}
                        />
                </div>
        )
}