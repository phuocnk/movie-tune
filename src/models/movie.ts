import { Genres } from './genres'

export interface MovieData {
  backdrop_path: string
  first_air_date: string
  release_date?: string
  genre_ids: number[]
  id: number
  name: string
  title: string
  media_type: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
  adult: false
  belongs_to_collection: null
  budget: number
  genres: Genres[]
  homepage: string
  imdb_id: string
  original_title: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  video: boolean
}

interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}
export interface Credits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}
