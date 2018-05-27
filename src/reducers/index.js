import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import ProfileReducer from './reducer_profile';

const rootReducer = combineReducers({
  user: UserReducer,
  //profile: ProfileReducer
});

export default rootReducer;
