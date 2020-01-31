import React, { Component } from 'react'
import Modal from 'react-responsive-modal';

export class CreateProjectModal extends Component {
  constructor(props) {
    super(props);
  }
    state={
      title:'',
      content:'',
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
    console.log(errors)
     return(<p>{errors}</p>)
  };

  handleChange=(e)=>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }  
  handleSubmit=(e)=>{
    e.preventDefault();
    if(this.isFormValid()) {
      this.setState({ errors: [], loading: true });
    console.log(this.state)
    this.props.createProject(this.state)
    this.setState({ open: false });
    }
  }  

  handleCheckAnon=(e)=>{
    console.log(this.state.anon)
    this.setState({
      anon: !(this.state.anon)
    });
    console.log(this.state.anon)
  } 

  handleCheckDiary=(e)=>{
    this.setState({
      diary: !(this.state.diary)
    });
  } 

  render() {
    const { handleSubmit }=this.props;
    console.log(this);
    return (
      <div>
        <a onClick={this.onOpenModal}>Open Modal</a>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div className="container">
            <form onSubmit={handleSubmit} className="white">
              <h5 className="grey-text text-darken-3">Create new post</h5>
              <div className="input-field">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" onChange={this.handleChange}/>  
              </div>
              <div className="input-field">
                <label htmlFor="content">Project Content</label>
                <textarea type="text" id="content" className="materialize-textarea" onChange={this.handleChange}/>  
              </div>
              <div className="input-field">
                <label>
                  <input type="checkbox" onChange={this.handleCheckAnon}/>
                  <span>Post as Anonymous</span>
                </label>
                <br/>
              </div>
              <div className="input-field">
                <label>
                  <input type="checkbox" onChange={this.handleCheckDiary}/>
                  <span>Post on Personal Diary</span>
                </label>
                <br/>
              </div>
              <div className="input-field">
                <button className="btn yellow lighten-1 z-depth-2 blue-text text-darken-2" onClick={(e) => {this.handleSubmit(e)}}>Create</button>  
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