import React from 'react'
import moment from 'moment'
import './ProjectSummary.css'

const ProjectSummary = ({project}) => {
  function handleDelete(id,e){
    e.preventDefault();
    console.log(id);
    this.props.deleteProject(id)
  }  
    return (
      <div className="ProjectSummary">
        <div className="PostInformation">
          <div className="PostTitleContainer">
            <div className="PostTitle">{project.title}</div>
            <i className="material-icons">bookmark_border</i>
          </div>
          <div className="Line"></div>
          <div className="PostDetails">
            <div className="AuthorName">Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div className="CreationTime">{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
    <div className="content">{project.content.substring(0,200)}</div>
      </div>
    )
  }

export default ProjectSummary
