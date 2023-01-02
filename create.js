import { useState, useEffect } from 'react'
import { dequal as isEqual } from 'dequal'
import { flattie } from 'flattie'
import { nestie } from 'nestie'

const isSSR = typeof window === 'undefined'

const fromLocation = isSSR
  ? () => ({})
  : () => Object.fromEntries(new URLSearchParams(window.location.search))

const condition = isSSR ? [] : [window.location.search]

const identity = value => value

const useQueryState = fn => (initialQuery, mapper = identity) => {
  const [query, setQuery] = useState(
    initialQuery ? flattie(initialQuery) : mapper(fromLocation())
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
      ? flattie(obj)
      : { ...fromLocation(), ...flattie(obj) }

    if (!isEqual(query, newQuery)) {
      setQuery(newQuery)
      if (isNavigate) {
        const url = new URL(window.location.toString())
        url.search = new URLSearchParams(newQuery)
        fn(url)
      }
    }
  }

  return [nestie(query) || {}, set]
}

export default useQueryState
