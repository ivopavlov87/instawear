import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import LikeBar from '../likes_bar/like_bar_container';
import CommentIndexContainer from '../comments/comment_index_container';
import CreateCommentFormContainer from '../comments/create_comment_form_container';
import FollowBarContainer from '../follow-bar/follow_bar_container';
import Shimmer from "react-shimmer-effect";

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false
        }
    }

    render() {
        let { user, post, currentUser } = this.props;
        const { classes } = this.props;
        let captionDiv;
        let followBtn = currentUser.id !== user.id ? (
            <div className="post-show-follow-bar-div">
                <div className="dot-separator"></div>
                <FollowBarContainer user={user} />
            </div>
        ) : <></>

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
                            <img className="post-item-header-img" src={user.profilePhoto} />
                        </Link>
                        <div className="post-index-item-follow-bar">
                            {/* <Link to={`/user/${user.id}`}>
                                <p className="post-item-username">{user.username}</p>
                            </Link> */}
                            <div className="post-index-item-follow-bar-div">
                                <Link to={`/user/${user.id}`}>
                                    <p className="post-item-username">{user.username}</p>
                                </Link>
                                {followBtn}
                            </div>
                            <p className="post-item-location">{post.location}</p>
                        </div>
                    </div>
                    <img className="post-item-header-img" src="/images/ellipsis.png" alt="edit post" id="ellipsis-img"
                        onClick={() => this.props.changeSelected(post.id)}/>
                </div>
                <div className="post-img">
                    <img src={this.props.post.photoUrl}
                        onLoad={(e) => {
                            let loader = e.target.parentElement.children[1];
                            loader.classList.add("hide"); 
                        }}
                    />
                    <div className="shimmer-container">
                        <Shimmer>
                            <div className="rect"></div>
                        </Shimmer>
                    </div>
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

export default withRouter(PostIndexItem);