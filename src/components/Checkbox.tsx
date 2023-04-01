import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

interface Props extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export function Checkbox({ title, checked = false, ...rest }: Props) {
  function onPress() {
    console.log('ícone dentro do checkbox')
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-secondary rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-teal-400 rounded-lg" />
      )}

      <View className="flex-row items-center justify-between flex-1 ml-3">
        <Text className="text-white text-base font-semibold">{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Feather name="arrow-right" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}
