import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'
import firebase from 'firebase'

const SignedInLinks = (props) => {
    const askForPermissioToReceiveNotifications = async () => {
    try {
    
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey('BOxGc_2ECYYe1fpFbFXdKBLYpg1MEbwMt8E57SkZJcG_H9PnaZX5fbTi99DZo4efbCs9phjGmWvQeung9O0cFdo');
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('user token: ', token);
    
        return token;
    } catch (error) {
        console.error(error);
    }
    }
    console.log(props.profile)
    return (
        <ul className="right">
            <li><NavLink to='/create'>New Post</NavLink></li>
            <li><NavLink to='/gratitudejournal'>Gratitude Journal</NavLink></li>
            <li><a onClick={askForPermissioToReceiveNotifications}>Show Notifications</a></li>
            <li><a onClick={props.signOut}>LogOut</a></li>
            <li><NavLink to='/yourposts' className='btn btn-floating yellow lighten-1 blue-text text-darken-2 z-depth-2'>{props.profile.initials}</NavLink></li>
        </ul>
    )
}
  const mapDispatchToProps=(dispatch)=>{
    return{
        signOut: ()=> dispatch(signOut())
    }
  }
  
  export default connect(null,mapDispatchToProps)(SignedInLinks);