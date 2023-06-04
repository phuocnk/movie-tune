import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Box, Typography } from '@mui/material'

import { MovieData } from 'src/models/movie'
import MovieCard from '../MovieCard/MovieCard'
import { useAppSelector } from 'src/hooks/hooks'
interface CarouselProps {
  data: MovieData[] | undefined
  loading: boolean | string | null
  endpoint?: string
  title?: string
}

const Carousel: React.FC<CarouselProps> = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef<HTMLDivElement>(null)
  const { url } = useAppSelector((state) => state.home)
  const navigate = useNavigate()

  return (
    <Box>
      {title && <Typography variant='h4'>{title}</Typography>}
      {!loading ? (
        <Box
          sx={(theme) => ({
            display: 'flex',
            gap: 2,
            overflowY: 'hidden',
            [theme.breakpoints.up('md')]: {
              gap: 4,
              overflow: 'hidden'
            }
          })}
          ref={carouselContainer}
        >
          {data?.map((item) => (
            <MovieCard
              key={item.id}
              movie={item}
              onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
              posterUrl={url.poster}
            />
          ))}
        </Box>
      ) : (
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default Carousel
