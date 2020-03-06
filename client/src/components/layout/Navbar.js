import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from'./SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

const Navbar = (props) => {
    const {auth,profile}=props;
    const links=auth.uid? <SignedInLinks profile={profile} />:<SignedOutLinks/>;
    return (
        <nav className="pink lighten-2" style={{position:'fixed', zIndex:1}}>
            <div className="container nav-wrapper">
                <Link to={auth.uid ? '/' : '/signin'} className="brand-logo left hide-on-med-and-up"><i className="large material-icons">mood</i></Link>
                <Link to={auth.uid ? '/' : '/signin'} className="brand-logo left hide-on-small-only "><i className="large material-icons ">mood</i>Happyfier</Link>
                <ul id="nav-mobile" className="right">
                    <li>{links}</li>
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(Navbar);