import React,{Component} from 'react'
import ProjectSummary from './ProjectSummary'
import {Link} from 'react-router-dom'
// const ProjectList = ({projects}) => {
  class ProjectList extends Component{
    render(){
      const projects = this.props.projects;
    return (
      <div className="card-panel z-depth-0" style={{opacity:'transparent', zIndex:-1}}>
        <h5 className="grey-text darken-4" style={{marginLeft:"30px"}}>Happyfier Chapter</h5>
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
  }

export default ProjectList
