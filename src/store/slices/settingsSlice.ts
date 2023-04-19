import { createSlice } from "@reduxjs/toolkit"
import { SupportedCurrencies, AvailableScreens } from "BitCloverV2/src/types/Home"

type SettingsSliceState = {
  currency: SupportedCurrencies
  initialScreen: AvailableScreens
}

const initialState: SettingsSliceState = {
  currency: 'GBP',
  initialScreen: 'Home'
}

export const settingsSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload
    },
    changeInitialScreen: (state, action) => {
      state.initialScreen = action.payload
    }
  }
})

export const { changeCurrency, changeInitialScreen } = settingsSlice.actions

export default settingsSlice.reducer