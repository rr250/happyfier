import React, { Component } from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { createChat,postMessage } from '../../store/actions/chatActions';
import Message from './Message';
import {Redirect} from 'react-router-dom'
import M from 'materialize-css';  

class Chat extends Component{
    messagesEnd;
    talkInput;
    state = {
        otherUserId: '',
        otherUserName: '',
        messagesId: '',
        messages: [],
        showBot: false
    };

    show=(e)=> {
        e.preventDefault();
        this.setState({showBot: true});
    }

    hide=(e)=> {
        e.preventDefault();
        this.setState({showBot: false});
    }

    componentDidMount(){
        let dropdowns1 = document.querySelectorAll(".dropdown-trigger1");
        let options = {
        inDuration: 300,
        outDuration: 225,
        belowOrigin: true,
        constrainWidth: false,
        coverTrigger:false
        };
        M.Dropdown.init(dropdowns1, options);
    }

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

    renderMessages(messages) {
        if (messages ) {
            return messages.map((message, i) => {
                    return <Message key={i} message={message} userId={this.props.auth.uid} otherUserId={this.state.otherUserId}/>;
                }
            )
        } else {
            return null;
        }
    }

    selectUser=(e)=> {
        const otherUserId=e.target.id;
        const userId=this.props.auth.uid;
        const messagesId= otherUserId < userId ?`${otherUserId}${userId}` : `${userId}${otherUserId}`;
        console.log(messagesId,userId,otherUserId)
        this.setState({
            otherUserName: e.target.innerText,
            otherUserId: e.target.id,
            messagesId: messagesId
        })
        if(this.props.messages.find((message)=> {return (message.id===messagesId)})===undefined){
            this.props.createChat(messagesId)
            this.setState({
                messages:this.props.messages.find((message)=> {return (message.id===messagesId)}).messages
            })
            console.log(1,this.props,this.state)
        }
        else{
            this.setState({
                messages:this.props.messages.find((message)=> {return (message.id===messagesId)}).messages
            })
            console.log(2,this.props,this.state)
        }
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        if ( this.talkInput ) {
            this.talkInput.focus();
        }
    }

    submitMessage=(data)=>{
        this.props.postMessage(data)
        console.log(data)
    }

    submitChat=(e)=> {
        const messagesId=this.state.messagesId
        const data={
            content:e.target.value,
            messagesId:messagesId
        }
        
        if (e.key === 'Enter') {
            this.setState({ 
                messages: this.props.messages.find((message)=> {return (message.id===messagesId)}).messages
            });
            this.submitMessage(data)
            const messageDoc={
                userId : this.props.auth.uid,
                messageDate : new Date(),
                userFirstName : this.props.profile.firstName,
                userLastName : this.props.profile.lastName,
                content : data.content,
                userInitials: this.props.profile.firstName[0]+this.props.profile.lastName[0],
            };
            e.target.value = '';
            this.setState({
                messages:[...this.state.messages,messageDoc]
            })
        }
    }

    render() {
        const users=this.props.users
        console.log(this.props,this.state)
        if(!this.props.auth.uid)
            return<Redirect to='/signin'/> 
        if (this.state.showBot) {
            return (
                <div style={{ minHeight: 500, maxHeight: 470, width:400, position: 'fixed', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper purple accent-2">
                            <a className="brand-logo center">{this.state.otherUserName?this.state.otherUserName:'Chat'}</a>
                            <ul id="nav-mobile" className="hide-on-med-and-down">
                                <li className="right"><a onClick={this.hide}>Close</a></li>
                                <li className="left"><a className='dropdown-trigger1' data-hover="true" data-target="dropdown11">Chat</a>
                                    <div className="section" id='dropdown11' className='dropdown-content'>
                                        <div className="card z-depth-0">
                                            <div className="card-content">
                                                {users && users.map((user,i)=>{
                                                    if(i%2===0){
                                                        return(
                                                            <li>
                                                                <span className="purple-text text-accent-2" id={user.id} key={i} onClick={this.selectUser} id2={user.firstName+' '+user.lastName}>{user.firstName} {user.lastName}</span>
                                                            </li>
                                                        )
                                                    }
                                                    else{
                                                        return(
                                                            <li>
                                                                <span className="grey-text text-darken-2" id={user.id} key={i} onClick={this.selectUser} id2={user.firstName+' '+user.lastName}>{user.firstName} {user.lastName}</span>
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

                    <div id="chatbot"  style={{ minHeight: 350, maxHeight: 350, width:'100%', overflow: 'auto'}}>

                        {this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }}
                                style={{ float:"left", clear: "both" }}>
                        </div>
                    </div>

                    <div className=" col s12" >
                        <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} ref={(input) => { this.talkInput = input; }} placeholder="type a message:"  onKeyPress={this.submitChat} id="user_says" type="text" />
                    </div>

                </div>
            );
        } else {
            return (
                <div style={{ minHeight: 40, maxHeight: 500, width:400, position: 'fixed', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper purple accent-2">
                            <a className="brand-logo">Chat</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a onClick={this.show}>Show</a></li>
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
        postMessage:(data)=>dispatch(postMessage(data)),
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
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