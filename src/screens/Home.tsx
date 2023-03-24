import { View, Text, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { generateDatesRange } from '../utils/generate-dates-range'
import { HabitDay, DAY_SIZE } from '../components/HabitDay'
import { Header } from '../components/Header'
import { HabitDayNotFilled } from '../components/HabitDayNotFilled'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import axios from 'axios'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDatesRange()
const minimunSummaryDaysToSize = 18 * 5
const amountOfDaysToFill = minimunSummaryDaysToSize - summaryDates.length
const arrayDaysToFill = Array.from({ length: amountOfDaysToFill })

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [summary, setSummary] = useState(null)

  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setIsLoading(true)
      const response = await api.get('summary')
      console.log('response', response.data)
      setSummary(response.data)
    } catch (error) {
      Alert.alert('Ops...', 'Não foi possível carregar o sumário de hábitos')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekday, i) => (
          <Text
            className="text-zinc-100 text-xl font-bold text-center m-1"
            style={{ width: DAY_SIZE }}
            key={`${weekday} - ${i}`}
          >
            {weekday}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {summaryDates.map((date) => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate('habit', { date: date.toISOString() })}
            />
          ))}

          {amountOfDaysToFill > 0 &&
            arrayDaysToFill.map((_, i) => {
              return <HabitDayNotFilled key={i} />
            })}
        </View>
      </ScrollView>
    </View>
  )
}
