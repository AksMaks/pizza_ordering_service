import React from 'react';
import {connect} from 'react-redux';
import s from'./Notifications.module.css';
import { v4 as uuidv4 } from 'uuid';

import {NotificationsAC} from '../../redux/NotificationsReducer.js';

class Notifications extends React.Component {
    constructor(props){
        super(props);
    }
	render(){
        if(this.props.Notifications.length > 0){
            setTimeout(() => this.props.Delete(0), 5000);
        }
        console.log(this.props.Notifications)
        return (
            <div className={s.Notification}>
                {this.props.Notifications.map((el, ind) => {
                    return (
                        <div 
                            key={uuidv4()}  
                            className={s.Message} style={{backgroundColor: (el.Type === "Message")? "rgba(93, 206, 0, 1)": "rgba(255, 69, 69, 1)"}} onClick={() => this.props.Delete(ind)}>
                            {el.Message}
                        </div>
                    )
                })}
            </div>
	   )
    }
}


let mapStateToProps = (state) => {
	return {
        Notifications: state.Notifications.List
	}
};

let mapDispatchToProps = (dispatch) => {
	return {
        Delete: (ind) => {
            dispatch(NotificationsAC.DeleteNotification(ind));
        }
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);