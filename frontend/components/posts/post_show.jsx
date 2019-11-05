import React from 'react';
import { Link } from 'react-router-dom';
import CommentIndexContainer from '../comments/comment_index_container';
import CreateCommentFormContainer from '../comments/create_comment_form_container';
import LikeBar from '../likes_bar/like_bar_container'
import NavBarContainer from '../nav_bar/nav_bar_container';
import { formatCreatedAt, reformatCreatedAt } from "../../util/date_util";
import EditPostForm from '../post_form/edit_post_form';


class PostShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, selected: null, editing: false, expand: false };

        this.goToPreviousURL = this.goToPreviousURL.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderPopUp = this.renderPopUp.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
        this.changeEditing = this.changeEditing.bind(this);
        this.renderEditForm = this.renderEditForm.bind(this);
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

    renderPopUp() {
        let { currentUserId, user } = this.props;
        let popUpWindow = currentUserId === user.id ? (
            <div>
                <div className="popup-frame">
                    <div onClick={this.handleDelete}>
                        <p>Delete Post</p>
                    </div>
                    <div onClick={() => {this.changeSelected(null); this.changeEditing(true);}}>
                        <p>Edit Post</p>
                    </div>
                    <div id="popup-cancel" onClick={() => this.changeSelected(null)}>
                        <p>Cancel</p>
                    </div>
                </div>

                <div className="screen"
                    onClick={() => this.changeSelected(null)}>
                </div>
            </div>
        ) : <></>;

        return (
            this.state.selected === null ? <></> : popUpWindow
        );
    }

    renderEditForm() {
        return this.state.editing === false ? (<></>) : (
            <EditPostForm
                post={this.props.post}
                history={this.props.history}
                action={this.props.updatePost}
                closeForm={this.changeEditing} 
            />
        );
    }

    changeSelected(id) {
        this.setState({
            selected: id
        });
    }

    changeEditing(bool) {
        this.setState({
            editing: bool
        });
    }

    // handleDelete() {
    //     this.props.removePost(this.props.post);
    //     this.closeForm();
    // }

    handleDelete() {
        let { removePost } = this.props;
        let post = this.props.post;
        removePost(post).then(() => { 
            this.changeSelected(null); this.goToPreviousURL();
        });
    }

    changeSelected(id) {
        this.setState({ selected: id });
    }

    goToPreviousURL() {
        this.props.history.goBack();
        // this.props.history.push(this.props.url);
    }

    render() {
        let { user, post } = this.props;
        // let captionDiv;

        // if (!post.caption) {
        //     captionDiv = <div className="post-caption"></div>
        // } else if (post.caption.length < 106 || this.state.expand === true) { // i literally counted the number, lol
        //     captionDiv = <div className="post-caption">
        //         <p>
        //             {post.caption}
        //         </p>
        //     </div>
        // } else {
        //     captionDiv = <div className="post-caption">
        //         <p>
        //             {post.caption.slice(0, 107) + "..."}
        //             <strong
        //                 className="caption-more"
        //                 onClick={() => this.setState({ expand: true })}>
        //                 more
        //             </strong>
        //         </p>
        //     </div>
        // }

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
                    <div className="post-show-main">
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
                                        <img src="/images/ellipsis.png" alt="edit post" id="ellipsis-img"
                                            onClick={() => {this.changeSelected(this.props.post.id)}}
                                        />
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
                                                    {/* {captionDiv} */}
                                                    <p>{post.caption}</p>                                              
                                                </div>
                                                <p className="post-create-date">{formatCreatedAt(post.created_at).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    
                                        <div className="post-comments">
                                            <CommentIndexContainer post={post} />
                                        </div>
                                    </div>

                                    <LikeBar postId={this.props.post.id} />
                                    {/* <p className="post-create-date-detailed">{reformatDate(formatCreatedAt(this.props.post.updated_at)).toUpperCase()}</p> */}
                                    <p className="created-date-detailed">{reformatCreatedAt(this.props.post.updated_at).toUpperCase()}</p>
                                    <CreateCommentFormContainer postId={this.props.post.id} currentUserId={this.props.currentUserId} />
                                </div>   
                                {this.renderPopUp()}
                                {this.renderEditForm()}                         
                            </div> 
                        </div>
                        <footer className="about-links">
                            <a href="https://anoushsaroyan.com">ABOUT ME</a>
                            <a href="https://github.com/AnoushSaroyan">GITHUB</a>
                            <a href="https://www.linkedin.com/in/anoushsaroyan/">LINKEDIN</a>
                        </footer> 
                    </div>
                );
            } 
        }
    }
}

export default PostShow;
