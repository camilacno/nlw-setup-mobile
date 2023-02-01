import { Dimensions, View } from 'react-native'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5 //each size / padding
export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
  (Dimensions.get('screen').width * 0.9) / WEEK_DAYS - SCREEN_HORIZONTAL_PADDING

export function HabitDayNotFilled() {
  return (
    <View
      className="bg-zinc-800 rounded-lg border-2 m-1 border-zinc-800 opacity-40 cursor-not-allowed"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    ></View>
  )
}
