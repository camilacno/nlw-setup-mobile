import React, { useState } from 'react'
import colors from 'tailwindcss/colors'
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  StyleSheet,
  Button,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { api } from '../lib/axios'
import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { WeekDay } from '../components/WeekDay'
import CalendarPicker from 'react-native-calendar-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DateTimePicker from '@react-native-community/datetimepicker'

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

  const [text, setText] = useState('')

  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    undefined
  )

  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [isEnabled, setIsEnabled] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    undefined
  )

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(false)
    setDate(currentDate)
  }

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date)
    setIsPickerVisible(false)
  }

  // const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

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
        return
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
          className="h-14 px-4 mt-12 text-base bg-secondary text-white "
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
        <TextInput
          className="h-28 px-4 bg-secondary text-base text-white"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[400]}
          onChangeText={setTitle}
          value={title}
          multiline={true}
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />

        <View
          className="h-20 px-4 py-1 mt-3 bg-secondary text-white flex flex-row items-center justify-between"
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Text className="text-xl text-gray-300 ">Repetir</Text>
          <Switch
            trackColor={{ false: '#CBD5E1', true: '#CBD5E1' }}
            thumbColor={isEnabled ? '#2596BE' : '#94A3B8'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          />
        </View>

        {isEnabled && (
          <View
            className="h-14 flex flex-row items-center justify-between px-4 bg-secondary text-white "
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <WeekDay weekDay="D" />
            <WeekDay weekDay="S" />
            <WeekDay weekDay="T" />
            <WeekDay weekDay="Q" />
            <WeekDay weekDay="Q" />
            <WeekDay weekDay="S" />
            <WeekDay weekDay="S" />
          </View>
        )}

        <View
          className="h-16 px-4 py-1 bg-secondary text-white 0 flex flex-row items-center justify-between"
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Text className="text-xl text-gray-300 ">Definir lembrete</Text>
          <TouchableOpacity
            onPress={showModal}
            className="bg-gray-400 rounded-md w-36 flex items-center justify-center"
          >
            <Text className=" text-secondary font-semibold text-lg p-2 ">
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

        <View
          className="h-20 px-4 bg-secondary text-white 0 flex flex-row items-center justify-between"
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <Text className="text-xl text-gray-300 ">Definir término</Text>

          <TouchableOpacity
            className="bg-gray-400 rounded-lg w-36 h-10 flex items-center justify-center"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className=" text-secondary font-semibold text-lg p-2 ">
              {date ? date.toLocaleDateString() : 'Selecionar data'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
    marginBottom: 50,
  },
  selectedDates: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#7300e6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    fontFamily: 'monospace',
    fontSize: 18,
    color: '#FFFFFF',
  },
})
