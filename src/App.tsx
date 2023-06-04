import { useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from 'src/components/Layout/Layout'
import PageNotFound from 'src/pages/404'
import Details from 'src/pages/Details'
import Explore from 'src/pages/Explore'
import Home from 'src/pages/Home'
import SearchResult from 'src/pages/SearchResult'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { fetchDataFromApi } from './common/utils/api'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { Genres, GenresArray, GradesFlat } from './models/genres'

function App() {
  const dispatch = useAppDispatch()
  const { url } = useAppSelector((state) => state.home)
  console.log(url)

  useEffect(() => {
    apiTesting()
    genresCall()
  }, [])

  const apiTesting = () => {
    fetchDataFromApi('/configuration').then((res) => {
      console.log(res)

      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original'
      }

      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async () => {
    const promises: Promise<GenresArray>[] = []
    const endPoints = ['tv', 'movie']
    const allGenres: GradesFlat = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    data.map(({ genres }) => {
      return genres.map((item: Genres) => (allGenres[item.id] = item))
    })

    dispatch(getGenres(allGenres))
  }
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
