import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'

export type MainParamsList = {
  Home: undefined
  Markets: undefined
  Favourites: undefined
  Exchanges: undefined
  Settings: undefined
}

export type AppStackParamsList = {
  Main: undefined
  CoinInfo: { coinId: string, coinName: string, coinImage: string }
  Privacy: undefined
  Terms: undefined
}

export type AppStackScreenProps<T> =
  NativeStackScreenProps<AppStackParamsList, T>

export type MainScreenProps<T> =
  NativeStackScreenProps<MainParamsList, T>
