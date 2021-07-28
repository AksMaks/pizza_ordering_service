import {Additives as Api} from '../../api/api.js';
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
        ItemName: "Image",
        Explanations: "Изображение",
        Type: "File",
        Validate: [required]
      },
      {
        ItemName: "Weight",
        Explanations: "Вес",
        Type: "Number",
        Validate: [required]
      },
      {
        ItemName: "Price",
        Explanations: "Цена",
        Type: "Number",
        Validate: [required]
      }
    ]
  },
  Table:{
    Title: [
      {Name: "Название", ColumnName: "Name", Visibility: true},
      {Name: "Изображение", ColumnName: "Image", Visibility: true},
      {Name: "Вес", ColumnName: "Weight", Visibility: true},
      {Name: "Цена", ColumnName: "Price", Visibility: true}
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
    case "SET_DATA_A":{
			stateCopy.Table.Content = action.data;
      return stateCopy;
		}
    case "SET_INITIAL_VALUES_A":{
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
    return {type: "SET_DATA_A", data: data};
  },
  setInitialValues: (data) => {
      return {type: "SET_INITIAL_VALUES_A", data: data};
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
    form.append("Name", Data.Name)
    form.append("Weight", Data.Weight)
    form.append("Price", Data.Price)

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
    form.append("Weight", Data.Weight)
    form.append("Price", Data.Price)

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

