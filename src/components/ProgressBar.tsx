import { View } from 'react-native'

interface ProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  return (
    <View className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <View
        className="h-3 rounded-xl bg-cyan-300"
        style={{ width: `${progress}%` }}
      ></View>
    </View>
  )
}
