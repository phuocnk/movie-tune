import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from 'src/components/Layout/Layout'
import PageNotFound from 'src/pages/404'
import Details from 'src/pages/Details'
import Explore from 'src/pages/Explore'
import Home from 'src/pages/Home'
import SearchResult from 'src/pages/SearchResult'

function App() {
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
