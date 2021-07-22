import {Levels as Api} from '../../api/api.js';
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
        ItemName: "Сashback",
        Explanations: "Процент кешбэка",
        Type: "Number",
        Validate: [required]
      },
      {
        ItemName: "Border",
        Explanations: "Граница перехода",
        Type: "Number",
        Validate: [required]
      }
    ]
  },
  Table:{
    Title: [
      {Name: "Название", ColumnName: "Name", Visibility: true},
      {Name: "Процент кешбэка", ColumnName: "Сashback", Visibility: true},
      {Name: "Граница перехода", ColumnName: "Border", Visibility: true}
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
    case "SET_DATA_LEVEL":{
			stateCopy.Table.Content = action.data;
      return stateCopy;
		}
    case "SET_INITIAL_VALUES_LEVEL":{
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
    return {type: "SET_DATA_LEVEL", data: data};
  },
  setInitialValues: (data) => {
      return {type: "SET_INITIAL_VALUES_LEVEL", data: data};
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
    return (dispatch) => {
      Api.Insert(Data).then((response) => {
        if(!response.Error){
          dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
        }else{
          dispatch(NotificationsAC.SetNotification({Type: "Error", Message: response.Message}));
        }
      });
    }
  },
  Change: (Data) => {
    return (dispatch) => {
      Api.Change(Data).then((response) => {
        if(!response.Error){
          dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
        }else{
          dispatch(NotificationsAC.SetNotification({Type: "Error", Message: response.Message}));
        }
      });
    }
  },
  Del: (Data) => {

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

