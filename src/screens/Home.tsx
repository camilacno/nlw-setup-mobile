import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { generateDatesRange } from '../utils/generate-dates-range'

import { api } from '../lib/axios'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { HabitDay, DAY_SIZE } from '../components/HabitDay'
import { HabitDayInactive } from '../components/HabitDayInactive'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesRange()
const minimunSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimunSummaryDatesSizes - datesFromYearStart.length

type SummaryProps = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>

export function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)
  const [inactiveDays, setInactiveDays] = useState(0)

  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function generateDatesRange() {
    const today = dayjs()
    setInactiveDays(today.day())
    const firstDayOfTheWeek = today.startOf('week')
    const lastDayOfTheWeek = today.endOf('week')

    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = firstDayOfTheWeek.add(i, 'day')
      dates.push(date)
    }

    const amountOfDaysToFill = minimunSummaryDatesSizes - dates.length
    if (amountOfDaysToFill > 0) {
      for (let i = 1; i <= amountOfDaysToFill; i++) {
        const date = lastDayOfTheWeek.subtract(i, 'day')
        dates.unshift(date)
      }
    }

    dates.sort((a, b) => a.day() - b.day())

    return [dates, inactiveDays]
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
      generateDatesRange()
    }, [])
  )

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-100 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className="flex-row flex-wrap">
            {[...Array(inactiveDays)].map((_, i) => (
              <HabitDayInactive key={i} />
            ))}

            {datesFromYearStart.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, 'day')
              })

              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate('habit', { date: date.toISOString() })
                  }
                />
              )
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
