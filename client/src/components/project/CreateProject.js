import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/actions/projectActions'
import {Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret, faBook } from '@fortawesome/free-solid-svg-icons'
import uuidv4 from 'uuid/v4';
import mimeType from 'mime-types';

export class CreateProject extends Component {
    state={
      title:'',
      content:'',
      file:'',
      metadata:'',
      filePath:'',
      anon: false,
      diary: false
    }

   isFormValid = () => {
     let error;
      if (this.isFormEmpty(this.state)) {
          error = 'Fill in all fields';
          this.setState({ errors: error.toString() });
          return false;
      } else {
          return true;
      }
  }

  isFormEmpty = ({ title, content }) => {
      return !title.length || !content.length;
  }  

  displayErrors = (errors) => {
     return(<p>{errors}</p>)
  };

  handleChange=(e)=>{
    if(e.target.id!=='file'){
      this.setState({
        [e.target.id]: e.target.value
      });
    }
    else{
      this.setState({
        [e.target.id]: e.target.files[0],
        metadata:{contentType:mimeType.lookup(e.target.files[0].name)},
        filePath:`postImages/${uuidv4()}.jpg`
      });
    }
  }  
  handleSubmit=(e)=>{
    e.preventDefault();
    if(this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      this.props.createProject(this.state)
      this.props.history.push('/')
    }
  }  

  handleCheckAnon=(e)=>{
    this.setState({
      anon: !(this.state.anon)
    });
  } 

  handleCheckDiary=(e)=>{
    this.setState({
      diary: !(this.state.diary)
    });
  } 
  
  render() {
    const { auth }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Create new post</h5>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" onChange={this.handleChange}/>  
            </div>
            <div className="input-field">
              <label htmlFor="content">Post Content</label>
              <textarea type="text" id="content" className="materialize-textarea" onChange={this.handleChange}/>  
            </div>
            <div className="file-field input-field">
              <div className="btn grey">
                <span>Choose a image</span>
                <input type="file" id="file" accept=".jpg,.jpeg,.png" onChange={this.handleChange} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <div className="input-field">
              <label>
                <input type="checkbox" onChange={this.handleCheckAnon}/>
                <span>Post as Anonymous <FontAwesomeIcon icon={faUserSecret} /></span>
              </label>
              <br/>
            </div>
            <div className="input-field">
              <label>
                <input type="checkbox" onChange={this.handleCheckDiary}/>
                <span>Post on Personal Diary <FontAwesomeIcon icon={faBook} /></span>
              </label>
              <br/>
            </div>
            <div className="input-field">
              <button className="btn purple accent-2 z-depth-2 z-depth-2">Create</button>  
            </div>
            <div className="red-text center">
              {this.errors!==[] && (
                <span style={{'whiteSpace': 'pre-wrap'}}>{this.displayErrors(this.state.errors)}</span>
              )}
            </div>
        </form>  
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return{
      auth: state.firebase.auth
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    createProject:(project)=>dispatch(createProject(project))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject)
