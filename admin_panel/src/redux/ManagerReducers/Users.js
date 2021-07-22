import {User as Api} from '../../api/api.js';
import {NotificationsAC} from '../NotificationsReducer.js';
import {required} from '../Validates.js'

let initialState = {
  InputForm: {
    initialValues: {},
    FormMainItems: [
      {
        ItemName: "Name",
        Explanations: "Название",
        Type: "Text",
        Validate: [required]
      },
      {
        ItemName: "Phone",
        Explanations: "Телефон",
        Type: "Phone",
        Validate: [required]
      },
      {
        ItemName: "Password",
        Explanations: "Пароль",
        Type: "Password",
        Validate: [required]
      },
      {
        ItemName: "Points",
        Explanations: "Баланс",
        Type: "Number",
        Validate: [required]
      }
    ]
  },
  Table:{
    Title: [
      {Name: "Название", ColumnName: "Name", Visibility: true},
      {Name: "Телефон", ColumnName: "Phone", Visibility: true},
      {Name: "Уровень", ColumnName: "LevelName", Visibility: true},
      {Name: "Кешбэк", ColumnName: "Сashback", Visibility: true},
      {Name: "Баланс", ColumnName: "Points", Visibility: true}
    ],
    Content: [
      ],
    Config: {
      Add: true,
      Details: false,
      Change: true,
      Delete: true
    }
  }
};

const Reducer = (state = initialState, action) => {
	
	let stateCopy = {...state};
	
	switch (action.type) {
    case "SET_DATA_User":{
			stateCopy.Table.Content = action.data.Users;
      return stateCopy;
		}
    case "SET_INITIAL_VALUES_User":{
			stateCopy.InputForm.initialValues = {...action.data};
      return stateCopy;
		}
		default:{
			return state;
		}
	}
}

export const actionCreator = {
  setData: (data) => {
    return {type: "SET_DATA_User", data: data};
  },
  setInitialValues: (data) => {
      return {type: "SET_INITIAL_VALUES_User", data: data};
  }
}

export const ThunkCreator = {
  Get: () => {
    return (dispatch) => {
      Api.Get().then((data) => {
        dispatch(actionCreator.setData(data.Data));
      });
    }
  },
  Add: (Data) => {
    let temp = {...Data, Addresses: [], IdRole: null, IdLevel: null}
    return (dispatch) => {
      Api.Insert(temp).then((response) => {
        if(!response.Error){
          dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
        }else{
          dispatch(NotificationsAC.SetNotification({Type: "Error", Message: response.Message}));
        }
      });
    }
  },
  Change: (Data) => {
    let temp = {...Data, Addresses: [], IdRole: null, IdLevel: null}
    return (dispatch) => {
      Api.Change(temp).then((response) => {
        if(!response.Error){
          dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
        }else{
          dispatch(NotificationsAC.SetNotification({Type: "Error", Message: response.Message}));
        }
      });
    }
  },
  Del: (Data) => {
    console.log(Data)
    return (dispatch) => {
      Api.Delete(Data).then((response) => {
        if(!response.Error){
          Api.Get().then((data) => {
            dispatch(actionCreator.setData(data.Data));
          });
          dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
        }else{
          dispatch(NotificationsAC.SetNotification({Type: "Error", Message: response.Message}));
        }
      });
    }
  }
}

export default Reducer

