import React from 'react';
import { Link } from 'react-router-dom';


class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // componentDidMount() {
    //     let { comment } = this.props;
    //     if (this.props.user === undefined) {
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
            return <></>; 
        } else {
            return (
                <div className="comment-index-item">
                    <div className ="comment-item-line">
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
        }
    }
}

export default CommentIndexItem;