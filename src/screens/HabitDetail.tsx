import { useCallback, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import colors from 'tailwindcss/colors'
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { api } from '../lib/axios'
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

interface Params {
  id: string
  title: string
}

export function HabitDetail() {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')
  const [isPickerVisible, setIsPickerVisible] = useState(false)
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)

  const route = useRoute()
  const { id } = route.params as Params

  function handleConfirmTime(time: Date) {
    setSelectedTime(time)
    setIsPickerVisible(false)

    const selectedDate = new Date()
    selectedDate.setHours(time.getHours())
    selectedDate.setMinutes(time.getMinutes())
    setSelectedTime(selectedDate)
    console.log(selectedDate)

    setIsPickerVisible(false)
  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      )
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      await api.post('/habits', { title, weekDays })
      Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível criar o novo hábito')
    }
  }

  function showModal() {
    setIsPickerVisible(true)
  }

  async function getHabitDetail(id: string) {
    const response = await api.get(`/habitdetail/${id}`)
    if (!response) {
      throw new Error('Failed to fetch habit detail')
    }

    const data = await response.data
    setTitle(data.title)
    setWeekDays(data.weekdays)
    return {
      id: data.id,
      title: data.title,
      weekdays: data.weekdays,
    }
  }

  useFocusEffect(
    useCallback(() => {
      getHabitDetail(id)
    }, [])
  )

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <TextInput
          className="h-12 rounded-lg mt-3 text-3xl font-bold text-white "
          placeholderTextColor={colors.teal[100]}
          onChangeText={() => setTitle(title)}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <View className="flex flex-row justify-between items-center">
          <Text className="font-semibold mt-4 mb-3 text-white text-base">
            Definir lembrete
          </Text>

          <TouchableOpacity onPress={showModal}>
            <Text className=" text-white font-extrabold text-2xl">
              {selectedTime
                ? new Date(selectedTime)
                    .toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                    .replace(/:\d{2}$/, '')
                : 'Selecione'}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isPickerVisible}
            mode="time"
            is24Hour={true}
            onConfirm={handleConfirmTime}
            onCancel={() => setIsPickerVisible(false)}
          />
        </View>

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-secondary rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="font-semibold text-base text-white ml-2">
            Atualizar hábito
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
