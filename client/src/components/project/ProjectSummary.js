import React from 'react'
import moment from 'moment'

const ProjectSummary = ({project}) => {
    return (
      <div className="project-list section white">
        <div className="card z-depth-0">
          <div className= "card-content grey-text text-darken-3 " >
            <div className="card-panel z-depth-3 yellow accent-2 ">
                <h4 className="blue-text">{project.title}</h4>
                <div class="card-action ">
                  <p className="black-text">Posted by {project.authorFirstName} {project.authorLastName}</p>
                  <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
                </div>
                </div>
            </div>
        </div>
      </div>
    )
  }

export default ProjectSummary
