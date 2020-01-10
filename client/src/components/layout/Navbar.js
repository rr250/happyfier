import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from'./SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

const Navbar = (props) => {
    const {auth,profile}=props;
    console.log(auth);
    const links=auth.uid? <SignedInLinks profile={profile} />:<SignedOutLinks/>;
    return (
        <nav>
            <div className="nav-wrapper blue darken-3">
                <Link to='/' className="brand-logo left yellow-text text-lighten-1 hide-on-med-and-up"><i class="material-icons">mood</i></Link>
                <Link to='/' className="brand-logo center yellow-text text-lighten-1 hide-on-small-only	"><i class="material-icons">mood</i>Happify</Link>
                <ul id="nav-mobile" class="right">
                    <li>{links}</li>
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(Navbar);