import {Products as Api} from '../../api/api.js';
import {NotificationsAC} from '../NotificationsReducer.js';

let initialState = {
  InputForm: {
    initialValues: {},
    FormMainItems: [
      {
        ItemName: "Name",
        Explanations: "Название",
        Type: "Text"
      },
      {
        ItemName: "Description",
        Explanations: "Описание",
        Type: "TextArea"
      },
      {
        ItemName: "Image",
        Explanations: "Изображение",
        Type: "File"
      },
      {
        ItemName: "Branches",
        Explanations: "Отделения",
        Type: "SelectMultiple",
        Options: [
        ]
      }
    ]
  },
  Table:{
    Title: [
        {Name: "Название", ColumnName: "Name", Visibility: true},
        {Name: "Описание", ColumnName: "Description", Visibility: true},
        {Name: "Изображение", ColumnName: "Image", Visibility: true},
        {Name: "Отделения", ColumnName: "BranchesTable", Visibility: true}
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
    case "SET_DATA_P":{
      stateCopy.InputForm.FormMainItems[3].Options = action.data.Branches.map(el => {return {Key: el.Id, Data: el.Address}})
			
      stateCopy.Table.Content = action.data.Products.map(el => {
        return {
          ...el, 
          Branches: action.data.BranchProducts.filter(elf => elf.IdProduct == el.Id).map(elm => elm.IdBranch), 
          BranchesTable: action.data.BranchProducts.filter(elf => elf.IdProduct == el.Id).map(elm => elm.Address).join("; ")
        }
      });

      return stateCopy;
		}
    case "SET_INITIAL_VALUES_P":{

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
    return {type: "SET_DATA_P", data: data};
  },
  setInitialValues: (data) => {
      return {type: "SET_INITIAL_VALUES_P", data: data};
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
    form.append("Description", Data.Description)
    form.append("Branches", JSON.stringify(Data.Branches))

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
    form.append("Description", Data.Description)
    form.append("Branches", JSON.stringify(Data.Branches))

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

