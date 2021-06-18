import create from './create.js'
export default create(urlObj => window.history.pushState('', '', urlObj))
