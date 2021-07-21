import React from 'react';
import {Route} from 'react-router-dom';
import s from './ManagerContent.module.css';
import {withRouter} from 'react-router-dom';

import InputForm from './InputForm/InputForm';
import TableContent from './TableContent/TableContent';

const Content = (props) => {
  return (
	<div className={s.ManagerContent}>
    <Route exact  path={props.path} render={() => 
      <TableContent 
        Title={props.Name}
				Table={props.data.Table}
        Search={props.Search}
        Get={() => props.dispatch(props.methods.ThunkCreator.Get())}
        Change={(data) => props.dispatch(props.methods.actionCreator.setInitialValues(data))}
				Del={(data) => props.dispatch(props.methods.ThunkCreator.Del(data))}
      />
    } />
    <Route exact path={`${props.path}/Add`} render={() => 
      <InputForm
        Title={"Добавление"}
        TextSubmit={"Добавить"}
        goBack={()=>{props.history.goBack();}}
      
        form={props.formName}
        initialValues={null}
      
        InputForm={props.data.InputForm}
        onSubmit={(Data) => props.dispatch(props.methods.ThunkCreator.Add(Data))}
      />
    } />
    <Route exact path={`${props.path}/Change`} render={() => 
      <InputForm
        Title={"Изменение"}
        TextSubmit={"Изменить"}
        goBack={()=>{props.history.goBack();}}
      
        form={props.formName}
        initialValues={props.data.InputForm.initialValues}
      
        InputForm={props.data.InputForm}
        onSubmit={(Data) => props.dispatch(props.methods.ThunkCreator.Change(Data))}
      />
    } />
	</div>
  );
}

export default withRouter(Content);