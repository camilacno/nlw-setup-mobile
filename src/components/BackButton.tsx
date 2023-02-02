import colors from 'tailwindcss/colors'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function BackButton() {
  const { goBack } = useNavigation()

  return (
    <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
      <Feather name="arrow-left" size={32} color={colors.zinc[400]} />
    </TouchableOpacity>
  )
}
