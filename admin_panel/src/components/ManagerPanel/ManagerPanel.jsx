import React from 'react';
import s from'./ManagerPanel.module.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import NavBar from './NavBar/NavBar.jsx';
import Content from './Content.jsx';

import {actionCreator as PAC, ThunkCreator as PTC} from '../../redux/ManagerReducers/Products'
import {actionCreator as OAC, ThunkCreator as OTC} from '../../redux/ManagerReducers/Options'
import {actionCreator as AAC, ThunkCreator as ATC} from '../../redux/ManagerReducers/Additives'
import {actionCreator as CAC, ThunkCreator as CTC} from '../../redux/ManagerReducers/Category'
import {actionCreator as StocksAC, ThunkCreator as StocksTC} from '../../redux/ManagerReducers/Stocks'

import {actionCreator as UsersAC, ThunkCreator as UsersTC} from '../../redux/ManagerReducers/Users'

import {actionCreator as BAC, ThunkCreator as BTC} from '../../redux/ManagerReducers/Branches'

const ManagerPanel = (props) => {
  return (
	<div className={s.ManagerPanel}>
		<NavBar NavBar={props.NavBar}/>
    <Route path="/Menu/Products" render={() => 
      <Content 
        path="/Menu/Products"
        data={props.Products} 
        dispatch={props.dispatch} 
        methods={{actionCreator: PAC, ThunkCreator: PTC}} 
        formName={"ProductForm"} 
        Name={"Товары"}
        Search={"Name"}
      />}/>
    <Route path="/Menu/Options" render={() => 
      <Content 
        path="/Menu/Options"
        data={props.Options} 
        dispatch={props.dispatch} 
        methods={{actionCreator: OAC, ThunkCreator: OTC}} 
        formName={"OptionForm"} 
        Name={"Варианты"}
        Search={"Product"}
      />}/>
    <Route path="/Menu/Additives" render={() => 
      <Content 
        path="/Menu/Additives" 
        data={props.Additives} 
        dispatch={props.dispatch} 
        methods={{actionCreator: AAC, ThunkCreator: ATC}} 
        formName={"AdditiveForm"} 
        Name={"Добавки"} 
        Search={"Name"}
      />}/>
    <Route path="/Menu/Categories" render={() => 
      <Content 
        path="/Menu/Categories" 
        data={props.Category} 
        dispatch={props.dispatch} 
        methods={{actionCreator: CAC, ThunkCreator: CTC}} 
        formName={"CategoryForm"} 
        Name={"Категории"} 
        Search={"Name"}
      />}/>
    <Route path="/Menu/Stocks" render={() => 
      <Content 
        path="/Menu/Stocks" 
        data={props.Stocks} 
        dispatch={props.dispatch} 
        methods={{actionCreator: StocksAC, ThunkCreator: StocksTC}} 
        formName={"StockFormЫ"} 
        Name={"Акции"} 
        Search={"Name"}
      />}/>
    <Route path="/Access/Workers" render={() => 
      <Content 
        path="/Access/Workers" 
        data={props.Users} 
        dispatch={props.dispatch} 
        methods={{actionCreator: UsersAC, ThunkCreator: UsersTC}} 
        formName={"UserFormЫ"} 
        Name={"Пользователи"} 
        Search={"Name"}
      />}/>
    <Route path="/Settings/Branches" render={() => 
      <Content 
        path="/Settings/Branches" 
        data={props.Branches} 
        dispatch={props.dispatch} 
        methods={{actionCreator: BAC, ThunkCreator: BTC}} 
        formName={"BranchForm"} 
        Name={"Отделы"} 
        Search={"Address"}
      />}/>
    </div>
  );
}

let mapStateToProps = (state) => {
	return {
		NavBar: state.NavBar,
    Branches: state.Branches,
    Additives: state.Additives,
    Products: state.Products,
    Options: state.Options,
    Category: state.Category,
    Stocks: state.Stocks,
    Users: state.Users
	}
};

let mapDispatchToProps = (dispatch) => {
	return {
    dispatch: dispatch
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagerPanel));