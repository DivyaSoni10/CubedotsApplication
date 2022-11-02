import { combineReducers } from 'redux';
import common from './common';
import home from './home';

const appReducer = combineReducers({
  common,
  home,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;