"use client";

import { type FC, useState } from "react";

import SignModulePopup from "../../modules/SignModulePopup";
import BannerSign from "../../modules/ClassBanner/BannerSign";
import { TTypeSign } from "../../modules/SignModulePopup/types";

export const ComponentSign: FC = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<TTypeSign>("SignIn");

  const handleSignUpOrSignIn = (value: TTypeSign) => {
    setType(value);
    setVisible(true);
  }

  return (
    <>
      <BannerSign {...{handleSignUpOrSignIn}} />
      <SignModulePopup {...{ visible, type, setVisible, setType }} />
    </>
  )
}