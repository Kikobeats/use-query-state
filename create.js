import { dequal as isEqual } from 'dequal'
import { flatten, unflatten } from 'flat'
import { useState, useEffect } from 'react'
import { encode } from 'qss'

const isSSR = typeof window === 'undefined'

const fromLocation = isSSR
  ? () => ({})
  : () => {
      const urlObj = new URL(window.location)
      const query = Object.fromEntries(urlObj.searchParams.entries())
      const decodeQuery = Object.keys(query).reduce(
        (acc, key) => ({ ...acc, [key]: decodeURIComponent(query[key]) }),
        {}
      )
      return decodeQuery
    }

const condition = isSSR ? [] : [window.location.search]

const useQueryState = fn => initialQuery => {
  const [query, setQuery] = useState(
    initialQuery ? flatten(initialQuery) : fromLocation()
  )

  useEffect(() => {
    const newQuery = fromLocation()
    if (!isEqual(query, newQuery)) setQuery(newQuery)
  }, condition)

  const set = (
    obj = {},
    { replace = false, navigate: isNavigate = true } = {}
  ) => {
    const newQuery = replace
      ? flatten(obj)
      : { ...fromLocation(), ...flatten(obj) }

    if (!isEqual(query, newQuery)) {
      setQuery(newQuery)
      if (isNavigate) {
        const url = new URL(window.location.toString())
        url.search = new URLSearchParams(encode(newQuery))
        fn(url)
      }
    }
  }

  return [unflatten(query), set]
}

export default useQueryState
