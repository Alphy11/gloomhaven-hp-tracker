import { combineReducers } from 'redux';
import client from '../client';

export default combineReducers({
  apollo: client.reducer(),
});
