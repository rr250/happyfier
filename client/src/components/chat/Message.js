import React from 'react';
import moment from 'moment'

const Message = (props) => {
    return (
        <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel purple lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.message.userId===props.otherUserId &&
                    <div className="col s2">
                        <a href="/" className="btn btn-floating white purple-text text-accent-2 text-bold z-depth-2 waves-effect waves-light">{props.message.userInitials}</a>
                    </div>
                    }
                    <div className="col s10">
                        <span className="grey-text text-darken-2">
                            <p> {props.message.content}</p>
                        </span>
                        <div className="grey-text note-date">
                            {props.message.messageDate ? props.diff>0 ? moment(props.message.messageDate.toDate()).format('MMM Do YY, h:mm a'):moment(props.message.messageDate.toDate()).fromNow():null}
                        </div>
                    </div>
                    {props.message.userId===props.userId &&
                    <div className="col s2">
                        <a href="/" className="btn btn-floating white purple-text text-accent-2 text-bold z-depth-2 waves-effect waves-light">{props.message.userInitials}</a>
                    </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Message;