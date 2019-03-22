import { combineReducers } from 'redux';
import routes from './routes.reducer';

const rootReducer = combineReducers({
  routes,
});

export default rootReducer;
