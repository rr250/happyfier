import React,{Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import {postComment} from '../../store/actions/projectActions'

class ProjectDetails extends Component {
	state={
		comment:'',
		projectId:this.props.match.params.id
	}
	handleChange=(e)=>{
		this.setState({
		  [e.target.id]: e.target.value
		});
	} 
	handleSubmit=(e)=>{
		if(this.state.comment.length!==0 && e.key==='Enter'){
			this.props.postComment(this.state)
			this.setState({
				comment:''
			});
		}
	}  
	render(){
	const {project,auth}=this.props; 
	if(!auth.uid)
		return<Redirect to='/signin'/>     
	if(project){
		return(
      <div className="container section project-details">
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<div className="card z-depth-0"style={{ borderWidth:'1px', borderStyle:'solid', borderColor:'rgb(212, 212, 212)', borderLeftColor:'#e040fb', borderLeftWidth:'5px', borderLeftStyle:'solid'}}>
			<div className="card-content">
				<div className="card-title">{project.title}</div>
				<p>{project.content}</p>
			</div>
			<div className="card-action grey lighten-4 grey-text">
				<div>Posted by {project.authorFirstName} {project.authorLastName}</div>
				<div>{moment(project.createdAt.toDate()).calendar()}</div>
			</div>
			</div>
			<div className="input-field" onKeyDown={this.handleSubmit}>
				<label htmlFor="comment">Post a Comment</label>
				<textarea type="text" id="comment" className="materialize-textarea" onChange={this.handleChange} value={this.state.comment}/>  
			</div>
			{project.comments && project.comments.slice().reverse().map(comment =>{
					return(
						<div className="card z-depth-0"style={{ borderWidth:'1px', borderStyle:'solid', borderColor:'rgb(212, 212, 212)', boxShadow:"0px 0px 0px 0px", borderRadius:"7px"}}>
							<div className="card-content">
							<span className="purple-text text-accent-2">{comment["commenterFirstName"]} {comment["commenterLastName"]}
							<span className="grey-text text-darken-2"> : {comment["comment"]}</span>
							<p className="grey-text note-date">
								{moment(comment["commentDate"].toDate()).fromNow()}
							</p></span>
							</div>
						</div>
					)
				})}
			
		</div>
		)
	} else {
		return (
		<div className="container center">
			<p>Loading project...</p>
		</div>
		)
	}
	}
}

const mapStateToProps=(state,ownProps)=>{
  const id = ownProps.match.params.id;
  const projects=state.firestore.data.projects;
  const project=projects ? projects[id] : null
  return{
    project: project,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps=(dispatch)=>{
	return{
		postComment:(data)=>dispatch(postComment(data))
	}
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:'projects'}])
)(ProjectDetails)
