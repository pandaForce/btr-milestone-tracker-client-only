import isTest from './isTest'
import{SERVER_URL_TEST,SERVER_URL_PRODUCTION} from '../constants/variables'

const axios_url = isTest ?  SERVER_URL_TEST : SERVER_URL_PRODUCTION

export default axios_url