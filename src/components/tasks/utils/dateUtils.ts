// utils/dateUtils.js
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  eachHourOfInterval,
  addWeeks,
  addDays
} from "date-fns"

export const generateMonthDates = (currentDate: Date) => {
  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 })
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 })
  return eachDayOfInterval({ start, end })
}

export const generateWeekDates = (currentDate: Date) => {
  const start = startOfWeek(currentDate, { weekStartsOn: 0 })
  const end = endOfWeek(currentDate, { weekStartsOn: 0 })
  return eachDayOfInterval({ start, end })
}

export const generateDayHours = (currentDate: Date) => {
  return eachHourOfInterval({
    start: new Date(currentDate.setHours(0, 0, 0, 0)),
    end: new Date(currentDate.setHours(23, 59, 59, 999)),
  })
}
