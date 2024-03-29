import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'
import { Alert, Button, Platform, ScrollView, Text, View } from 'react-native'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

import { api } from '../lib/axios'
import { generateProgressPercentage } from '../utils/generate-progress-percentage'

import { BackButton } from '../components/BackButton'
import { ProgressBar } from '../components/ProgressBar'
import { Checkbox } from '../components/Checkbox'
import { Loading } from '../components/Loading'
import { HabitsEmpty } from '../components/HabitDayNotFilled'

interface Params {
  date: string
}

interface DayInfoProps {
  completedHabits: string[]
  possibleHabits: {
    id: string
    title: string
  }[]
}

export function Habit() {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as Params
  const dateWithHour = dayjs(date).set('hour', 3).toISOString()

  const parsedDate = dayjs(date)
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  const habitsProgress = dayInfo?.possibleHabits?.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0

  const navigation = useNavigation()

  async function fetchHabits() {
    try {
      setLoading(true)
      const response = await api.get('/day', { params: { date: dateWithHour } })
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits ?? [])
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Ops',
        'Não foi possível carregar as informações dos hábitos.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabits(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)

      if (completedHabits?.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId)
        )
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId])
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito.')
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHabits()
    }, [])
  )

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-teal-200 font-semibold text-2xl lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth} ({habitsProgress.toFixed(0)}%)
        </Text>
        <ProgressBar progress={habitsProgress} />
        <View
          className={clsx('mt-6', {
            ['opacity-50']: isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits?.map((habit) => (
              <Checkbox
                hasIcon
                key={habit.id}
                title={habit.title}
                checked={completedHabits?.includes(habit.id)}
                onPress={() => handleToggleHabits(habit.id)}
                disabled={isDateInPast}
                onPressIcon={() =>
                  navigation.navigate('habitdetail', { id: habit.id })
                }
                iconDisabled={isDateInPast}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>
        {dayInfo?.possibleHabits?.length === 0 && (
          <Text className="text-white mt-10 text-center">
            Não há hábitos cadastrados para este dia.
          </Text>
        )}
        {isDateInPast &&
          dayInfo?.possibleHabits &&
          dayInfo.possibleHabits.length > 0 && (
            <Text className="text-white mt-10 text-center">
              Você não pode editar hábitos de uma data passada.
            </Text>
          )}
      </ScrollView>
    </View>
  )
}
