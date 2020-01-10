import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createTest} from '../../store/actions/testActions'

export class Anxiety extends Component {
    state={
      score:'0',
      testName: 'anxiety',
      diagnosis:''
    }
  handleChange=(e)=>{
    this.setState({
       score: (parseInt)(this.state.score) + (parseInt)(e.target.value) 
      });
  }  
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.createTest(this.state)
    this.props.history.push('/')
  }  
  
  render() {
    const { auth }=this.props;
        if(!auth.uid)
            return<Redirect to='/signin'/>    
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
            
            

            <p>
              <h6>1. Feeling nervous, anxious or on edge?</h6>
              <label>
                <input value="0" name="1" type="radio" onChange={this.handleChange}/>
                <span>Several days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="1" name="1" type="radio" onChange={this.handleChange} />
                <span>Not at all</span>
              </label>
            </p>
            <p>
              <label>
                <input value="2" name="1" type="radio" onChange={this.handleChange} />
                <span>More than half the days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="3" name="1" type="radio" onChange={this.handleChange} />
                <span>Nearly everyday</span>
              </label>
            </p>
            <br></br>
            

            <p>
              <h6>2. Not being able to stop or control worrying?</h6>
              <label>
                <input value="0" name="2" type="radio" onChange={this.handleChange}/>
                <span>Several days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="1" name="2" type="radio" onChange={this.handleChange} />
                <span>Not at all</span>
              </label>
            </p>
            <p>
              <label>
                <input value="2" name="2" type="radio" onChange={this.handleChange} />
                <span>More than half the days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="3" name="2" type="radio" onChange={this.handleChange} />
                <span>Nearly everyday</span>
              </label>
            </p>
            <br></br>      
            <p>
              <h6>3. Worring too much about different things?</h6>
              <label>
                <input value="0" name="3" type="radio" onChange={this.handleChange}/>
                <span>Several days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="1" name="3" type="radio" onChange={this.handleChange} />
                <span>Not at all</span>
              </label>
            </p>
            <p>
              <label>
                <input value="2" name="3" type="radio" onChange={this.handleChange} />
                <span>More than half the days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="3" name="3" type="radio" onChange={this.handleChange} />
                <span>Nearly everyday</span>
              </label>
            </p>
            
            <br></br>

            <p>
              <h6>4. Trouble relaxing?</h6>
              <label>
                <input value="0" name="4" type="radio" onChange={this.handleChange}/>
                <span>Several days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="1" name="4" type="radio" onChange={this.handleChange} />
                <span>Not at all</span>
              </label>
            </p>
            <p>
              <label>
                <input value="2" name="4" type="radio" onChange={this.handleChange} />
                <span>More than half the days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="3" name="4" type="radio" onChange={this.handleChange} />
                <span>Nearly everyday</span>
              </label>
            </p>
          
            <br></br>

            <p>
              <h6>5. Being so restless that it is hard to sit still?</h6>
              <label>
                <input value="0" name="5" type="radio" onChange={this.handleChange}/>
                <span>Several days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="1" name="5" type="radio" onChange={this.handleChange} />
                <span>Not at all</span>
              </label>
            </p>
            <p>
              <label>
                <input value="2" name="5" type="radio" onChange={this.handleChange} />
                <span>More than half the days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="3" name="5" type="radio" onChange={this.handleChange} />
                <span>Nearly everyday</span>
              </label>
            </p>
           
            <br></br>

            <p>
              <h6>6. Becoming easily annoyed or irritable?</h6>
              <label>
                <input value="0" name="6" type="radio" onChange={this.handleChange}/>
                <span>Several days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="1" name="6" type="radio" onChange={this.handleChange} />
                <span>Not at all</span>
              </label>
            </p>
            <p>
              <label>
                <input value="2" name="6" type="radio" onChange={this.handleChange} />
                <span>More than half the days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="3" name="6" type="radio" onChange={this.handleChange} />
                <span>Nearly everyday</span>
              </label>
            </p>
           
            <br></br>


            <p>
              <h6>7. Feeling afraid, as if something awful might happen?</h6>
              <label>
                <input value="0" name="7" type="radio" onChange={this.handleChange}/>
                <span>Several days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="1" name="7" type="radio" onChange={this.handleChange} />
                <span>Not at all</span>
              </label>
            </p>
            <p>
              <label>
                <input value="2" name="7" type="radio" onChange={this.handleChange} />
                <span>More than half the days</span>
              </label>
            </p>
            <p>
              <label>
                <input value="3" name="7" type="radio" onChange={this.handleChange} />
                <span>Nearly everyday</span>
              </label>
            </p>
            
            


            <p className="input-field">
              <button className="btn yellow lighten-1 z-depth-2 blue-text text-darken-2">Submit</button>  
            </p>

        </form>  
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  console.log(state);
  return{
      auth: state.firebase.auth

  }
}

const mapDispatchToProps=(dispatch)=>{
  return{    
    createTest:(test)=>dispatch(createTest(test))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Anxiety)
