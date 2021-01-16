import { navigate } from 'gatsby'

import useQueryState from '.'

export default useQueryState(({ window, query }) => {
  const symbol = query !== '' ? '?' : ''

  navigate(`${window.location.pathname}${symbol}${query}`)
})
