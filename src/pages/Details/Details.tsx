import { useParams } from 'react-router-dom'

import ContentWrapper from 'src/components/ContentWrapper'
import useFetch, { FetchResult } from 'src/hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import { Credits, Video } from 'src/models/movie'
import { VideoResponse } from 'src/models/responses'

const Details = () => {
  const { mediaType, id } = useParams()
  const { data, loading }: FetchResult<VideoResponse> = useFetch<VideoResponse>(`/${mediaType}/${id}/videos`)
  const { data: credits, loading: creditsLoading }: FetchResult<Credits> = useFetch<Credits>(
    `/${mediaType}/${id}/credits`
  )

  return (
    <ContentWrapper>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
    </ContentWrapper>
  )
}

export default Details
