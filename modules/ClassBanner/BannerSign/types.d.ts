import { type FC, type Dispatch } from "react";
import { type TTypeSign as TTypeSign } from "modules/SignModulePopup/types";

export type TBannerSign = FC<{
  handleSignUpOrSignIn: Dispatch<TTypeSign>
}>