import isEqual from 'fast-deep-equal/es6/react'
import { flatten, unflatten } from 'flat'
import { encode, decode } from 'qss'
import react from 'react'

const isSSR = typeof window === 'undefined'

const fromLocation = isSSR
  ? () => ({})
  : () => {
      const urlObj = new URL(window.location)
      const query = Object.fromEntries(urlObj.searchParams.entries())
      const decodeQuery = Object.keys(query).reduce(
        (acc, key) => ({ ...acc, [key]: decode(query[key]) }),
        {}
      )
      return decodeQuery
    }

const noop = () => {}

const condition = isSSR ? [] : [window.location.search]

const useQueryState = (fn = noop) => initialQuery => {
  const [query, setQuery] = react.useState(
    initialQuery ? flatten(initialQuery) : fromLocation()
  )

  react.useEffect(() => {
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
        const encodedQuery = encode(newQuery)
        const symbol = query !== '' ? '?' : ''
        const newUrl = `${window.location.pathname}${symbol}${encodedQuery}`
        fn(newUrl)
      }
    }
  }

  return [unflatten(query), set]
}

export default useQueryState
