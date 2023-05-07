import { createSlice } from "@reduxjs/toolkit"

export type MarketListItemProps = {
  id: string
  name: string
  image: string
  price: number
  percentage: number
  rank: number
  symbol: string
}

type InitialFavouriteState = {
  ids: string[]
}

const initialState: InitialFavouriteState = {
  ids: []
}

export const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.ids = [...state.ids, action.payload]
    },
    removeFavourite: (state, action) => {
      state.ids = [...state.ids.filter(item => item !== action.payload)]
    },
    clear: (state, action) => {
      state.ids = []
    }
  }
})

export const { addFavourite, removeFavourite, clear } = favouriteSlice.actions

export default favouriteSlice.reducer