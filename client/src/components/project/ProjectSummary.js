import React from 'react'
import moment from 'moment'
import './ProjectSummary.css'

const ProjectSummary = ({project}) => {
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
