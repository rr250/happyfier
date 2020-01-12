import React,{Component} from 'react'
import ProjectSummary from './ProjectSummary'
import {Link} from 'react-router-dom'
import './ProjectList.css'
import InfiniteScroll from 'react-infinite-scroller'

// const ProjectList = ({projects}) => {
  class ProjectList extends Component{
    state = {
      projectCount: 5,
      hasMore: true,
      projects: this.props.projects.slice(0,5)
    }

    constructor(props) {
      super(props);
  
      this.state = {
        projectCount: 5,
        hasMore: true,
        projects: props.projects.slice(0,5)
      };
    }

    loadFunc = ()=>{
      console.log('scrolling');
      const projects = this.state.projects;
      const projectCount = this.state.projectCount;
      if(projects && projects.length-projectCount>=5){
        this.setState({
          projectCount: projectCount+5,
          projects: projects.slice(0,projectCount),
        });
        if(projects.length-projectCount===5){
          this.setState({
            hasMore: false,
          });
        }
      }else if(projects){
        this.setState({
          hasMore: false,
          projects: projects,
          projectCount: projects.length
        });
      }
    }
    render(){
      const projects = this.props.projects;
    return (
      <div className="ProjectList">
        <InfiniteScroll
        pageStart={0}
        loadMore={this.loadFunc}
        hasMore={this.state.hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        >
        {projects && projects.map(project=>{
          if(project.diary===false)return(
            <Link to={'/project/' + project.id} key={project.id}>
              <ProjectSummary project={project}/>
            </Link>  
          )
          else
            return null
        })}         
        </InfiniteScroll>
      </div>
    )
  }
  }

export default ProjectList
