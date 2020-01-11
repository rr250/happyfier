import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signUp} from '../../store/actions/authActions'

export class SignUp extends Component {
    state={
      errors: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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

  isFormEmpty = ({ firstName, lastName, email, password }) => {
      console.log(firstName.length)
      return !firstName.length || !lastName.length || !email.length || !password.length;
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

    console.log(this.state);
    this.props.signUp(this.state);
    }
  }  
  
  render() {
    const { auth, authError }=this.props;
    if(auth.uid)
            return<Redirect to='/'/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign Up</h5>
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={this.handleChange}/>  
            </div>
            <div className="input-field">
              <label htmlFor="lastnNme">Last Name</label>
              <input type="text" id="lastName" onChange={this.handleChange}/>  
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange}/>  
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={this.handleChange}/>  
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">SignUp</button>  
              <div className="red-text center">
                { authError ? <p>{ authError }</p> : null}
                {this.errors!==[] && (
                  <span style={{'whiteSpace': 'pre-wrap'}}>{this.displayErrors(this.state.errors)}</span>
                )}
              </div>
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
      authError: state.auth.authError
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      signUp: (newUser)=> dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);