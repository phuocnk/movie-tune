export interface Genres {
  id: number
  name: string
}

export interface GenresArray {
  genres: Genres[]
}

export interface GradesFlat {
  [x: number]: Genres
}
