import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDYyYmNiZWI4YTk4Yzg1ZTgxOTYzZWU5M2E4NGEwZiIsInN1YiI6IjYwZjNlZmRiNTU0NWNhMDA1YzE4MzIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9RnrQC2befi2P-q3fpTLC6rEuAhvWKktxxDxXwXMPrk'

const headers = {
  Authorization: 'bearer ' + TMDB_TOKEN
}

export const fetchDataFromApi = async (url: string, params?: any) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params
    })
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}
