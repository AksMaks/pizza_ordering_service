import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

import NavBarReducer from './NavBarReducer.js';
import NotificationsReducer from './NotificationsReducer.js';

import ProductsReducer from './ManagerReducers/Products.js';
import AdditivesReducer from './ManagerReducers/Additives.js';
import OptionsReducer from './ManagerReducers/Options.js';
import CategoryReducer from './ManagerReducers/Category.js';
import StocksReducer from './ManagerReducers/Stocks.js';

import UsersReducer from './ManagerReducers/Users.js';

import CooperationsReducer from './ManagerReducers/Cooperations.js';
import ContactsReducer from './ManagerReducers/Contacts.js';
import CommentsReducer from './ManagerReducers/Comments.js';
import LevelsReducer from './ManagerReducers/Levels.js';

import BranchesReducer from './ManagerReducers/Branches.js';

let redusers = combineReducers({
  form: formReducer,
	NavBar: NavBarReducer,
  Notifications: NotificationsReducer,
  Products: ProductsReducer,
  Additives: AdditivesReducer,
  Branches: BranchesReducer,
  Options: OptionsReducer,
  Category: CategoryReducer,
  Stocks: StocksReducer,
  Users: UsersReducer,
  Levels: LevelsReducer,
  Comments: CommentsReducer,
  Contacts: ContactsReducer,
  Cooperations: CooperationsReducer
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;