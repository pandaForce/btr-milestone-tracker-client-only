import isTest from './isTest'
import{SERVER_URL_TEST,SERVER_URL_PRODUCTION} from '../constants/variables'

const axios_url = isTest ? SERVER_URL_PRODUCTION : SERVER_URL_TEST

export default axios_url
