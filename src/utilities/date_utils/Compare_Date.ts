export const compareDate = (date1: string, date2: string): boolean => {
  const targetDate1 = new Date(date1)
  const targetDate2 = new Date(date2)

  return (
    targetDate1.getDate() === targetDate2.getDate() &&
    targetDate1.getMonth() === targetDate2.getMonth() &&
    targetDate1.getFullYear() === targetDate2.getFullYear()
  )
}
