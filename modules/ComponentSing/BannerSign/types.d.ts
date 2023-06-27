import { type FC, type Dispatch, SetStateAction } from "react";
import type { TTypeSing } from "../SingModulePopup/types";

export type TBannerSign = FC<{
  handleSignUpOrSignIn: Dispatch<TTypeSing>
}>