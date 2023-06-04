import { Box } from '@mui/material'

import Carousel from 'src/components/Carousel/Carousel'
import useFetch, { FetchResult } from 'src/hooks/useFetch'
import { useState } from 'react'
import { TrendingResponse } from 'src/models/responses'
import CarouselHeader from 'src/components/Carousel/CarouselHeader'

const TopRated = () => {
  const [endpoint, setEndpoint] = useState('movie')

  const { data, loading }: FetchResult<TrendingResponse> = useFetch<TrendingResponse>(`/${endpoint}/top_rated`)

  return (
    <Box mt={12}>
      <CarouselHeader
        title='Top Rated'
        selectValue={endpoint}
        onSelect={(value) => setEndpoint(value)}
        options={[
          { label: 'Movies', value: 'movie' },
          { label: 'TV Shows', value: 'tv' }
        ]}
      />
      <Carousel data={data?.results} loading={loading} />
    </Box>
  )
}

export default TopRated
