import React, { Component } from 'react';
import Notifications from './Notifications'
import ProjectList from '../project/ProjectList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {addToken} from '../../store/actions/userActions'
import { messaging } from '../../config/fbConfig'
import {Link} from 'react-router-dom'
import './DashBoard.css';

class Dashboard extends Component{
    state={
        token:''
    } 
    async componentDidMount() {
        var that = this
        var token;
        messaging.requestPermission()
          .then(async function() {
            token = await messaging.getToken();
            console.log(token,that);
            that.props.addToken(token)
          })
          .catch(function(err) {
            console.log("Unable to get permission to notify.", err);
          });
        navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
      } 
    render(){
        
        const { projects,auth,notifications }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
        return(
            <div className="DashBoard">
                    <div className="Projects">
                 
                        {projects && <ProjectList projects={projects}/>}
                        
                    </div>
                    <div className="Notifications">
                        <Notifications notifications={notifications}/>
                    
                    <div className="col s12 m4 offset-m8">
                    <h5>Bookmarks</h5>
                    {projects && this.props.profile.bookMarks && projects.map(project=>{
                        if(this.props.profile.bookMarks.includes(project.id))return(
                            <Link to={'/project/' + project.id} key={project.id}>
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title">{project.title}</span>
                                </div>
                            </div>
                            </Link>
                        )
                        else
                            return null
                    })}                        
                    </div>
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
        notifications: state.firestore.ordered.notifications,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      addToken:(token)=>dispatch(addToken(token))
    }
  }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'projects',orderBy:['createdAt','desc']}, {collection: 'notifications', limit:5, orderBy:['time','desc']}])
)(Dashboard)