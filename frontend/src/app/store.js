import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import clientReducer from './reducers/clientReducer';

const rootReducer = combineReducers({
  client: clientReducer,
});

const store = createStore(rootReducer);

const AppProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export { store, AppProvider };
