import React from 'react';
import { Link } from 'react-router-dom';
import CommentIndexContainer from '../comments/comment_index_container';
import CreateCommentFormContainer from '../comments/create_comment_form_container';
import LikeBar from '../likes_bar/like_bar_container'
import NavBarContainer from '../nav_bar/nav_bar_container';


class PostShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };

        this.closeForm = this.closeForm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.removePost = this.removePost.bind(this);
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
            .then(() => this.setState({ loading: false }));
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

        if (this.state.loading === true) {
            return (
                <div className="loading">
                    <i className="fab fa-instagram" />
                </div>
            );
        } else {
            if (this.props.post === undefined) {
                return (
                    <div>Page is not available</div>
                );
            } else {
                return (
                    <div>
                        <NavBarContainer />
                        {/* <div className="post-show-close post-show-grid">
                            <a className="close" onClick={this.closeForm}></a>
                        </div> */}
                        <div id="post-show-container" className="post-show-container">
                            <div className="post-show-content">
                                <div className="post-show-img">
                                    <img src={post.photoUrl} />
                                </div>

                            <div className="post-show-right">

                                <div className="post-show-header">
                                        <div className="post-author-info">
                                            <Link to={`/user/${user.id}`}>
                                                <img src={user.profilePhoto} alt={user.username} />
                                            </Link>
                                            <div>
                                                <Link to={`/user/${user.id}`}>
                                                    <strong>{user.username}</strong>
                                                </Link>
                                                <p>{post.location}</p>
                                            </div>
                                        </div>
                                        <img src="/images/ellipsis.png" alt="edit post"/>
                                </div>
                                    

                                    <div className="post-body">
                                        <div className="post-show-caption">
                                            <Link to={`/user/${user.id}`}>
                                                <img src={user.profilePhoto} alt={user.username} />
                                            </Link>
                                            <div>
                                                <div>
                                                    <Link to={`/user/${user.id}`}>
                                                        <strong>{user.username}</strong>
                                                    </Link>
                                                    <p>{post.caption}</p>
                                                </div>
                                                <p className="post-create-date">date created</p>
                                            </div>
                                        </div>
                                    
                                    <div className="post-comments">
                                            <CommentIndexContainer post={post} />
                                    </div>
                                    </div>

                                    <LikeBar postId={this.props.post.id} />
                                    <p className="post-create-date-detailed">date created</p>
                                    <CreateCommentFormContainer postId={this.props.post.id} currentUserId={this.props.currentUserId} />
                                </div>                            
                            </div>
                        </div> 
                        <footer>
                            <a href="">ABOUT ME</a>
                            <a href="">GITHUB</a>
                            <a href="">LINKEDIN</a>
                        </footer> 
                    </div>
                );
            } 
        }
    }
}

export default PostShow;
