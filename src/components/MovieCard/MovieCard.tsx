import dayjs from 'dayjs'

import { Box, Typography } from '@mui/material'
import Img from '../LazyLoadImage'
import { MovieData } from 'src/models/movie'
import PosterFallback from 'src/assets/no-poster.png'

export interface MovieCardProps {
  movie: MovieData
  posterUrl: string
  onClick: (id?: number | string) => void
}
function MovieCard({ movie, posterUrl, onClick }: MovieCardProps) {
  const imageUrl = movie.poster_path ? posterUrl + movie.poster_path : PosterFallback

  return (
    <Box
      key={movie.id}
      sx={(theme) => ({
        width: 125,
        cursor: 'pointer',
        flexShrink: 0,
        

        [theme.breakpoints.up('md')]: {
          width: 'calc(25% - 15px)'
        },

        [theme.breakpoints.up('lg')]: {
          width: 'calc(20% - 16px)'
        }
      })}
      onClick={() => onClick(movie.id)}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1.5',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: 2,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          // padding: 2,
          '.lazy-load-image-background': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 4,
            overflow: 'hidden',

            img: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }
          }
        }}
      >
        <Img src={imageUrl} />
      </Box>
      <Box>
        <Typography variant='subtitle1'>{movie.title || movie.name}</Typography>
        <Typography variant='subtitle2' color={'gray'}>
          {dayjs(movie.release_date || movie.first_air_date).format('MMM D, YYYY')}
        </Typography>
      </Box>
    </Box>
  )
}
export default MovieCard
