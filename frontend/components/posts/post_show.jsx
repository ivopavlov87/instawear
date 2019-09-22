import React from 'react';
import { Link } from 'react-router-dom';
import CommentIndexContainer from '../comments/comment_index_container';
import CreateCommentFormContainer from '../comments/create_comment_form_container';
import LikeBar from '../likes_bar/like_bar_container'

class PostShow extends React.Component {
    constructor(props) {
        super(props);

        this.closeForm = this.closeForm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.removePost = this.removePost.bind(this);
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchPost(this.props.match.params.id);
        } 
    }

    popUp() {
        // checks if the curretnUserid = user.id and renders the edit/delete forms
    }

    handleDelete() {
        this.props.removePost(this.props.post);
        this.closeForm();
    }

    removePost() {
        let { currentUserId, user } = this.props;
        if (currentUserId === user.id) {
            return (
                <div>
                    <p onClick={this.handleDelete}>
                        Delete Post
                    </p>
                </div>
            )
        } else {
            <div></div>
        }
    }

    closeForm() {
        this.props.history.goBack();
        // this.props.history.push(this.props.url);
    }

    render() {
        const user = this.props.user;
        const post = this.props.post;
        if (this.props.post === undefined) {
            return (
                <div>Page is not available</div>
            );
        } else {
            return (
                <div id="post-show-container" className="post-show-container">
                    <div className="post-show-close post-show-grid">
                        <a className="close" onClick={this.closeForm}></a>
                    </div>
                    <div className="post-show-content">
                        <header>
                            <div className="post-show-header">
                                <Link to={`/profile/${user.id}`}>
                                    <img src={user.profilePhoto} alt={user.username} />
                                </Link>
                                <Link to={`/profile/${user.id}`}>
                                    <p>{user.username}</p>
                                </Link>
                                <div className="post-dropdown">
                                    <i></i>
                                    {this.removePost()}
                                    {/* dropdown ul goes here */}

                                </div>
                            </div>

                            {/* {this.popUp()} */}
                        </header>

                        <div className="post-show-img">
                            <img src={post.photoUrl} />
                        </div>

                        <div className="post-show-actions">
                            {/* like bar goes here also pass the postId*/}
                            <LikeBar postId={this.props.post.id} />
                            {/* comment bar goes here */}
                        </div>

                        <div className="post-info">
                            <p><strong>{user.username}'S</strong>
                                <span>IMAGE</span>
                            </p>
                            <div className="dot-separator"></div>
                            <p className="post-create-date"> </p>
                        </div>

                        <div className="post-caption">{post.caption}</div>
                        <div className="post-location">{post.location}</div>

                        <CommentIndexContainer post={post} />
                        <CreateCommentFormContainer postId={this.props.post.id} currentUserId={this.props.currentUserId} />
                    </div>
                </div>
            );
        } 
    }
}

export default PostShow;
