import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import BackButton from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDays(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      )
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprimetimento?
        </Text>

        <TextInput
          placeholderTextColor={colors.zinc[400]}
          placeholder="Exercícios, dormir bem, etc..."
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekday, index) => (
          <Checkbox
            title={weekday}
            key={weekday}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDays(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full mt-6 h-14 rounded-lg flex-row items-center justify-center bg-green-600 font-semibold hover:bg-green-500"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="text-white font-semibold text-base ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
