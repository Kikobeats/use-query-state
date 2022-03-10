# use-query-state

> React hook for sharing state via URL.

## Installation

```bash
$ npm install @Kikobeats/use-query-state --save
```

## Usage

### Get query state

Just get it from `window.location.search`

```jsx
const [query, setQuery] = useQueryState()
```

### Pass a initial query state

This is especially useful for Server-side Rendering (SSR), when the initial query state will depends on the incoming request.

```jsx
const [query, setQuery] = useQueryState(ssrQuery)
```

### Transform the query state

Sometimes you want to modify the `window.location.search` for anything you need for.

```jsx
const safeDecode = value => {
  try {
    return decodeURIComponent(value)
  } catch (_) {
    return value
  }
}

const [query, setQuery] = useQueryState(undefined, parsedQuery =>
  Object.entries(parsedQuery).reduce((acc, [key, value]) => {
    acc[key] = safeDecode(value)
    return acc
  }, {})
)
```

## Integration

### for Next.js

Since [Next.js doesn't support ES Modules yet](https://github.com/vercel/next.js/issues/706), you need to install [`next-transpile-modules`](https://github.com/martpie/next-transpile-modules) in order to make possible use the hook on Next.js:

```js
const withTM = require('next-transpile-modules')(['@kikobeats/use-query-state'])

const nextConfig = {}

module.exports = withTM(withOffline(nextConfig))
```

### for Gatsby

```jsx
import useQueryState from '@kikobeats/use-query-state/gatsby'
```

## License

**use-query-state** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/use-query-state/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/use-query-state/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
