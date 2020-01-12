import React, { Component } from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import './ProjectSummary.css'
import {toggleBookMark} from '../../store/actions/projectActions'

class ProjectSummary extends Component{ 
// const ProjectSummary = ({project}) => {
  // function handleDelete(id,e){
  //   e.preventDefault();
  //   console.log(id);
  //   this.props.deleteProject(id);
  // }  
  BookMarkToggle=(e)=>{
    e.preventDefault();
    console.log(this.props.project.id);
    this.props.toggleBookMark(this.props.project.id,)
  }
    render(){
      return (
      // <div className="project-list section white">
      //   <div className="card z-depth-0">
      //     <div className= "card-content grey-text text-darken-3 " >
      //       <div className="card-panel z-depth-3 yellow accent-2 ">
      //           <h4 className="blue-text">{project.title}</h4>
      //           <div class="card-action ">
      //             <p className="black-text">Posted by {project.authorFirstName} {project.authorLastName}</p>
      //             <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
      //           </div>
      //           </div>
      //       </div>
      //   </div>
      // </div>
      <div className="ProjectSummary">
        <div className="PostInformation">
          <div className="PostTitleContainer">
            <div className="PostTitle">{this.props.project.title}</div>
            <i className="material-icons" onClick={this.BookMarkToggle}>{this.props.project.BookMarked?"bookmark":"bookmark_border"}</i>
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

  // const mapStateToProps=(state)=>{
  //   console.log(state);
  //   return{
  //       auth: state.firebase.auth,
  //       authError: state.auth.authError
  //   }
  // }

  const mapDispatchToProps=(dispatch)=>{
    return{
        toggleBookMark: (id,bookMarkStatus)=> dispatch(toggleBookMark(id,bookMarkStatus))
    }
  }
  
export default connect(null,mapDispatchToProps)(ProjectSummary);
