import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faUserSecret, faBook, faExternalLinkAlt, faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import uuidv4 from 'uuid/v4';
import mimeType from 'mime-types';

export class CreateProjectModal extends Component {
    state={
      title:'',
      content:'',
      file:'',
      metadata:'',
      filePath:'',
      anon: false,
      diary: false,
      open: false,
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };
   
    onCloseModal = () => {
      this.setState({ open: false });
    };

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
    this.setState({ open: false });
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
    const { handleSubmit }=this.props;
    const bg = {
      modal: {
        width:'400%',
        padding:0
      }
    };
    return (
      <div>
        <a ><FontAwesomeIcon icon={faPencilAlt} onClick={this.onOpenModal}/></a>
        <Modal open={this.state.open} onClose={this.onCloseModal} center styles={bg}>
          <div style={{position: 'absolute', left: '100%', marginLeft: '-50px'}}>
            <NavLink to='/create'><FontAwesomeIcon icon={faExternalLinkAlt} onClick={this.onCloseModal} color='gray'/></NavLink>
          </div>
          <div className="container">
            <form onSubmit={handleSubmit} className="white">
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
              <div className="btn transparent grey-text" style={{opacity:'transparent', boxShadow:'0 0', paddingLeft:0}}>
                <FontAwesomeIcon icon={faCameraRetro} size='2x' style={{top:'10px', position:'relative'}}/>
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
                <button className="btn pink lighten-2 z-depth-2 z-depth-2" onClick={(e) => {this.handleSubmit(e)}}>Create</button>  
              </div>
              <div className="red-text center">
                {this.errors!==[] && (
                  <span style={{'whiteSpace': 'pre-wrap'}}>{this.displayErrors(this.state.errors)}</span>
                )}
              </div>
            </form>  
          </div>
        </Modal>
      </div>
    )
  }
}

export default CreateProjectModal