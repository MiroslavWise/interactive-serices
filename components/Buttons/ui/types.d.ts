import type { FC, DispatchWithoutAction, Dispatch } from "react";

type TTypeButton = "primary" | "secondary" | "optional_blue" | "optional_pink";

interface IButtonProps {
<<<<<<< HEAD:components/Buttons/ui/types.d.ts
        label: string
        classNames?: string
        handleClick?: DispatchWithoutAction
        disabled?: boolean
        type?: TTypeButton
        submit?: "submit" | "reset" | "button"
        shadow?: boolean
        small?: boolean
}

interface IButtonsCircle{
        src: string
        type: 'primary'
}

export type TButtonPropsFill = FC<IButtonProps>
export type TButtonPropsDefault = FC<IButtonProps>
export type TButtonsCircle = FC<IButtonsCircle>
=======
  label: string;
  classNames?: string;
  handleClick?: DispatchWithoutAction;
  disabled?: boolean;
  type?: TTypeButton;
  submit?: "submit" | "reset" | "button";
}

export type TButtonPropsFill = FC<IButtonProps>;
export type TButtonPropsDefault = FC<IButtonProps>;
>>>>>>> b749fe3ff88a08d282e62c8a0f0fed21753aeec4:components/Buttons/types.d.ts
