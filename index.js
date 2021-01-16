const isEqual = require('fast-deep-equal/es6/react')
const { useState, useEffect } = require('react')
const { flatten, unflatten } = require('flat')
const { encode, decode } = require('qss')

const isSSR = typeof window === 'undefined'

const fromLocation = isSSR
  ? () => ({})
  : () => decode(window.location.search.substring(1))

const noop = () => {}

const condition = isSSR ? [] : [window.location.search]

const useQueryState = (fn = noop) => initialQuery => {
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
      if (isNavigate) fn(window, encode(newQuery))
    }
  }

  return [unflatten(query), set]
}

export default useQueryState
