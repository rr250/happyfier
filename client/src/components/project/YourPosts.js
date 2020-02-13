import React, { Component } from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {deleteProject} from '../../store/actions/projectActions'
import Bookmarks from '../dashboard/Bookmarks'

class YourPosts extends Component{
    handleDelete=(id,e)=>{
        e.preventDefault();
        this.props.deleteProject(id)
    }  


    render(){
        
        const { projects,auth }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
        return(
            <div className="dashboard container">
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col s12 m7">
                    <h4 className="grey-text darken-4">Personal Diary</h4>
                    {projects && projects.map(project=>{
                        if(auth.uid===project.authorId)return(
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">{project.title}</span>
                                    <p>{project.content}</p>
                                    <div className="input-field">
                                        <button className="btn purple accent-2 z-depth-2 z-depth-2" onClick={(e) => this.handleDelete(project.id, e)}>Delete</button>  
                                    </div>
                                </div>
                            </div>
                        )
                        else
                            return null
                    })}                        
                    </div>
                    <div className="col s12 m4 offset-m1">
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
        profile: state.firebase.profile
  }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      deleteProject:(project)=>dispatch(deleteProject(project))
    }
  }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'projects',orderBy:['createdAt','desc']}])
)(YourPosts)