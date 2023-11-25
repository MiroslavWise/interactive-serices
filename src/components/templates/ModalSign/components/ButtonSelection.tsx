import Image from "next/image"

import type { TButtonSelection } from "../types/types"

import "../styles/button-selection.scss"

export const ButtonSelection: TButtonSelection = (props) => {
    const { active, label, onClick, image } = props ?? {}
    return (
        <div
            className="buttonSelectionContainer"
            data-active={active}
            onClick={onClick}
        >
            <div className="buttonSelectionCheckBox">
                <span />
            </div>
            <div className="buttonSelectionContentIconType">
                <Image
                    src={image}
                    alt={image}
                    width={56}
                    height={56}
                    unoptimized
                />
                <h3>{label}</h3>
            </div>
        </div>
    )
}
