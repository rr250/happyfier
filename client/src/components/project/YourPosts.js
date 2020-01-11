import React, { Component } from 'react';
import ProjectList from '../project/ProjectList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

class YourPosts extends Component{
    render(){
        
        const { projects,auth }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m7">
                    {projects && projects.map(project=>{
                        if(auth.uid===project.authorId)return(
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title">{project.title}</span>
                                    <p>{project.content}</p>
                                </div>
                            </div>
                        )
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
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{collection: 'projects',orderBy:['createdAt','desc']}])
)(YourPosts)