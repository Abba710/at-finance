import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import '../global.css'
import Navmenu from '@/component/Navigation'
import Home from './screens/Home'

export default function App() {
  return (
    <View className="bg-[[#1F1F1F]] w-full h-full">
      <StatusBar style="light" />
      <Home></Home>
      <Navmenu />
    </View>
  )
}
