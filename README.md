# use-query-state

> React hook for sharing state via URL.

## Installation

```bash
$ npm install @Kikobeats/use-query-state --save
```

### for Next.js

Since [Next.js doesn't support ES Modules yet](https://github.com/vercel/next.js/issues/706), you need to installt [`next-transpile-modules`](https://github.com/martpie/next-transpile-modules) in order to make possible use the hook on Next.js:

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
