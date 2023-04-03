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
        ['bg-secondary rounded-full w-10 h-10 flex justify-center items-center']:
          isActive,
        ['bg-background rounded-full w-10 h-10 flex justify-center items-center']:
          !isActive,
      })}
      onPress={() => setIsactive(!isActive)}
      {...rest}
    >
      <Text
        className={clsx({
          ['text-1xl text-gray-400 text-2xl font-bold']: isActive,
          ['text-1xl text-secondary text-2xl font-bold']: !isActive,
        })}
      >
        {weekDay}
      </Text>
    </TouchableOpacity>
  )
}
