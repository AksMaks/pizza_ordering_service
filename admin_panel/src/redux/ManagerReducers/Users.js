import {request} from '../api/api.js';
import {NotificationsAC} from './NotificationsReducer.js';

let initialState = {
  
};

export default UserReducer = (state = initialState, action) => {
	
	let stateCopy = {...state};
	
	switch (action.type) {
        case "SET_COMMON_DATA":{
            stateCopy.User = action.data.User;
            stateCopy.User.Access = {...action.data.User.Access, Statistics: true};
            
            stateCopy.Branches = Object.values(action.data.Branches);
            stateCopy.CurrentBranch = stateCopy.Branches[0];
			return stateCopy;
		}
        case "SET_CURRENT_BRANCH":{
            stateCopy.CurrentBranch = stateCopy.Branches.find(el => {
                if(el.Id === action.data.IdCurrentBranch){
                    return 1;
                }else{
                    return 0;
                }
            });
			return stateCopy;
		}
		default:{
			return state;
		}
	}
}

export const actionCreator = {
    SetCommonData: (data) => {
        return {
            type: "SET_COMMON_DATA",
            data: data
        };
    },
    SetCurrentBranch: (data) => {
         return {
            type: "SET_CURRENT_BRANCH",
            data: data
        };
    }
    
}

export const ThunkCreator = {
  Login: (Data) => {
    return (dispatch) => {
      request("/Workman/login", {...Data, Password: Data.Password}).then((data) => {
        if(data.error || !data.User){
          dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.error}));
        }else{
          dispatch(NotificationsAC.SetNotification({Type: "Message", Message: data.message}));
          dispatch(CommonAC.SetCommonData(data))
        }
      });
    }
  }
}

