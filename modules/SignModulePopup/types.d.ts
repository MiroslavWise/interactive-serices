import type { Dispatch, FC, SetStateAction } from "react";

export type TSignModulePopup = FC<{
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  type: TTypeSign;
  setType: Dispatch<SetStateAction<TTypeSign>>;
}>
export type TTypeSign = "SignIn" | "SignUp" | "SelectVerification" | "CodeVerification" | "PersonalEntry" | "ForgotPassword"