import { useEffect, useState } from 'react'
import { fetchDataFromApi } from 'src/common/utils/api'

export interface FetchResult<T> {
  data: T | null
  loading: null | string | boolean
  error: null | string
}

const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<null | string | boolean>(null)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    setLoading('loading...')
    setData(null)
    setError(null)

    fetchDataFromApi(url)
      .then((res: T) => {
        setLoading(false)
        setData(res)
      })
      .catch(() => {
        setLoading(false)
        setError('Something went wrong!')
      })
  }, [url])

  return { data, loading, error }
}

export default useFetch
