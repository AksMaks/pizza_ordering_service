import React from 'react';
import s from'./NavBar.module.css';
import {NavLink} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            LinkGroups: this.props.NavBar.LinkGroups.map((el)=>{
                return {...el, Minimized: false}
            })
        };
    }
	
    ChangeMinimized = (ind) => {
        let TempMinimized = ( this.state.LinkGroups[ind].Minimized )? false: true;
        let TempLinkGroups = this.state.LinkGroups.map(el => {
            return {...el, Minimized: false}
        });
        TempLinkGroups[ind].Minimized = TempMinimized;
        this.setState({
            LinkGroups: TempLinkGroups
        });
    }
    
    LinkGroups = (data, index) => {
        return( 
            <div className={s.LinkGroups} key={index}>
                <div className={s.Title} onClick={()=> this.ChangeMinimized(index)} key={index}>
                    <img 
                        className={s.Icon} 
                        src={"/Assets/Icons/NavBar/" + data.Icon} 
                        style={{filter: (data.Minimized? "invert(20%) sepia(34%) saturate(1105%) hue-rotate(339deg) brightness(102%) contrast(101%)": null)}}/>
                    <div className={s.Text} style={{color: (data.Minimized? "rgba(255, 182, 41, 1)": null)}}>{data.Title}</div>
                </div>
                {data.Minimized?
                    <ul>
                        {data.Links.map((el, ind)=> <li key={uuidv4()}><NavLink key={ind+"link"} activeClassName={s.activeLink} className={s.Link} to={el.Link}>{el.Name}</NavLink></li>)}
                    </ul>
                    : null}
            </div>
        );
    }
    
	render(){
        return (
            <div className={s.NavBar} style={{minHeight: window.innerHeight}}>
                <div className={s.CommonData}>
                    <div>Логотип</div>
                    <div><img src={"/Assets/Icons/NavBar/Logo.png"}/></div>
                    <div>{localStorage.getItem("UserName")}</div>
                </div>
                <hr/>
                {this.state.LinkGroups.map(
                    (el, ind)=> {
                      return this.LinkGroups(el, ind);
                    }
                )}
                <hr/>
                <div className={s.Footer}>
                    <div><a href="/" className={s.Exit} onClick={() => {sessionStorage.removeItem("Token"); sessionStorage.removeItem("UserName");}}>Выйти</a></div>
                </div>
            </div>
	   )
    }
}

export default NavBar;