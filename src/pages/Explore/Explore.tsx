import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import ContentWrapper from 'src/components/ContentWrapper'
import useFetch from 'src/hooks/useFetch'
import { Genres, GenresArray } from 'src/models/genres'
import { fetchDataFromApi } from 'src/common/utils/api'
import MovieCard from 'src/components/MovieCard/MovieCard'
import { useAppSelector } from 'src/hooks/hooks'
import { Box, Typography, CircularProgress, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

import { SORT_OPTIONS } from './constants'
import { FilterProps, PageData } from './types'

let filters: FilterProps = {}

const Explore = () => {
  const navigate = useNavigate()
  const { mediaType } = useParams()
  const { url } = useAppSelector((state) => state.home)

  const [data, setData] = useState<PageData | null>(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const [genre, setGenre] = useState<Genres | null>(null)
  const [sortby, setSortby] = useState(null)

  const genreListRes = useFetch<GenresArray>(`/genre/${mediaType}/list`)
  const genresList = genreListRes?.data?.genres

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...res.results]
        })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1)
    })
  }

  useEffect(() => {
    filters = {}
    setData(null)
    setPageNum(1)
    setSortby(null)
    setGenre(null)
    fetchInitialData()
  }, [mediaType])

  const onChange = (event: any) => {
    const {
      target: { value, name }
    } = event

    if (name === 'sortby') {
      setSortby(value)
      if (value !== '') {
        filters.sort_by = value
      } else {
        delete filters.sort_by
      }
    }
    if (name === 'genres') {
      setGenre(value)
      if (!value.includes('')) {
        filters.with_genres = value.join(',')
      } else {
        delete filters.with_genres
      }
    }

    setPageNum(1)
    fetchInitialData()
  }
  return (
    <ContentWrapper>
      <Grid container mb={4} direction='row' justifyContent='space-between' spacing={1}>
        <Grid item>
          <Box>
            <Typography variant='h4'>{mediaType === 'tv' ? 'Explore TV Shows' : 'Explore Movies'}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'end' }}>
          <FormControl variant='standard' sx={{ marginRight: 2, minWidth: 150 }}>
            <InputLabel id='genres-label'>Genres</InputLabel>
            <Select
              id='genres'
              name='genres'
              multiple
              size='small'
              value={genre || []}
              onChange={onChange}
              placeholder='Select genres'
            >
              {genresList?.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant='standard' sx={{ minWidth: 150 }}>
            <InputLabel id='sortby-label'>Sort by</InputLabel>
            <Select
              id='sortby'
              name='sortby'
              value={sortby || ''}
              onChange={onChange}
              size='small'
              placeholder='Sort by'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {SORT_OPTIONS?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading && (
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <>
          {data?.results?.length || 0 > 0 ? (
            <InfiniteScroll
              dataLength={data?.results?.length || 0}
              next={fetchNextPageData}
              hasMore={pageNum <= (data?.total_pages || 0)}
              loader={<CircularProgress />}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 20, overflow: 'hidden', justifyContent: 'space-around' }}
            >
              {data?.results?.map((item) => {
                if (item.media_type === 'person') return
                return (
                  <MovieCard
                    key={item.id}
                    movie={item}
                    posterUrl={url.poster}
                    onClick={() => navigate(`/${item.media_type || mediaType}/${item.id}`)}
                  />
                )
              })}
            </InfiniteScroll>
          ) : (
            <span className='resultNotFound'>Sorry, Results not found!</span>
          )}
        </>
      )}
    </ContentWrapper>
  )
}

export default Explore
