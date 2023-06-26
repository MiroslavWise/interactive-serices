import Image from 'next/image'

import type { TSingModulePopup } from './types'

import { HeaderModal } from './components/HeaderModal'
import { ContentSingUp } from './components/ContentSingUp'
import { ContentSingIn } from './components/ContentSingIn'

import styles from './style.module.scss'

const SingModulePopup: TSingModulePopup = ({ visible, type, setVisible, setType }) => {
        return (
                <>
                        <div onClick={() => setVisible(true)}>asdfasdfasfd</div>
                        <div className={`${styles.overlay} ${visible ? styles.visible : ''}`}>
                                <div className={styles.modal}>
                                        <div
                                                className={styles.close}
                                                onClick={() => setVisible(false)}
                                        >
                                                <Image
                                                        src="/svg/x-close.svg"
                                                        alt='x'
                                                        width={14}
                                                        height={14}
                                                />
                                        </div>
                                        <div className={styles.content}>
                                                <HeaderModal type={type} />
                                                {
                                                        type === "SingUp" ? <ContentSingUp setType={setType} /> : null
                                                }
                                                {
                                                        type === "SingIn" ? <ContentSingIn setType={setType} /> : null
                                                }
                                        </div>
                                        <div className={styles.orangeCircle} />
                                        <div className={styles.purpleCircle} />
                                        <div className={styles.lightBlueCircle} />
                                </div>
                        </div>
                </>
        )
}

export default SingModulePopup