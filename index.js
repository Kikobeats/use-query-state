import create from './create.js'
export default create(newUrl => window.history.pushState('', '', newUrl))
