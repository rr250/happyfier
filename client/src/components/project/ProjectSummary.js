import React, { Component } from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {toggleBookMark} from '../../store/actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

class ProjectSummary extends Component{ 
  BookMarkToggle=(e)=>{
    e.preventDefault();
    this.props.toggleBookMark(this.props.auth.uid,this.props.project.id)
  }
    render(){
      return (
        <div>
        <div className="card z-depth-0" style={{opacity:'transparent'}}>
          <div className= "card-content grey-text text-darken-3" style={{opacity:'transparent'}}>
            <div className="card-panel" style={{ borderWidth:'1px', borderStyle:'solid', borderColor:'rgb(212, 212, 212)', borderLeftColor:'#f06292', borderLeftWidth:'5px', borderLeftStyle:'solid', boxShadow:"0px 0px 0px 0px", borderTopRightRadius:"7px", borderBottomRightRadius:"7px"}}>
				<p className="black-text">Posted by {this.props.project.authorFirstName} {this.props.project.authorLastName}
				<i className="material-icons" onClick={this.BookMarkToggle} style={{position: 'absolute', left: '97%', marginLeft: '-50px', color:'#f06292'}}>{this.props.profile.bookMarks && this.props.profile.bookMarks.includes(this.props.project.id)?"bookmark":"bookmark_border"}</i></p>
                
				<br/>
				<div className="card-action ">                  
        </div>
				<div style={{position: 'relative', top:"-25px"}}>			  	
					<p className="pink-text text-lighten-2 text-bold">{this.props.project.title}</p>					
					<p>{this.props.project.content.length>100?this.props.project.content.substring(0,100)+" ..... ":this.props.project.content}</p>
          {this.props.project.image && this.props.project.type && this.props.project.type==="image"?(<img src={this.props.project.image} alt="image" style={{width:'auto',maxHeight:'200px', maxWidth:'100%'}}></img>):null}
					<br />
          <p className="grey-text right">{moment(this.props.project.createdAt.toDate()).calendar()}</p>
				</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  const mapStateToProps=(state)=>{
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
