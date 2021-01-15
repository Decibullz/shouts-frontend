import { createStore, combineRducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers";
import uiReducer from "./reducers";
import dataReducer from "./reducers";

const initialState = {};

const middleWare = [thunk];

const reducers = combineRducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
