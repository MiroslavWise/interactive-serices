function onNumberOfPhotos(value: number): string | null {
  if (!value) return null
  const per = value % 10
  if (value >= 10 && value <= 20) return `${value} фотографий`
  if (per > 1 && per < 5) return `${value} фотографии`
  if (per === 1) return `${value} фотография`
  return `${value} фотографий`
}

function getCommentEnding(number: number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return `${number} комментарий`
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return `${number} комментария`
  } else {
    return `${number} комментариев`
  }
}

export { onNumberOfPhotos, getCommentEnding }
