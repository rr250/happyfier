import React, { Component } from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {deleteProject} from '../../store/actions/projectActions'
import {Link} from 'react-router-dom'

class YourPosts extends Component{
    handleDelete=(id,e)=>{
        e.preventDefault();
        console.log(id);
        this.props.deleteProject(id)
    }  


    render(){
        
        const { projects,auth }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m7">
                    <h4>Personal Diary</h4>
                    {projects && projects.map(project=>{
                        if(auth.uid===project.authorId)return(
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title">{project.title}</span>
                                    <p>{project.content}</p>
                                    <div className="input-field">
                                        <button className="btn yellow lighten-1 z-depth-2 blue-text text-darken-2" onClick={(e) => this.handleDelete(project.id, e)}>Delete</button>  
                                    </div>
                                </div>
                            </div>
                        )
                        else
                            return null
                    })}                        
                    </div>
                    <div className="col s12 m4 offset-m1">
                    <h5>Bookmarks</h5>
                    {projects && projects.map(project=>{
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