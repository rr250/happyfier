import React from 'react';
import moment from 'moment'

const Message = (props) => {
    return (

        <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.message.userId===props.otherUserId &&
                    <div className="col s2">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red">{props.message.userInitials}</a>
                    </div>
                    }
                    <div className="col s10">
                        <span className="grey-text text-darken-2">
                            <p> {props.message.content}</p>
                        </span>
                        <div className="grey-text note-date">
                            {props.message.messageDate["seconds"]!==undefined?moment(props.message.messageDate.toDate()).fromNow():moment(props.message.messageDate).fromNow()}
                        </div>
                    </div>
                    {props.message.userId===props.userId &&
                    <div className="col s2">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red">{props.message.userInitials}</a>
                    </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Message;