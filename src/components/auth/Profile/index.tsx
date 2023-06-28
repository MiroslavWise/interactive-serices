"use client"

import { useState } from "react";

import type { IStateVisible } from "./types";

import ServiceBanner from "./ServiceBanner";
import ProfilePublic from "./ProfilePublic";

export const Profile = ({ }) => {
  const [serviceDataVisible, setServiceDataVisible] = useState<IStateVisible>({
    isService: true,
    isProfile: false,
    dataProfile: null,
  })

  return (
    <>
      <ServiceBanner
        active={serviceDataVisible.isService}
        setDataAndActive={setServiceDataVisible}
      />
      <ProfilePublic
        active={serviceDataVisible.isProfile}
        profile={serviceDataVisible.dataProfile}
        setActive={setServiceDataVisible}
      />
    </>
  )
}