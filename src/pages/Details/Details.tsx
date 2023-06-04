import { useParams } from 'react-router-dom'

import ContentWrapper from 'src/components/ContentWrapper'
import useFetch, { FetchResult } from 'src/hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import { Credits } from 'src/models/movie'

const Details = () => {
  const { mediaType, id } = useParams()

  const { data: credits }: FetchResult<Credits> = useFetch<Credits>(`/${mediaType}/${id}/credits`)

  return (
    <ContentWrapper>
      <DetailsBanner crew={credits?.crew} />
    </ContentWrapper>
  )
}

export default Details
