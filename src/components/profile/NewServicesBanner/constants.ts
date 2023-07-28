import type { INewCreateBadge } from "./types/types"



export const NEW_CREATE_BADGES: INewCreateBadge[] = [
  {
    imageSrc: "/svg/3d/3d-speaker.svg",
    label: "Новое предложение",
    value: "new_offer",
  },
  {
    imageSrc: "/svg/3d/3d-sos.svg",
    label: "Новое оповещение",
    value: "new_alert",
  },
  {
    imageSrc: "/svg/3d/3d-attach.svg",
    label: "Новая запись в блоге",
    value: "new_blog_post",
  },
  {
    imageSrc: "/svg/3d/3d-message.svg",
    label: "Новое обсуждение",
    value: "new_discussion",
  },
]