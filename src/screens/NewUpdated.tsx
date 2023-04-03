import React, { useState } from 'react'
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
import { Feather } from '@expo/vector-icons'

import { api } from '../lib/axios'
import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { WeekDay } from '../components/WeekDay'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewUpdated() {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')
  const [isPickerVisible, setIsPickerVisible] = useState(false)
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined)

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
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert(
          'Novo hábito',
          'Informe o nome do hábito e escolha a periodicidade.'
        )
      }

      await api.post('/habits', { title, weekDays })

      setTitle('')
      setWeekDays([])

      Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível criar o novo hábito')
    }
  }

  function showModal() {
    setIsPickerVisible(true)
  }

  function handleConfirmTime(time: Date) {
    setSelectedTime(time)
    setIsPickerVisible(false)

    const selectedDate = new Date()
    selectedDate.setHours(time.getHours())
    selectedDate.setMinutes(time.getMinutes())
    setSelectedTime(selectedDate)
    setIsPickerVisible(false)
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex flex-row items-center justify-between">
          <BackButton />

          <Text className="text-white font-base text-2xl">Crie seu hábito</Text>
          <TouchableOpacity>
            <Text className="text-white font-base text-2xl">Salvar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          className="h-14 pl-4 mt-3 bg-secondary text-white"
          placeholder="Nome"
          placeholderTextColor={colors.gray[400]}
          onChangeText={setTitle}
          value={title}
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        <WeekDay weekDay='D' />

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
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
