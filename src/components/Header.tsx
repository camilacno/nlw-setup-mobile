import { View, TouchableOpacity, Text, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useNavigation } from '@react-navigation/native'

import Logo from '../assets/logo.svg'

export function Header() {
  const { navigate } = useNavigation()

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo height={60} width={180} />

      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border-2 border-teal-300 rounded-lg items-center"
        onPress={() => navigate('new')}
      >
        <Feather name="plus" color={colors.teal[300]} size={20} />

        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('newupdated')}>
        <Text className="text-white ml-3 font-semibold text-base">New</Text>
      </TouchableOpacity>
    </View>
  )
}
