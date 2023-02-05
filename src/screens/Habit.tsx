import { View, Text, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'

import BackButton from '../components/BackButton'
import { ProgressBar } from '../components/ProgressBar'
import { Checkbox } from '../components/Checkbox'

interface HabitParams {
  date: string
}

export function Habit() {
  const route = useRoute()
  const { date } = route.params as HabitParams
  const parsedDate = dayjs(date)
  const weekDay = parsedDate.format('dddd')
  const dayOfTheMonth = parsedDate.format('DD/MM')

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-100 font-semibold text-base lowercase">
          {weekDay}
        </Text>
        <Text className="text-gray-600 font-extrabold text-3xl">
          {dayOfTheMonth}
        </Text>

        <ProgressBar progress={42} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" checked />
          <Checkbox title="Treinar" />
        </View>
      </ScrollView>
    </View>
  )
}
