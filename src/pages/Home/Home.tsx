import ContentWrapper from 'src/components/ContentWrapper'
import Trending from './components/Trending'
import Popular from './components/Popular'
import TopRated from './components/TopRated'

const Home = () => {
  return (
    <ContentWrapper>
      <Trending />
      <Popular />
      <TopRated />
    </ContentWrapper>
  )
}

export default Home
