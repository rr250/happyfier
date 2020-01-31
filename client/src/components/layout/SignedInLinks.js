import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import { CreateProjectModal} from '../project/CreateProjectModal';
import {signOut} from '../../store/actions/authActions'
import {createProject} from '../../store/actions/projectActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faBell, faEdit, faPencilAlt, faSignOutAlt, faBook } from '@fortawesome/free-solid-svg-icons'

export class SignedInLinks extends Component {    
    render(){
        return (
            <ul className="right">
            <li><CreateProjectModal createProject={this.props.createProject}/></li>
            <li><NavLink to='/create'><FontAwesomeIcon icon={faPencilAlt}/></NavLink></li>
            <li><NavLink to='/gratitudejournal'><FontAwesomeIcon icon={faBook}/></NavLink></li>
            <li><NavLink to='/gratitudejournal'style={{}}><FontAwesomeIcon icon={faFire} /> {this.props.profile.streak}</NavLink></li>
            <li><NavLink to='/gratitudejournal'style={{}}><FontAwesomeIcon icon={faBell} /></NavLink></li>
            <li><a onClick={this.props.signOut}><FontAwesomeIcon icon={faSignOutAlt}/></a></li>
            <li><NavLink to='/yourposts' className='btn btn-floating white purple-text text-accent-2 text-bold z-depth-2'>{this.props.profile.initials}</NavLink></li>
            </ul>
        )
    }
}
  const mapDispatchToProps=(dispatch)=>{
    return{
        signOut: ()=> dispatch(signOut()),
        createProject:(project)=>dispatch(createProject(project))
    }
  }
  
  export default connect(null,mapDispatchToProps)(SignedInLinks);