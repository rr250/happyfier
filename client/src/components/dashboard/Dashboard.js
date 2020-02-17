import React, { Component } from 'react';
import {GratitudeJournal} from '../project/GratitudeJournal';
import ProjectList from '../project/ProjectList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {addToken} from '../../store/actions/userActions'
import {createProject} from '../../store/actions/projectActions'
import {updateStreak} from '../../store/actions/userActions'
import { messaging } from '../../config/fbConfig'
import Bookmarks from './Bookmarks';


class Dashboard extends Component{
    state={
        token:'',
        streak:0,
        diff:0,
        mode:0,
        currentDate:new Date()
    } 
    async componentDidMount() {
        var that = this
        var token;
        if(this && this.props && !this.props.profile.isEmpty){
            const diff=Math.floor(Math.abs(new Date(this.props.profile.lastUpdated["seconds"]*1000).getTime()-this.state.currentDate.getTime())/(1000 * 3600 * 24))
            if(diff===1){
                this.setState({streak:this.props.profile.streak+1})
            }
            if(diff===0){
                this.setState({streak:this.props.profile.streak})
            }
        }
        if(this.props.auth.uid){
            this.props.updateStreak(this.state)
        }
        if(this.props.auth.uid){
        messaging.requestPermission()
          .then(async function() {
            token = await messaging.getToken();
            console.log(token,that);
            that.props.addToken(token)
          })
          .catch(function(err) {
            console.log("Unable to get permission to notify.", err);
          });
        }
        if(this.props.auth.uid){
            messaging.onTokenRefresh(() => {
                messaging.getToken().then((refreshedToken) => {
                  console.log('Token refreshed.');
                  that.props.addToken(refreshedToken)
                  console.log(refreshedToken,that);
                }).catch((err) => {
                  console.log('Unable to retrieve refreshed token ', err);
                });
            });
        }
        messaging.onMessage((payload) => {
            console.log('Message received. ', payload);
        });
        navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
      } 
    render(){
        
        const { projects,auth }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
        return(
            <div className="dashboard container">
                <br />
                <div className="row">
                <br />
                <br />
                    <div className="col s12 m7">  
                        <GratitudeJournal users={this.props.users} auth={auth} profile={this.props.profile} createProject={this.props.createProject} updateStreak={this.props.updateStreak}/>
                        <br />  
                        <br />
                        <br />             
                        <ProjectList projects={projects}/>
                    </div>                    
                    <div className="col s12 m3 offset-m1">
                    <br />
                        <Bookmarks profile={this.props.profile} projects={projects} />                   
                    </div>
                </div>
            </div>  
        )  
    }
}

const mapStateToProps=(state)=>{
    return{
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.data.users,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      addToken:(token)=>dispatch(addToken(token)),
      createProject:(project)=>dispatch(createProject(project)),
      updateStreak:(data)=>dispatch(updateStreak(data))
    }
  }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'projects',orderBy:['createdAt','desc']}])
)(Dashboard)
