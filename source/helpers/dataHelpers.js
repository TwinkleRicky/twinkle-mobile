import {green} from '../styles/constants'

export const processSchedules = schedules => {
  return schedules.map(schedule => ({
    title: renderTitle(schedule.type, schedule.username),
    description: renderDescription(schedule.dateStamp),
    circleColor: renderDescription(schedule.dateStamp) === 'Today' ? green : null,
    lineColor: renderDescription(schedule.dateStamp) === 'Today' ? green : null
  }))
}

function renderTitle(type, username) {
  if (type === 'visit') return `Mentor Visit - ${username}`
  return `Other - ${username}`
}

function renderDescription(dateStamp) {
  const today = new Date()
  const targetDate = new Date(dateStamp * 1000)
  today.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)

  const todayVal = Date.parse(today) / 1000
  const targetVal = Date.parse(targetDate) / 1000

  const difference = targetVal - todayVal
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  switch (difference) {
    case 0: return 'Today'
    case 86400: return `Tomorrow · ${months[targetDate.getUTCMonth()]} ${targetDate.getUTCDate()}`
    default: return `${months[targetDate.getUTCMonth()]} ${targetDate.getUTCDate()}`
  }
}
