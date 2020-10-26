import { combineReducers } from 'redux'
import client from './client'
import alert from './alert'

export default combineReducers({
  client,
  alert
})