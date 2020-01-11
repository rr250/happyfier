import React from 'react'
import ProjectSummary from './ProjectSummary'
import {Link} from 'react-router-dom'
import './ProjectList.css'

const ProjectList = ({projects}) => {
    return (
      <div className="ProjectList">
        {projects && projects.map(project=>{
          if(project.diary===false)return(
            <Link to={'/project/' + project.id} key={project.id}>
              <ProjectSummary project={project}/>
            </Link>  
          )
          else
            return null
        })}         
      </div>
    )
  }

export default ProjectList
