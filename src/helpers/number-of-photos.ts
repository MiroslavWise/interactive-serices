function onNumberOfPhotos(value: number): string | null {
  if (!value) return null
  const per = value % 10
  if (value >= 10 && value <= 20) return `${value} фотографий`
  if (per > 1 && per < 5) return `${value} фотографии`
  if (per === 1) return `${value} фотография`
  return `${value} фотографий`
}

export { onNumberOfPhotos }
