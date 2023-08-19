


interface IValues{
  user: string
  my_photo: string
}

interface IReturnMessage{
  avatar_url: string
  isMe: boolean
  message: string
  time: string
}

export const MESSAGES_CHAT = ({user, my_photo }: IValues): IReturnMessage[]  => ([
  {
    avatar_url: user,
    isMe: false,
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "10:02",
  },
  {
    avatar_url: my_photo,
    isMe: true,
    message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    time: "10:02",
  },
  {
    avatar_url: user,
    isMe: false,
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "10:02",
  },
  {
    avatar_url: my_photo,
    isMe: true,
    message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    time: "10:02",
  },
  {
    avatar_url: user,
    isMe: false,
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "10:02",
  },
  {
    avatar_url: my_photo,
    isMe: true,
    message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    time: "10:02",
  },
])