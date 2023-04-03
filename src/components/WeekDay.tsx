import { useState } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import clsx from 'clsx'

interface WeekDayProps extends TouchableOpacityProps {
  weekDay: string
}

export function WeekDay({ weekDay, ...rest }: WeekDayProps) {
  const [isActive, setIsactive] = useState(false)
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx('rounded-lg border m-1', {
        ['bg-background rounded-full w-8 h-8 flex justify-center items-center']:
          isActive,
        ['bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center']:
          !isActive,
      })}
      onPress={() => setIsactive(!isActive)}
      {...rest}
    >
      <Text
        className={clsx({
          ['text-1xl text-white font-bold']: isActive,
          ['text-1xl text-secondary font-bold']: !isActive,
        })}
      >
        {weekDay}
      </Text>
    </TouchableOpacity>
  )
}
