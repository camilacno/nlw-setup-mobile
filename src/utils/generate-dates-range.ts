import dayjs from 'dayjs'

export function generateDatesRange() {
  const firstDay = dayjs().startOf('year')
  const today = new Date()

  const dates = []
  let compareDate = firstDay

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dates
}

//TODO: change initial date to value inputed by the user
