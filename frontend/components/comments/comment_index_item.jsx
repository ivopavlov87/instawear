import React from 'react';
import { Link } from 'react-router-dom';
import { formatCreatedAt } from "../../util/date_util";

class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        let { comment } = this.props;
        if (this.props.user === undefined) {
            this.props.fetchUser(comment.user_id);
        }
    }

    // componentDidUpdate(prevProps) {
    //     let { comment } = this.props;
    //     if (this.props.user === undefined) {
    //         this.props.fetchUser(comment.user_id);
    //     }
    //     if (prevProps.match.params.id !== this.props.match.params.id) {
    //         this.props.fetchUser(comment.user_id);
    //     }
    // }

    renderDelete() {
        const { user, currentUserId } = this.props;
        if (currentUserId === user.id) {
            return (
                <a className="comment-close" onClick={() => 
                this.props.deleteComment(this.props.comment)}></a>
            )
        }; 
    }

    render () {
        if (this.props.user === undefined) {
            return null; 
        } else {
            if (this.props.location.pathname === '/feed') {
                return (
                    <div className="comment-index-item">
                        <div className="comment-item-line">
                            <Link to={`/user/${this.props.user.id}`}>
                                <p><strong id='commenter-username'>
                                    {this.props.user.username}
                                </strong></p>
                            </Link>

                            <p>{this.props.comment.body}</p>
                            {this.renderDelete()}
                        </div>
                    </div>
                );
            } else {
                let { comment, user } = this.props;
                return (
                    <div className="post-show-caption">
                        <Link to={`/user/${user.id}`}>
                            <img src={user.profilePhoto} alt={user.username} />
                        </Link>
                        <div>
                            <div>
                                <Link to={`/user/${user.id}`}>
                                    <strong>{user.username}</strong>
                                </Link>
                                <p>{comment.body}</p>
                                {this.renderDelete()}
                            </div>
                            <p className="post-create-date">{formatCreatedAt(comment.created_at).toUpperCase()}</p>
                        </div>
                    </div>
                );
            }
        }        
    }
}

export default CommentIndexItem;