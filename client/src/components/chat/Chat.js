import React, { Component } from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { createChat,postMessage } from '../../store/actions/chatActions';
import Message from './Message';
import {Redirect} from 'react-router-dom'
import M from 'materialize-css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMinimize, faWindowMaximize, faAddressBook, faCircle } from '@fortawesome/free-solid-svg-icons'

class Chat extends Component{
    messagesEnd;
    talkInput;
    state = {
        otherUserId: '',
        otherUserName: '',
        messagesId: '',
        messages: [],
        showBot: false,
        users:[]
    };

    componentDidUpdate() {
        let dropdowns1 = document.querySelectorAll(".dropdown-trigger1");
        let options = {
        inDuration: 300,
        outDuration: 225,
        belowOrigin: true,
        constrainWidth: false,
        coverTrigger:false
        };
        M.Dropdown.init(dropdowns1, options);
        if(this.props.auth.uid){
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
            if ( this.talkInput ) {
                this.talkInput.focus();
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.messagesId){
            this.setState({ 
                messages: nextProps.messages.find((message)=> {return (message.id===this.state.messagesId)}).messages
            });
        }
        this.setState({ 
            users: nextProps.users
        });
        console.log(nextProps)
    }

    toggleChat=(e)=>{
        e.preventDefault();
        this.setState({showBot: !this.state.showBot});
    }

    selectUser=(e)=> {
        e.preventDefault();
        const otherUserId=e.target.id;
        const userId=this.props.auth.uid;
        const messagesId= otherUserId < userId ?`${otherUserId}${userId}` : `${userId}${otherUserId}`;
        this.setState({
            otherUserName: e.target.innerText.split(' ')[0],
            otherUserId: e.target.id,
            messagesId: messagesId
        })
        if(this.props.messages.find((message)=> {return (message.id===messagesId)})===undefined){
            this.props.createChat(messagesId)
        }
        else{
            this.setState({
                messages:this.props.messages.find((message)=> {return (message.id===messagesId)}).messages
            })
        }
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        if ( this.talkInput ) {
            this.talkInput.focus();
        }
    }

    submitChat=(e)=> {
        const messagesId=this.state.messagesId
        const data={
            content:e.target.value,
            messagesId:messagesId
        }
        
        if (e.key === 'Enter' && data.content.length>0) {
            e.target.value = '';
            this.props.postMessage(data)
        }
    }

    render() {
        if(!this.props.auth.uid)
            return<Redirect to='/signin'/> 
        if (this.state.showBot) {
            return (
                <div className="conatiner" style={{ minHeight: '70%', maxHeight: '70%', width:'30%', position: 'fixed', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper purple accent-2">
                            <a className="brand-logo center" onClick={this.toggleChat}>{this.state.otherUserName?this.state.otherUserName:'Chat'}</a>
                            <ul id="nav-mobile">
                                <li className="right"><a onClick={this.toggleChat}><FontAwesomeIcon icon={faWindowMinimize}/></a></li>
                                <li className="left"><a className='dropdown-trigger1' data-hover="true" data-target="dropdown11"><FontAwesomeIcon icon={faAddressBook}/></a>
                                    <div className="section" id='dropdown11' className='dropdown-content'>
                                        <div className="card z-depth-0">
                                            <div className="card-content">
                                                {this.state.users && this.state.users.map((user,i)=>{
                                                    if(i%2===0){
                                                        return(
                                                            <li key={i} style={{width: '120%'}}>
                                                                <span className="purple-text text-accent-2" id={user.id} onClick={this.selectUser}>{user.firstName+" "+user.lastName} <FontAwesomeIcon icon={faCircle} color ={user.status?'green':'red'}/></span>
                                                            </li>
                                                        )
                                                    }
                                                    else{
                                                        return(
                                                            <li key={i} style={{width: '120%'}}>
                                                                <span className="grey-text text-darken-2" id={user.id} key={i} onClick={this.selectUser}>{user.firstName+" "+user.lastName} <FontAwesomeIcon icon={faCircle} color ={user.status?'green':'red'}/></span>
                                                            </li>
                                                        )
                                                    }
                                                })}                        
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div id="chat"  style={{ minHeight: 350, maxHeight: 350, width:'100%', overflow: 'auto'}}>

                        {this.state.messagesId!=='' ? this.state.messages && this.state.messages.map((message, i) => {
                            return <Message key={i} message={message} userId={this.props.auth.uid} otherUserId={this.state.otherUserId} diff={Math.floor(Math.abs(new Date(message.messageDate["seconds"]*1000).getTime()-(new Date()).getTime())/(1000 * 3600 * 24))}/>;
                        }):['1'].map((key)=>{
                            return <Message key={0} message={{content:"Select an User in Address Book to Chat with", userId:'xyz'}} userId={this.props.auth.uid} otherUserId={this.state.otherUserId} diff={0}/>;
                        })}
                        <div ref={(el) => { this.messagesEnd = el; }}
                                style={{ float:"left", clear: "both" }}>
                        </div>
                    </div>

                    <div className=" col s12" style={{position:'fixed', bottom: 0, zIndex:1}}>
                        <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} ref={(input) => { this.talkInput = input; }} placeholder="type a message:"  onKeyPress={this.submitChat} id="user_says" type="text" />
                    </div>

                </div>
            );
        } else {
            return (
                <div style={{ minHeight: '10%', maxHeight: '75%', width:'30%', position: 'fixed', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper purple accent-2">
                            <a className="brand-logo center" onClick={this.toggleChat}>Chat</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a onClick={this.toggleChat}><FontAwesomeIcon icon={faWindowMaximize}/></a></li>
                            </ul>
                        </div>
                    </nav>
                    <div ref={(el) => { this.messagesEnd = el; }}
                            style={{ float:"left", clear: "both" }}>
                    </div>
                </div>
            );
        }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        createChat:(data)=>dispatch(createChat(data)),
        postMessage:(data)=>dispatch(postMessage(data))
    }
}

const mapStateToProps=(state)=>{
    return{
        messages: state.firestore.ordered.messages,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'messages'},{collection: 'users'}])
)(Chat)