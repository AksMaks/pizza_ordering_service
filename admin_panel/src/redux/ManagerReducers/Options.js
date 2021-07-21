import {Options as Api} from '../../api/api.js';
import {NotificationsAC} from '../NotificationsReducer.js';

let initialState = {
  InputForm: {
    initialValues: {},
    FormMainItems: [
      {
        ItemName: "IdProduct",
        Explanations: "Продукт",
        Type: "Select",
        Options: []
      },
      {
        ItemName: "Name",
        Explanations: "Вариант",
        Type: "Text"
      },
      {
        ItemName: "Weight",
        Explanations: "Вес",
        Type: "Number"
      },
      {
        ItemName: "Size",
        Explanations: "Размер",
        Type: "Number"
      },
      {
        ItemName: "Price",
        Explanations: "Цена",
        Type: "Number"
      },
      {
        ItemName: "Additive",
        Explanations: "Количество добавок",
        Type: "Number"
      },
      {
        ItemName: "Additives",
        Explanations: "Доступные добавки",
        Type: "SelectMultiple",
        Options: []
      }
    ]
  },
  Table:{
    Title: [
        {Name: "Продукт", ColumnName: "Product", Visibility: true},
        {Name: "Вариант", ColumnName: "Name", Visibility: true},
        {Name: "Вес", ColumnName: "Weight", Visibility: true},
        {Name: "Размер", ColumnName: "Size", Visibility: true},
        {Name: "Цена", ColumnName: "Price", Visibility: true},
        {Name: "Количестов добавок", ColumnName: "Additive", Visibility: true},
        {Name: "Добавки", ColumnName: "AdditivesTable", Visibility: true}
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
    case "SET_DATA_O":{
      stateCopy.InputForm.FormMainItems[0].Options = action.data.Products.map(el => {return {Key: el.Id, Data: el.Name}})
			stateCopy.InputForm.FormMainItems[6].Options = action.data.Additives.map(el => {return {Key: el.Id, Data: el.Name}})
			
      stateCopy.Table.Content = action.data.ProductOption.map(el => {
        return {
          ...el, 
          Additives: action.data.ListAdditives.filter(elf => elf.IdProductOption == el.Id).map(elm => elm.IdAdditive), 
          AdditivesTable: action.data.ListAdditives.filter(elf => elf.IdProductOption == el.Id).map(elm => elm.AdditiveName).join("; ")
        }
      });

      return stateCopy;
		}
    case "SET_INITIAL_VALUES_O":{

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
    return {type: "SET_DATA_O", data: data};
  },
  setInitialValues: (data) => {
      return {type: "SET_INITIAL_VALUES_O", data: data};
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

