export const parseDate = (dateInString: string): string => {
  const date = new Date(dateInString)

  let hours = '0' + date.getHours()
  let minutes = '0' + date.getMinutes()

  return `${hours.slice(-2)}:${minutes.slice(-2)}`
}
