import slugify from "slug"

export const regExEmail = /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/g

export const regExUserName = /@[\w-]+/g
export const matchesUserName = (value: string) => regExUserName.test(value)

export const checkPasswordStrength = (password: string): boolean => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g.test(password)

export const transliterateAndReplace = (string: string): string => (!!string ? slugify(string) : "")

export const reqExRussianMats =
  /(?=.*[а-яё])(?:(?:(?:у|[нз]а|(?:хитро|не)?вз?[ыьъ]|с[ьъ]|(?:и|ра)[зс]ъ?|(?:о[тб]|п[оа]д)[ьъ]?|(?:\S(?=[а-яё]))+?[оаеи-])-?)?(\s)(?:[её](?:б(?!о[рй]|рач)|п[уа](?:ц|тс))|и[пб][ае][тцд][ьъ]).*?|(?:(?:н[иеа]|ра[зс]|[зд]?[ао](?:т|дн[оа])?|с(?:м[еи])?|а[пб]ч)-?)?ху(?:[яйиеёю]|л+и(?!ган)).*?\b|бл(?:[эя]+|еа?)(?:[дт][ьъ]?)?|\b\S*?(?:п(?:[иеё]зд|ид[аое]?р|ед(?:р(?!о)|[аое]р|ик))|бля(?:[дбц]|тс)|[ое]ху[яйиеёю]|хуйн).*?|(?:о[тб]?|про|на|вы)?м(?:анд(?:[ауеыи](?:л(?:и[сзщ])?[ауеиы])?|ой|[ао]в.*?|юк(?:ов|[ауи])?|е[нт]ь|ища)|уд(?:[яаиое].+?|е?н(?:[ьюия]|ей))|[ао]л[ао]ф[ьъ](?:[яиюе]|[еёо]й))|елд[ауые].*?|ля[тд]ь|(?:[нз]а|по)х)(?![а-яё])/gi

export const replaceRussianMats = (value: string) =>
  typeof value === "string"
    ? // ? value.replaceAll(reqExRussianMats, " *** ").trim()
      value
    : value
