import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/actions/projectActions'
import {updateStreak} from '../../store/actions/userActions'
import {Redirect} from 'react-router-dom'

export class GratitudeJournal extends Component {
    state={
      title:'Gratitude Journal',
      content:'',
      anon: false,
      diary: true,
      streak:0,
      diff:0,
      mode:1,
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
        this.props.createProject(this.state)
        const diff=Math.floor(Math.abs(new Date(profile.lastUpdated["seconds"]*1000).getTime()-this.state.currentDate.getTime())/(1000 * 3600 * 24))
        if(diff===1){
            this.setState({streak:profile.streak+1})
        }
        if(diff===0){
            this.setState({streak:profile.streak})
        }
        this.props.updateStreak(this.state)
        this.setState({
          content: ''
        });
    }
  }  
  
  render() {
    const { auth,profile }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
    return (
      <div className="container z-depth-2 pink lighten-5" style={{width:'87%', borderRadius:5}}>
        <form onSubmit={(e) => this.handleSubmit(profile, e)}>
          <h5 className="grey-text text-darken-3 text-bold">Gratitude Journal</h5>
            <div className="input-field">
              <label htmlFor="content">Hi {profile.firstName}, what are you grateful about?</label>
              <textarea type="text" id="content" className="materialize-textarea" onChange={this.handleChange} value={this.state.content}/>  
            </div>
            {this.state.content &&(
            <div className="input-field">
              <button className="btn pink lighten-2 z-depth-2">Create</button>  
            </div>
            )}
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
      auth: state.firebase.auth,
      users: state.firestore.data.users,
      profile: state.firebase.profile
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    createProject:(project)=>dispatch(createProject(project)),
    updateStreak:(data)=>dispatch(updateStreak(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GratitudeJournal)
