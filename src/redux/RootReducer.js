import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import CurrentUserReducer from './reducers/CurrentUserReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['current_user'],
};
const rootReducer = combineReducers({
  current_user: CurrentUserReducer,
});
export default persistReducer(persistConfig, rootReducer);
