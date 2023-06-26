'use client'

import { useState } from 'react'

import type { ISegmentValues } from 'types/general'

import { Segments } from 'components/Segments'
import { SearchField } from 'components/Inputs'
import { PeopleCard } from 'components/PeopleCard'

import styles from './style.module.scss'

const SERVICES: ISegmentValues[] = [
        {
                value: 'all',
                label: 'Все сервисы',
        },
        {
                value: 'offers',
                label: 'Предложения',
        },
        {
                value: 'requests',
                label: 'Запросы',
        },
]

const MOCK_DATA_PEOPLE: { photo: string, name: string, geo: string, services: { value: string, name: string }[], rate: number }[] = [
        {
                photo: '/mocks/maria.png',
                name: 'Мария Иванова',
                geo: 'Cir. Shiloh, Hawaii 81063',
                services: [
                        {
                                value: 'nails',
                                name: 'Nails',
                        },
                        {
                                value: 'hair',
                                name: 'Hair Cut',
                        }
                ],
                rate: 5,
        },
        {
                photo: '/mocks/elena.png',
                name: 'Алена Шварц',
                geo: 'Ln. Mesa, New Jersey 45463',
                services: [
                        {
                                value: 'nails',
                                name: 'Nails',
                        },
                        {
                                value: 'hair',
                                name: 'Hair Cut',
                        }
                ],
                rate: 3.8,
        },
        {
                photo: '/mocks/michael.png',
                name: 'Михаил Прохоров',
                geo: 'Dr. Richardson, California 62639',
                services: [
                        {
                                value: 'nails',
                                name: 'Nails',
                        },
                        {
                                value: 'hair',
                                name: 'Hair Cut',
                        }
                ],
                rate: 4.5,
        },
        {
                photo: '/mocks/alina.png',
                name: 'Алина Морозова',
                geo: 'San Jose, South Dakota 83475',
                services: [
                        {
                                value: 'nails',
                                name: 'Nails',
                        },
                        {
                                value: 'hair',
                                name: 'Hair Cut',
                        }
                ],
                rate: 4.8,
        },
        {
                photo: '/mocks/maria.png',
                name: 'Мария Иванова',
                geo: 'Cir. Shiloh, Hawaii 81063',
                services: [
                        {
                                value: 'nails',
                                name: 'Nails',
                        },
                        {
                                value: 'hair',
                                name: 'Hair Cut',
                        }
                ],
                rate: 4.7,
        },
        {
                photo: '/mocks/maria.png',
                name: 'Мария Иванова',
                geo: 'Cir. Shiloh, Hawaii 81063',
                services: [
                        {
                                value: 'nails',
                                name: 'Nails',
                        },
                        {
                                value: 'hair',
                                name: 'Hair Cut',
                        }
                ],
                rate: 4.7,
        },
        {
                photo: '/mocks/maria.png',
                name: 'Мария Иванова',
                geo: 'Cir. Shiloh, Hawaii 81063',
                services: [
                        {
                                value: 'nails',
                                name: 'Nails',
                        },
                        {
                                value: 'hair',
                                name: 'Hair Cut',
                        }
                ],
                rate: 4.7,
        },
] 

const ServiceBanner = () => {
        const [active, setActive] = useState<ISegmentValues>(SERVICES[0])

        const onSearch = (value: string) => {
                console.log('---value service --- ', value)
        }

        return (
                <div className={styles.container}>
                        <section className={styles.sectionSegments}>
                                <Segments
                                        values={SERVICES}
                                        active={active}
                                        setActive={setActive}
                                />
                        </section>
                        <section className={styles.titleAndSearch}>
                                <h2>Меняйте услуги на услуги. Помогайте другим. Общайтесь.</h2>
                                <SearchField onSearch={onSearch} />
                        </section>
                        <section className={styles.peopleContainer}>
                                <div className={styles.titleWrapper}>
                                        <h3>Популярные предложения</h3>
                                        <div className={styles.totalOval}><span>80</span></div>
                                </div>
                                <ul className={styles.peoples}>
                                        {
                                                MOCK_DATA_PEOPLE?.map((item, index) => (
                                                        <PeopleCard
                                                                key={`${item?.geo}_{index}`}
                                                                photo={item?.photo}
                                                                name={item?.name}
                                                                rate={item?.rate}
                                                                services={item?.services}
                                                                geo={item?.geo}
                                                        />
                                                ))
                                        }
                                </ul>
                        </section>
                </div>
        )
}

export default ServiceBanner