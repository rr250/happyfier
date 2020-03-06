import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import { CreateProjectModal} from '../project/CreateProjectModal';
import {signOut} from '../../store/actions/authActions'
import {createProject} from '../../store/actions/projectActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faSignOutAlt, faBook } from '@fortawesome/free-solid-svg-icons'
import Notifications from '../dashboard/Notifications';
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

export class SignedInLinks extends Component {    

    render(){
        return (
            <ul className="right">
                <li><CreateProjectModal createProject={this.props.createProject}/></li>
                <li><NavLink to='/yourposts'><FontAwesomeIcon icon={faBook}/></NavLink></li>
                <li><NavLink to='/gratitudejournal'><FontAwesomeIcon icon={faFire} /> {this.props.profile.streak}</NavLink></li>
                <li><Notifications notifications={this.props.notifications}/></li>
                <li><a onClick={this.props.signOut}><FontAwesomeIcon icon={faSignOutAlt}/></a></li>
                <li><NavLink to='/yourposts' className='btn btn-floating white pink-text text-lighten-2 text-bold z-depth-2'>{this.props.profile.initials}</NavLink></li>
            </ul>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        notifications: state.firestore.ordered.notifications,
    }
}

  const mapDispatchToProps=(dispatch)=>{
    return{
        signOut: ()=> dispatch(signOut()),
        createProject:(project)=>dispatch(createProject(project))
    }
  }
  
  export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect([{collection: 'notifications', limit:5, orderBy:['time','desc']}]))(SignedInLinks);