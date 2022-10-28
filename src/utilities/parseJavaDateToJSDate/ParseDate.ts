export const parseDate = (dateInString: string): string => {
  const date = new Date(dateInString)

  return `${date.getHours()}:${date.getMinutes()}`
}
