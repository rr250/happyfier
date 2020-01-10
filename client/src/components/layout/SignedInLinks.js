import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    console.log(props.profile)
    return (
        <ul className="right">
            <li><NavLink to='/create'>NewProject</NavLink></li>
            <li><a onClick={props.signOut}>LogOut</a></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>{props.profile.initials}</NavLink></li>
        </ul>
    )
}
  const mapDispatchToProps=(dispatch)=>{
    return{
        signOut: ()=> dispatch(signOut())
    }
  }
  
  export default connect(null,mapDispatchToProps)(SignedInLinks);