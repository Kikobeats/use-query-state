import create from './create'
export default create(url => window.history.pushState('', '', url))
