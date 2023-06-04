import { Box } from '@mui/material'

import Carousel from 'src/components/Carousel/Carousel'
import useFetch, { FetchResult } from 'src/hooks/useFetch'
import { useState } from 'react'
import { TrendingResponse } from 'src/models/responses'
import CarouselHeader from 'src/components/Carousel/CarouselHeader'

const Trending = () => {
  const [endpoint, setEndpoint] = useState('day')

  const { data, loading }: FetchResult<TrendingResponse> = useFetch<TrendingResponse>(`/trending/movie/${endpoint}`)

  return (
    <Box>
      <CarouselHeader
        title='Trending'
        selectValue={endpoint}
        onSelect={(value) => setEndpoint(value)}
        options={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' }
        ]}
      />
      <Carousel data={data?.results} loading={loading} />
    </Box>
  )
}

export default Trending
