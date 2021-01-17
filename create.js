import { dequal as isEqual } from 'dequal'
import { flatten, unflatten } from 'flat'
import { encode, decode } from 'qss'
import react from 'react'

const isSSR = typeof window === 'undefined'

const fromLocation = isSSR
  ? () => ({})
  : () => decode(window.location.search.substring(1))

const condition = isSSR ? [] : [window.location.search]

const useQueryState = fn => initialQuery => {
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
        const symbol = encodedQuery !== '' ? '?' : ''
        const newUrl = `${window.location.pathname}${symbol}${encodedQuery}`
        fn(newUrl)
      }
    }
  }

  return [unflatten(query), set]
}

export default useQueryState
