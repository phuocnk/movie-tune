import { MovieData } from 'src/models/movie'

export interface PageData {
  page: number
  results: MovieData[]
  total_pages: number
  total_results: number
}

export interface FilterProps {
  sort_by?: string
  with_genres?: string
}
