import { MovieData } from './movie'

export interface UpcomingResponse {
  dates?: string
  page: number
  results?: MovieData[]
  total_pages: number
  total_results: number
}

export interface TrendingResponse {
  page: number
  results?: MovieData[]
  total_pages: number
  total_results: number
}
