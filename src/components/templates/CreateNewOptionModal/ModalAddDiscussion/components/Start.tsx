import type { IPostOffers } from "@/services/offers/types"

import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"

import styles from "./styles/style.module.scss"
import { transliterateAndReplace } from "@/helpers"

export const Start = () => {
    const { userId } = useAuth()
    const { text, setText, resetDiscussion, setStepDiscussion } =
        useCreateDiscussion()

    function handleExit() {
        resetDiscussion()
    }

    function handleNext() {
        const data: IPostOffers = {
            provider: "discussion",
            title: text,
            userId: userId!,
            slug: transliterateAndReplace(text!),
            enabled: true,
            desired: true,
        }
        serviceOffer.post(data).then((response) => {
            console.log("data Discussion: ", { response })
        })
        setStepDiscussion("end")
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
