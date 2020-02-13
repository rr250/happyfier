import React,{Component} from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import M from 'materialize-css';  

export class Notifications extends Component{
    componentDidMount(){
        let dropdowns = document.querySelectorAll(".dropdown-trigger");
        let options = {
        inDuration: 300,
        outDuration: 225,
        belowOrigin: true,
        constrainWidth: false,
        coverTrigger:false
        };
        M.Dropdown.init(dropdowns, options);
    }
    render(){
        const notifications=this.props.notifications;
    return(
        <div>
            <a className='dropdown-trigger' data-hover="true" data-target="dropdown1"><FontAwesomeIcon icon={faBell} /></a>
            <div className="section" id='dropdown1' className='dropdown-content'>
                <div className="card z-depth-0">
                    <div className="card-content">
                        {notifications && notifications.map(item=>{
                            return(
                                <li key={item.id}>
                                    <span className="purple-text text-accent-2">{item.user}
                                    <span className="grey-text text-darken-2"> {item.content}</span>
                                    <div className="grey-text note-date">
                                        {moment(item.time.toDate()).fromNow()}
                                    </div></span>
                                </li>
                            )
                        })}                        
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Notifications;