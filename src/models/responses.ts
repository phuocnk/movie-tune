import { MovieData, Video } from './movie'

export interface MovieResponse {
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

export interface VideoResponse {
  id: number
  results: Video[]
}
