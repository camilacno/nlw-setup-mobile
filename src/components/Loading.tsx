import { ActivityIndicator, View } from 'react-native'

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2596be',
      }}
    >
      <ActivityIndicator color="#071e26" animating />
    </View>
  )
}
