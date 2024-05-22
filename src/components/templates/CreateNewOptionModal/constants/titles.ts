import { EnumTypeProvider } from "@/types/enum"

export const titleContent = (value: EnumTypeProvider) =>
  value === EnumTypeProvider.alert ? "Название проблемы" : value === EnumTypeProvider.discussion ? "Название обсуждения" : ""

export const descriptionImages = (value: EnumTypeProvider) =>
  value === EnumTypeProvider.alert
    ? "Если у вас есть фото или видео возникшей проблемы, добавьте"
    : value === EnumTypeProvider.discussion
    ? "Фото или видео, раскрывающие суть предложенной темы, точно пригодятся"
    : value === EnumTypeProvider.offer
    ? "Добавьте фотографии и видео, это помогает выделить предложение среди других"
    : ""

export const placeholderDescription = (value: EnumTypeProvider) =>
  value === EnumTypeProvider.alert
    ? "Опишите, что случилось, упоминая детали, которые посчитаете важными"
    : value === EnumTypeProvider.discussion
    ? "Раскройте более подробно тему обсуждения, добавив детали"
    : value === EnumTypeProvider.offer
    ? "Добавьте описание, чтобы привлечь внимание к вашему предложению"
    : ""

export const title = (value: EnumTypeProvider) =>
  value === EnumTypeProvider.alert
    ? "Опишите проблему"
    : value === EnumTypeProvider.discussion
    ? "Ваш комментарий"
    : value === EnumTypeProvider.offer
    ? "Описание предложения"
    : null

export const headerTitle = (value: EnumTypeProvider) =>
  value === EnumTypeProvider.alert
    ? "Новое SOS-сообщение"
    : value === EnumTypeProvider.discussion
    ? "Новое обсуждение"
    : value === EnumTypeProvider.offer
    ? "Новое предложение"
    : null

export const titlePlaceholderContent = (value: EnumTypeProvider) =>
  value === EnumTypeProvider.alert
    ? "Например, потерял(а) телефон"
    : value === EnumTypeProvider.discussion
    ? "Например, турнир по петангу 12.01"
    : ""
