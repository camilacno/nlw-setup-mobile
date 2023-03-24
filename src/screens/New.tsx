import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native'
import DateTimePicker, {
  Event as DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { BackButton } from '../components/BackButton'
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
  const [time, setTime] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState<boolean>(false)

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowPicker(false)
    if (selectedTime) {
      setTime(selectedTime)
    }
  }

  const showTimePicker = () => {
    setShowPicker(true)
  }

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
          className="h-12 pl-4 rounded-lg mt-3 bg-gray-500 text-white border-2 border-gray-600 focus:border-gray-700"
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

        <Button onPress={showTimePicker} title="Lembrar-me no horário:" />
        <Text>
          Horário selecionado:
          {`${time.getHours().toString().padStart(2, '0')}:${time
            .getMinutes()
            .toString()
            .padStart(2, '0')}`}
        </Text>
        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
            is24Hour
          />
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full mt-6 h-14 rounded-lg flex-row items-center justify-center bg-gray-600 font-semibold hover:bg-gray-500"
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
