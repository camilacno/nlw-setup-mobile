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
  hasIcon?: boolean
  iconDisabled?: boolean
  onPressIcon?: () => void
}

export function Checkbox({
  title,
  checked = false,
  hasIcon = false,
  iconDisabled,
  onPressIcon,
  ...rest
}: Props) {
  console.log('hasIcon', hasIcon)
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

      <View className="flex flex-row justify-between flex-1">
        <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
        {hasIcon && (
          <TouchableOpacity onPress={onPressIcon} disabled={iconDisabled}>
            <Feather name="arrow-right" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  )
}
