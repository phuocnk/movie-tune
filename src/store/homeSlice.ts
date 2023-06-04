import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GradesFlat } from 'src/models/genres'

type UrlState = {
  backdrop?: string
  poster?: string
  profile?: string
}
export interface HomeState {
  url: UrlState
  genres: GradesFlat
}

const initialState: HomeState = {
  url: {},
  genres: {}
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getApiConfiguration: (state, action: PayloadAction<UrlState>) => {
      state.url = action.payload
    },
    getGenres: (state, action: PayloadAction<GradesFlat>) => {
      state.genres = action.payload
    }
  }
})

export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer
