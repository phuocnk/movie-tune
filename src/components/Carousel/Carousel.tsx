import React, { useRef } from 'react'
import { styled } from '@mui/material/styles'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { Container, Typography } from '@mui/material'
import PosterFallback from '../../assets/no-poster.png'
import ContentWrapper from '../ContentWrapper'
import Img from '../LazyLoadImage/LazyLoadImage'
import { MovieData } from 'src/models/movie'
// import Genres from '../Genres'
// import CircleRating from '../CircleRating'

const CarouselContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',

  '.carouselTitle': {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'normal'
  },

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
  },

  '.loadingSkeleton': {
    display: 'flex',
    gap: 10,
    overflowY: 'hidden',
    marginRight: -20,
    marginLeft: -20,
    padding: '0 20px',

    [theme.breakpoints.up('md')]: {
      gap: 20,
      overflow: 'hidden',
      margin: 0,
      padding: 0
    },

    '.skeletonItem': {
      width: 125,
      flexShrink: 0,

      [theme.breakpoints.up('md')]: {
        width: 'calc(25% - 15px)'
      },

      [theme.breakpoints.up('lg')]: {
        width: 'calc(20% - 16px)'
      },

      '.posterBlock': {
        borderRadius: 12,
        width: '100%',
        aspectRatio: '1 / 1.5',
        marginBottom: 30
      },

      '.textBlock': {
        display: 'flex',
        flexDirection: 'column',

        '.title': {
          width: '100%',
          height: 20,
          marginBottom: 10
        },

        '.date': {
          width: '75%',
          height: 20
        }
      }
    }
  },

  '.carouselItems': {
    display: 'flex',
    gap: 10,
    overflowY: 'hidden',
    marginRight: -20,
    marginLeft: -20,
    padding: '0 20px',

    [theme.breakpoints.up('md')]: {
      gap: 20,
      overflow: 'hidden',
      margin: 0,
      padding: 0
    },

    '.carouselItem': {
      width: 125,
      cursor: 'pointer',
      flexShrink: 0,

      [theme.breakpoints.up('md')]: {
        width: 'calc(25% - 15px)'
      },

      [theme.breakpoints.up('lg')]: {
        width: 'calc(20% - 16px)'
      },

      '.posterBlock': {
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1.5',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 10,

        '.lazy-load-image-background': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 12,
          overflow: 'hidden',

          img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }
        },

        '.circleRating': {
          width: 40,
          height: 40,
          position: 'relative',
          top: 30,
          backgroundColor: 'white',
          flexShrink: 0,

          [theme.breakpoints.up('md')]: {
            width: 50,
            height: 50
          }
        },

        '.genres': {
          display: 'none',
          position: 'relative',

          [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'flex-end'
          }
        }
      },

      '.textBlock': {
        color: 'white',
        display: 'flex',
        flexDirection: 'column',

        '.title': {
          fontSize: 16,
          marginBottom: 10,
          // lineHeight: 24,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',

          [theme.breakpoints.up('md')]: {
            fontSize: 20
          }
        },

        '.date': {
          fontSize: 14,
          opacity: 0.5
        }
      }
    }
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

  const navigation = (dir: string) => {
    const container = carouselContainer.current

    const scrollAmount =
      dir === 'left'
        ? container?.scrollLeft - (container.offsetWidth + 20)
        : container?.scrollLeft + (container.offsetWidth + 20)

    container?.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  const skItem = () => {
    return (
      <div className='skeletonItem'>
        <div className='posterBlock skeleton'></div>
        <div className='textBlock'>
          <div className='title skeleton'></div>
          <div className='date skeleton'></div>
        </div>
      </div>
    )
  }

  return (
    <CarouselContainer>
      {title && <Typography className='carouselTitle'>{title}</Typography>}
      {/* <BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={() => navigation('left')} />
        <BsFillArrowRightCircleFill className='carouselRighttNav arrow' onClick={() => navigation('right')} /> */}
      {!loading ? (
        <div className='carouselItems' ref={carouselContainer}>
          {data?.map((item) => {
            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
            return (
              <div
                key={item.id}
                className='carouselItem'
                onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
              >
                <div className='posterBlock'>
                  <Img src={posterUrl} />
                  {/* <CircleRating rating={item.vote_average.toFixed(1)} /> */}
                  {/* <Genres data={item.genre_ids.slice(0, 2)} /> */}
                </div>
                <div className='textBlock'>
                  <span className='title'>{item.title || item.name}</span>
                  <span className='date'>{dayjs(item.release_date || item.first_air_date).format('MMM D, YYYY')}</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='loadingSkeleton'>
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
        </div>
      )}
    </CarouselContainer>
  )
}

export default Carousel
