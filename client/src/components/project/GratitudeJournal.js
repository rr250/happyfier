import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/actions/projectActions'
import {Redirect} from 'react-router-dom'
import moment from 'moment'

export class GratitudeJournal extends Component {
    state={
      title:'Gratitude Journal',
      content:'',
      anon: false,
      diary: true,
      streak:0,
      diff:0,
      currentDate:new Date()
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
    console.log(errors)
     return(<p>{errors}</p>)
  };

  handleChange=(e)=>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }  
  handleSubmit=(profile,e)=>{
    e.preventDefault();
    if(this.isFormValid()) {
      this.setState({ errors: [], loading: true });
        console.log(this.state)
        this.props.createProject(this.state)
        console.log(moment(new Date()).from(moment(this.state.currentDate)))
        //this.props.updateStreak(this.state)
        this.props.history.push('/')
    }
  }  
  
  render() {
    const { auth,profile }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
    return (
      <div className="container">
        <div>
            <h1>{profile.streak} Streak</h1>
        </div>
        <form onSubmit={(e) => this.handleSubmit(profile, e)} className="white">
            <h5 className="grey-text text-darken-3">What are you grateful about?</h5>
            <div className="input-field">
              <label htmlFor="content">Project Content</label>
              <textarea type="text" id="content" className="materialize-textarea" onChange={this.handleChange}/>  
            </div>
            <div className="input-field">
              <button className="btn yellow lighten-1 z-depth-2 blue-text text-darken-2">Create</button>  
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
  console.log(state);
  return{
      auth: state.firebase.auth,
      users: state.firestore.data.users,
      profile: state.firebase.profile
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    createProject:(project)=>dispatch(createProject(project))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GratitudeJournal)
