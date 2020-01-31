import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faBell, faEdit, faPencilAlt, faSignOutAlt, faBook } from '@fortawesome/free-solid-svg-icons'

const SignedInLinks = (props) => {
    console.log(props.profile)
    return (
        <ul className="right">
            <li><NavLink to='/create'><FontAwesomeIcon icon={faPencilAlt}/></NavLink></li>
            <li><NavLink to='/gratitudejournal'><FontAwesomeIcon icon={faBook}/></NavLink></li>
            <li><NavLink to='/gratitudejournal'style={{}}><FontAwesomeIcon icon={faFire} /> {props.profile.streak}</NavLink></li>
            <li><NavLink to='/gratitudejournal'style={{}}><FontAwesomeIcon icon={faBell} /></NavLink></li>
            <li><a onClick={props.signOut}><FontAwesomeIcon icon={faSignOutAlt}/></a></li>
            <li><NavLink to='/yourposts' className='btn btn-floating white purple-text text-accent-2 text-bold z-depth-2'>{props.profile.initials}</NavLink></li>
        </ul>
    )
}
  const mapDispatchToProps=(dispatch)=>{
    return{
        signOut: ()=> dispatch(signOut())
    }
  }
  
  export default connect(null,mapDispatchToProps)(SignedInLinks);