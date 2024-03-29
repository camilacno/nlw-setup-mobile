import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

import { Home } from '../screens/Home'
import { New } from '../screens/New'
import { Habit } from '../screens/Habit'
import { HabitDetail } from '../screens/HabitDetail'
import { NewUpdated } from '../screens/NewUpdated'

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />

      <Screen name="new" component={New} />

      <Screen name="habit" component={Habit} />

      <Screen name="habitdetail" component={HabitDetail} />

      <Screen name="newupdated" component={NewUpdated} />
    </Navigator>
  )
}
