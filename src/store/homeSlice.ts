import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  url: any
  genres: any
}

const initialState: CounterState = {
  url: {},
  genres: {}
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getApiConfiguration: (state, action: PayloadAction<any>) => {
      state.url = action.payload
    },
    getGenres: (state, action: PayloadAction<any>) => {
      state.genres = action.payload
    }
  }
})

export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer
