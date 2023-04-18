import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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