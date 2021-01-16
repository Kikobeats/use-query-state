import factory from '.'

export default factory(({ window, query }) => {
  const symbol = query !== '' ? '?' : ''

  window.history.pushState(
    '',
    '',
    `${window.location.pathname}${symbol}${query}`
  )
})
