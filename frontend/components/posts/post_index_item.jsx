import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import LikeBar from '../likes_bar/like_bar_container';
import CommentIndexContainer from '../comments/comment_index_container';
import CreateCommentFormContainer from '../comments/create_comment_form_container';

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false
        }
    }

    render() {
        let { user, post } = this.props;
        let captionDiv;

        if (!post.caption) {
            captionDiv = <div className="post-caption"></div>
        } else if (post.caption.length < 106 || this.state.expand === true) { // i literally counted the number, lol
            captionDiv = <div className="post-caption">
                <p><strong>{user.username} </strong>
                    {post.caption}
                </p>
            </div>
        } else {
            captionDiv = <div className="post-caption">
                <p><strong>{user.username} </strong>
                    {post.caption.slice(0, 107) + "..."}
                    <strong 
                        className="caption-more" 
                        onClick={() => this.setState({expand: true})}>
                        more
                    </strong>
                </p>
            </div>
        }

        return (
            <div className = "post-item-container">
                <div className="post-item-header">
                    <div className="post-item-info">
                        <Link to={`/user/${user.id}`}>
                            <img src={user.profilePhoto} />
                        </Link>
                        <div>
                            <Link to={`/user/${user.id}`}>
                                <p className="post-item-username">{user.username}</p>
                            </Link>
                            <p className="post-item-location">{post.location}</p>
                        </div>
                    </div>
                    <img src="/images/ellipsis.png" alt="edit post" id="ellipsis-img"/>
                </div>
                <div className="post-img">
                    <img src={this.props.post.photoUrl} />
                </div>
                <div className="post-item-footer">
                    <LikeBar postId={post.id} />
                    {captionDiv}
                    <CommentIndexContainer post={post} />
                    <CreateCommentFormContainer postId={this.props.post.id} currentUserId={this.props.currentUserId} />
                </div>
            </div>
            
            
            

        );
    }
}

// export default withRouter(ProfilePostItem);
export default withRouter(PostIndexItem);