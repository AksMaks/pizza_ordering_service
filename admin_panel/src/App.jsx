import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import ManagerPanel from './components/ManagerPanel/ManagerPanel';
import Notifications from './components/Notifications/Notifications.jsx';

const App = (props) =>{
  return (
    <div className="App">
      <Notifications/>
      {sessionStorage.getItem("Token")? <ManagerPanel/>: <AuthForm/>}
    </div>
  );
}

export default App;

