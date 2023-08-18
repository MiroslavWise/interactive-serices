import { ListChat } from "@/components/messages/ListChat"
import { Chat } from "@/components/messages/CurrentChat"
import { InterviewerInfo } from "@/components/messages/InterviewerInfo"

import styles from "./style.module.scss"

export default function Messages() {

  return (
    <div className={styles.page}>
      <ListChat />
      <Chat />
      <InterviewerInfo />
    </div>
  )
}