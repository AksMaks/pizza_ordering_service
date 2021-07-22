import {Stocks as Api} from '../../api/api.js';
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
        ItemName: "DateBegin",
        Explanations: "Начало работа",
        Type: "Number",
        Validate: [required]
      },
      {
        ItemName: "DateEnd",
        Explanations: "Конец работы",
        Type: "Number",
        Validate: [required]
      },
      {
        ItemName: "Image",
        Explanations: "Изображение",
        Type: "File",
        Validate: [required]
      },
      {
        ItemName: "PromoCode",
        Explanations: "Промокод",
        Type: "Text",
        Validate: [required]
      }
    ]
  },
  Table:{
    Title: [
      {Name: "Название", ColumnName: "Name", Visibility: true},
      {Name: "Начало работа", ColumnName: "DateEnd", Visibility: true},
      {Name: "Конец работы", ColumnName: "DateEnd", Visibility: true},
      {Name: "Изображение", ColumnName: "Image", Visibility: true},
      {Name: "Промокод", ColumnName: "PromoCode", Visibility: true}
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
    case "SET_DATA_STOCK":{
			stateCopy.Table.Content = action.data;
      return stateCopy;
		}
    case "SET_INITIAL_VALUES_STOCK":{
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
    return {type: "SET_DATA_STOCK", data: data};
  },
  setInitialValues: (data) => {
      return {type: "SET_INITIAL_VALUES_STOCK", data: data};
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
    form.append("OldImage", Data.OldImage)
    form.append("Name", Data.Name)
    form.append("DateBegin", Data.DateBegin)
    form.append("DateEnd", Data.DateEnd)
    form.append("PromoCode", Data.PromoCode)

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
    form.append("Name", Data.Name)
    form.append("DateBegin", Data.DateBegin)
    form.append("DateEnd", Data.DateEnd)
    form.append("PromoCode", Data.PromoCode)

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

