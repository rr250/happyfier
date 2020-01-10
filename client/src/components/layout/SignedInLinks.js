import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    console.log(props.profile)
    return (
        <ul className="right">
            <li><NavLink to='/create'>New Post</NavLink></li>
            <li><NavLink to='/test'>New Test</NavLink></li>
            <li><a onClick={props.signOut}>LogOut</a></li>
            <li><NavLink to='/' className='btn btn-floating yellow lighten-1 blue-text text-darken-2 z-depth-2'>{props.profile.initials}</NavLink></li>
        </ul>
    )
}
  const mapDispatchToProps=(dispatch)=>{
    return{
        signOut: ()=> dispatch(signOut())
    }
  }
  
  export default connect(null,mapDispatchToProps)(SignedInLinks);