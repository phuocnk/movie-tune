import ContentWrapper from 'src/components/ContentWrapper'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from 'src/common/utils/api'
import { Typography, CircularProgress, Box } from '@mui/material'
import { MovieResponse } from 'src/models/responses'
import MovieCard from 'src/components/MovieCard/MovieCard'
import { useAppSelector } from 'src/hooks/hooks'

const SearchResult = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<MovieResponse | null>(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()
  const { url } = useAppSelector((state) => state.home)

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...(data?.results || []), ...res.results]
        })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1)
    })
  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])

  if (loading)
    return (
      <ContentWrapper>
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      </ContentWrapper>
    )

  if (!data || !data?.results || data?.results?.length <= 0)
    return (
      <ContentWrapper>
        <Typography variant='h5'>Sorry, Results not found!</Typography>
      </ContentWrapper>
    )

  return (
    <ContentWrapper>
      <Box mb={4}>
        <Typography variant='h5' gutterBottom>{`Search ${
          data?.total_results > 1 ? 'results' : 'result'
        } of '${query}'`}</Typography>
      </Box>
      <InfiniteScroll
        dataLength={data.results.length || 0}
        next={fetchNextPageData}
        hasMore={pageNum <= data?.total_pages}
        loader={<CircularProgress />}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-around' }}
      >
        {data?.results.map((item) => {
          if (item.media_type === 'person') return
          return (
            <MovieCard
              key={item.id}
              movie={item}
              posterUrl={url.poster}
              onClick={() => navigate(`/${item.media_type}/${item.id}`)}
            />
          )
        })}
      </InfiniteScroll>
    </ContentWrapper>
  )
}

export default SearchResult
