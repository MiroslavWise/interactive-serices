import type { IPostOffers } from "@/services/offers/types"

import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { useCreateAlert } from "@/store/state/useCreateAlert"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { transliterateAndReplace } from "@/helpers"

import styles from "./styles/style.module.scss"

export const Start = () => {
    const { userId } = useAuth()
    const { text, setText, resetAlert, setStepAlert } = useCreateAlert()

    function handleExit() {
        resetAlert()
    }

    function handleNext() {
        const data: IPostOffers = {
            provider: "alert",
            title: text,
            userId: userId!,
            slug: transliterateAndReplace(text),
            enabled: true,
            desired: true,
        }
        serviceOffer.post(data).then((response) => {
            console.log("data alert: ", { response })
        })
        setStepAlert("end")
    }

    return (
        <>
            <SelectAndTextarea>
                <LabelAndInput
                    title="Придумайте заголовок для вашего обсуждения."
                    text={text}
                    setText={setText}
                    placeholder="Что вы хотите обсудить?"
                />
            </SelectAndTextarea>
            <footer className={styles.footer}>
                <ButtonDefault
                    label="Отмена"
                    classNames={styles.button}
                    handleClick={handleExit}
                    disabled={!text}
                />
                <ButtonFill
                    label="Следующий"
                    type="primary"
                    classNames={styles.button}
                    handleClick={handleNext}
                />
            </footer>
        </>
    )
}
