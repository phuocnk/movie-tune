import React, { useRef } from 'react'
import { styled } from '@mui/material/styles'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CircularProgress, Box, Typography } from '@mui/material'

import { MovieData } from 'src/models/movie'
import MovieCard from '../MovieCard/MovieCard'

const CarouselContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',

  '.arrow': {
    fontSize: 30,
    color: 'black',
    position: 'absolute',
    top: '44%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    opacity: 0.5,
    zIndex: 1,
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'block'
    },

    '&:hover': {
      opacity: 0.8
    }
  },

  '.carouselLeftNav': {
    left: 30
  },

  '.carouselRighttNav': {
    right: 30
  }
}))

interface CarouselProps {
  data: MovieData[] | undefined
  loading: boolean | string | null
  endpoint?: string
  title?: string
}

const Carousel: React.FC<CarouselProps> = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef<HTMLDivElement>(null)
  const { url } = useSelector((state: any) => state.home)
  const navigate = useNavigate()

  // const navigation = (dir: string) => {
  //   const container = carouselContainer.current

  //   const scrollAmount =
  //     dir === 'left'
  //       ? container?.scrollLeft - (container.offsetWidth + 20)
  //       : container?.scrollLeft + (container.offsetWidth + 20)

  //   container?.scrollTo({
  //     left: scrollAmount,
  //     behavior: 'smooth'
  //   })
  // }

  return (
    <CarouselContainer>
      {title && <Typography variant='h4'>{title}</Typography>}
      {/* <BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={() => navigation('left')} />
        <BsFillArrowRightCircleFill className='carouselRighttNav arrow' onClick={() => navigation('right')} /> */}
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
    </CarouselContainer>
  )
}

export default Carousel
