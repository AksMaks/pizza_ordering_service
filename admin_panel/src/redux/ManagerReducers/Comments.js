import {Comments as Api} from '../../api/api.js';
import {NotificationsAC} from '../NotificationsReducer.js';

let initialState = {
  InputForm: {
    initialValues: {},
    FormMainItems: [
      {
        ItemName: "Date",
        Explanations: "Дата",
        Type: "Date"
      },
      {
        ItemName: "Image",
        Explanations: "Изображение",
        Type: "File"
      }
    ]
  },
  Table:{
    Title: [
      {Name: "Дата", ColumnName: "Date", Visibility: true},
      {Name: "Изображение", ColumnName: "Image", Visibility: true}
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
    case "SET_DATA_COM":{
			stateCopy.Table.Content = action.data;
      return stateCopy;
		}
    case "SET_INITIAL_VALUES_COM":{
			stateCopy.InputForm.initialValues = {...action.data, OldImage: action.data.Image};
      return stateCopy;
		}
		default:{
			return state;
		}
	}
}

export const actionCreator = {
  setData: (data) => {
    return {type: "SET_DATA_COM", data: data};
  },
  setInitialValues: (data) => {
      return {type: "SET_INITIAL_VALUES_COM", data: data};
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
    let form = new FormData()
    form.append("Image", Data.Image)
    form.append("Date", Data.Date)

    return (dispatch) => {
      Api.Insert(form).then((response) => {
        if(!response.Error){
          dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
        }else{
          dispatch(NotificationsAC.SetNotification({Type: "Error", Message: response.Message}));
        }
      });
    }
  },
  Change: (Data) => {
    let form = new FormData()
    form.append("Id", Data.Id)
    form.append("Image", Data.Image)
    form.append("OldImage", Data.OldImage)
    form.append("Date", Data.Date)

    return (dispatch) => {
      Api.Change(form).then((response) => {
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

