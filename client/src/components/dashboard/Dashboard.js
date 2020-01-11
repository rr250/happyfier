import React, { Component } from 'react';
import Notifications from './Notifications'
import ProjectList from '../project/ProjectList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import './DashBoard.css';

class Dashboard extends Component{
    render(){
        
        const { projects,auth,notifications }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
        return(
            <div className="DashBoard">
                    <div className="Projects">
                 
                        <ProjectList projects={projects}/>
                        
                    </div>
                    
                    <div className="Notifications">
                        <Notifications notifications={notifications}/>
                    </div>
            </div>  
        )  
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{collection: 'projects',orderBy:['createdAt','desc']}, {collection: 'notifications', limit:3, orderBy:['time','desc']}])
)(Dashboard)