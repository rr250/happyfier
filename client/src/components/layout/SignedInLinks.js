import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import { CreateProjectModal} from '../project/CreateProjectModal';
import {signOut} from '../../store/actions/authActions'
import {createProject} from '../../store/actions/projectActions'
import firebase from 'firebase'

export class SignedInLinks extends Component {    
    render(){
        return (
            <ul className="right">
                <li><CreateProjectModal createProject={this.props.createProject}/></li>
                <li><NavLink to='/create'>Write your Story</NavLink></li>
                <li><NavLink to='/gratitudejournal'>Gratitude Journal</NavLink></li>
                <li><a onClick={this.props.signOut}>LogOut</a></li>
                <li><NavLink to='/yourposts' className='btn btn-floating yellow lighten-1 blue-text text-darken-2 z-depth-2'>{this.props.profile.initials}</NavLink></li>
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