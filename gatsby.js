import { navigate } from 'gatsby'
import create from './create.js'
export default create(urlObj => navigate(`${urlObj.pathname}${urlObj.search}`))
