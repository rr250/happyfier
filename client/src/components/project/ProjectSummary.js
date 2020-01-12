import React, { Component } from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import './ProjectSummary.css'
import {toggleBookMark} from '../../store/actions/userActions'

class ProjectSummary extends Component{ 
  BookMarkToggle=(e)=>{
    e.preventDefault();
    console.log(this.props.project.id);
    this.props.toggleBookMark(this.props.auth.uid,this.props.project.id)
  }
    render(){
      return (
      <div className="ProjectSummary">
        <div className="PostInformation">
          <div className="PostTitleContainer">
            <div className="PostTitle">{this.props.project.title}</div>
            <i className="material-icons" onClick={this.BookMarkToggle}>{this.props.profile.bookMarks && this.props.profile.bookMarks.includes(this.props.project.id)?"bookmark":"bookmark_border"}</i>
          </div>
          <div className="Line"></div>
          <div className="PostDetails">
            <div className="AuthorName">Posted by {this.props.project.authorFirstName} {this.props.project.authorLastName}</div>
            <div className="CreationTime">{moment(this.props.project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
    <div className="content">{this.props.project.content}</div>
      </div>
    )
    }
  }

  const mapStateToProps=(state)=>{
    console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

  const mapDispatchToProps=(dispatch)=>{
    return{
        toggleBookMark: (id,projectId)=> dispatch(toggleBookMark(id,projectId))
    }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(ProjectSummary);
