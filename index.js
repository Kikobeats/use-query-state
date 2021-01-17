import create from './create'
export default create(newUrl => window.history.pushState('', '', newUrl))
