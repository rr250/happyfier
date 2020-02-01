import React, { Component } from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {toggleBookMark} from '../../store/actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

class ProjectSummary extends Component{ 
  BookMarkToggle=(e)=>{
    e.preventDefault();
    console.log(this.props.project.id);
    this.props.toggleBookMark(this.props.auth.uid,this.props.project.id)
  }
    render(){
      return (
        <div>
        <div className="card z-depth-0" style={{opacity:'transparent'}}>
          <div className= "card-content grey-text text-darken-3" style={{opacity:'transparent'}}>
            <div className="card-panel" style={{borderLeftColor:'#e040fb', borderLeftWidth:'5px', borderLeftStyle:'solid'}}>
              <i className="material-icons" onClick={this.BookMarkToggle} style={{position: 'absolute', left: '100%', marginLeft: '-50px', color:'#e040fb'}}>{this.props.profile.bookMarks && this.props.profile.bookMarks.includes(this.props.project.id)?"bookmark":"bookmark_border"}</i>
                <h4 className="purple-text text-accent-2 text-bold">{this.props.project.title}</h4>
                
                <p>{this.props.project.content.substring(0,100)} ..... <FontAwesomeIcon icon={faExternalLinkAlt} onClick={this.onCloseModal} color='gray' size='xs'/></p>
                <div class="card-action ">
                  <p className="black-text">Posted by {this.props.project.authorFirstName} {this.props.project.authorLastName}</p>
                  <p className="grey-text">{moment(this.props.project.createdAt.toDate()).calendar()}</p>
                </div>
              </div>
            </div>
          </div>
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
