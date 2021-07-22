import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

import NavBarReducer from './NavBarReducer.js';
import NotificationsReducer from './NotificationsReducer.js';
import BranchesReducer from './ManagerReducers/Branches.js';
import ProductsReducer from './ManagerReducers/Products.js';
import AdditivesReducer from './ManagerReducers/Additives.js';
import OptionsReducer from './ManagerReducers/Options.js';
import CategoryReducer from './ManagerReducers/Category.js';

let redusers = combineReducers({
  form: formReducer,
	NavBar: NavBarReducer,
  Notifications: NotificationsReducer,
  Products: ProductsReducer,
  Additives: AdditivesReducer,
  Branches: BranchesReducer,
  Options: OptionsReducer,
  Category: CategoryReducer
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;