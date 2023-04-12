import { Dimensions, TouchableOpacity } from 'react-native'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 9)

export function HabitDayInactive() {
  return (
    <TouchableOpacity
      className="bg-zinc-400 border-zinc-500 rounded-md mt-1 ml-1 mr-2"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    />
  )
}
