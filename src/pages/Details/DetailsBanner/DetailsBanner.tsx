import { useParams } from 'react-router-dom'

import ContentWrapper from 'src/components/ContentWrapper'
import useFetch, { FetchResult } from 'src/hooks/useFetch'
import { Grid, Box, CircularProgress, Typography } from '@mui/material'
import Img from 'src/components/LazyLoadImage/LazyLoadImage'
import { useAppSelector } from 'src/hooks/hooks'
import PosterFallback from 'src/assets/no-poster.png'
import { Crew, MovieData } from 'src/models/movie'
import dayjs from 'dayjs'

export interface DetailsBannerProps {
  crew?: Crew[]
}

const DetailsBanner = ({ crew }: DetailsBannerProps) => {
  const { mediaType, id } = useParams()
  const { data, loading }: FetchResult<MovieData> = useFetch<MovieData>(`/${mediaType}/${id}`)
  const { url } = useAppSelector((state) => state.home)

  const director = crew?.filter((f) => f.job === 'Director') || []
  const writer = crew?.filter((f) => f.job === 'Screenplay' || f.job === 'Story' || f.job === 'Writer') || []

  console.log('data: ', data)

  if (loading)
    return (
      <ContentWrapper>
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      </ContentWrapper>
    )

  if (data === null) return <ContentWrapper></ContentWrapper>

  return (
    <ContentWrapper>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={{ xs: 6, md: 8 }}
        sx={{ width: '100%' }}
      >
        <Grid item sx={{ img: { width: '100%' } }} xs={12} sm={6} md={6}>
          {data?.poster_path ? (
            <Img className='posterImg' src={url.backdrop + data.poster_path} />
          ) : (
            <Img className='posterImg' src={PosterFallback} />
          )}
        </Grid>
        <Grid item sx={{ img: { width: '100%' } }} xs={12} sm={6} md={6}>
          <Box width={'100%'}>
            <Typography variant='h3' gutterBottom>
              {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}
            </Typography>
          </Box>
          <Box width={'100%'} mb={4}>
            <Typography variant='body1' gutterBottom color='gray' fontSize={20}>
              {data.tagline}
            </Typography>
          </Box>
          {data.overview && (
            <Box width={'100%'}>
              <Typography variant='h6' gutterBottom>
                Overview
              </Typography>

              <Typography variant='body1' gutterBottom>
                {data.overview}
              </Typography>
            </Box>
          )}
          <Grid container rowSpacing={4}>
            {data.status && (
              <Grid item xs>
                <Typography variant='body2' gutterBottom>
                  Status:
                </Typography>
                <Typography variant='body2' gutterBottom color='gray'>
                  {data.status}
                </Typography>
              </Grid>
            )}
            {data.release_date && (
              <Grid item xs>
                <Typography variant='body2' gutterBottom>
                  Release Date:
                </Typography>
                <Typography variant='body2' gutterBottom color='gray'>
                  {data.release_date}
                </Typography>
              </Grid>
            )}

            {data.runtime && (
              <Grid item xs>
                <Typography variant='body2' gutterBottom>
                  Runtime:
                </Typography>

                <Typography variant='body2' gutterBottom color='gray'>
                  {data.runtime}
                </Typography>
              </Grid>
            )}
          </Grid>

          {director.length > 0 && (
            <Box mt={2}>
              <Typography variant='body2' gutterBottom>
                Director:
              </Typography>

              <Typography variant='body2' gutterBottom color='gray'>
                {director?.map((d, i) => (
                  <span key={i}>
                    {d.name}
                    {director.length - 1 !== i && ', '}
                  </span>
                ))}
              </Typography>
            </Box>
          )}

          {writer.length > 0 && (
            <Box mt={2}>
              <Typography variant='body2' gutterBottom>
                Writer:
              </Typography>

              <Typography variant='body2' gutterBottom color='gray'>
                {writer?.map((d, i) => (
                  <span key={i}>
                    {d.name}
                    {writer.length - 1 !== i && ', '}
                  </span>
                ))}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </ContentWrapper>
  )
}

export default DetailsBanner
