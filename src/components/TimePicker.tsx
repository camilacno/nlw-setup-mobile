import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export const TimePicker = () => {
  const [datePicker, setDatePicker] = useState(new Date())
  const [timePicker, setTimePicker] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [showHour, setShowHour] = useState(false)

  const onChange = (event: Event, selectedValue?: Date) => {
    setShow(Platform.OS === 'ios')
    if (mode === 'date' && selectedValue) {
      const currentDate = selectedValue || datePicker
      setDatePicker(currentDate)
      setMode('time')
      setShow(true)
    } else if (mode === 'time' && selectedValue) {
      const selectedTime = selectedValue || timePicker
      setTimePicker(selectedTime)
      setShow(false)
      setMode('date')
    } else {
      setShow(false)
    }
  }

  const showMode = (currentMode: string) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatePicker = () => {
    showMode('date')
  }

  const showTimePicker = () => {
    showMode('time')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker} style={styles.button}>
        <Text style={styles.text}>
          Data: {datePicker.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mode === 'date' ? datePicker : timePicker}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity onPress={showTimePicker} style={styles.button}>
        <Text style={styles.text}>
          Hora: {timePicker.toLocaleTimeString('pt-BR')}
        </Text>
      </TouchableOpacity>
      {showHour && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mode === 'date' ? datePicker : timePicker}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4299E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
