import React from 'react';
import { Link } from 'react-router-dom';
import CommentIndexContainer from '../comments/comment_index_container';
import CreateCommentFormContainer from '../comments/create_comment_form_container';
import LikeBar from '../likes_bar/like_bar_container'
import NavBarContainer from '../nav_bar/nav_bar_container';
import { formatCreatedAt, reformatCreatedAt } from "../../util/date_util";
import EditPostForm from '../post_form/edit_post_form';
import FollowBarContainer from '../follow-bar/follow_bar_container';


class PostShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, selected: null, deleting:false, editing: false, expand: false };

        this.goToPreviousURL = this.goToPreviousURL.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderPopUp = this.renderPopUp.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
        this.changeEditing = this.changeEditing.bind(this);
        this.renderEditForm = this.renderEditForm.bind(this);
        this.askDeleteQuestion = this.askDeleteQuestion.bind(this);
        this.changeDeleting = this.changeDeleting.bind(this);
    }

    componentDidMount() {
        // debugger
        this.props.fetchPost(this.props.match.params.id)
            .then(() => this.setState({ loading: false }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.post === undefined) {
            // debugger
            this.props.fetchPost(this.props.match.params.id)
                .then(() => this.setState({ loading: false }));
        }
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchPost(this.props.match.params.id);
        }
    }

    // componentDidMount() {
        // if (this.props.post === undefined) { 
            // this.props.fetchPost(this.props.match.params.id)
            //     .then(() => this.setState({ loading: false }));
        // }
    // }

    // componentDidUpdate(prevProps) {
        // if (this.props.post === undefined) {
        //     this.props.fetchPost(this.props.match.params.id)
        //         .then(() => this.setState({ loading: false }));
        // }
    //     if (prevProps.match.params.id !== this.props.match.params.id) {
    //         this.props.fetchPost(this.props.match.params.id)
    //             .then(() => this.setState({ loading: false }));
    //     } 
    // }

    renderPopUp() {
        let { currentUserId, user } = this.props;
        let popUpWindow = currentUserId === user.id ? (
            <div>
                <div className="popup-frame">
                    <div onClick={() => { this.changeSelected(null); this.changeDeleting(true); }}>
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
            this.changeDeleting(false); this.goToPreviousURL();
        });
    }

    askDeleteQuestion() {
        return this.state.deleting === false ? <></> : (
            <div>
                <div className="delete-q-main">
                    <div className="delete-question">
                        Delete Post?
                    </div>
                    <div className="delete-q-answers">
                        <div className="delete-cancel" onClick={() => this.changeDeleting(false)}>
                            Cancel
                        </div>
                        <div className="vertical-devider delete-devider"></div>
                        <div className="delete-confirm" onClick={this.handleDelete}>
                            Delete
                        </div>
                    </div>
                </div>
                <div className="screen"
                    onClick={() => this.changeDeleting(false)}>
                </div>
            </div>
        );
    }

    changeDeleting(bool) {
        this.setState({ deleting: bool });
    }

    changeSelected(id) {
        this.setState({ selected: id });
    }

    goToPreviousURL() {
        this.props.history.goBack();
        // this.props.history.push(this.props.url);
    }

    render() {
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
                // debugger
                return (
                    <div>Page is not available</div>
                );
            } else {
                let { user, post, currentUserId } = this.props;
                let followBtn = currentUserId !== user.id ? (
                    <div className="post-show-follow-bar-div"> 
                        <div className="dot-separator"></div>
                        <FollowBarContainer user={user} />
                    </div>
                ) : <></>;
                let actionBtn = currentUserId === user.id ? (
                    <img className="post-show-header-img" src="/images/ellipsis.png" alt="edit post" id="ellipsis-img"
                        onClick={() => { this.changeSelected(this.props.post.id) }}
                    />
                ) : (
                    <img src="/images/return.png" alt="go back" className="post-show-goback"
                        onClick={this.goToPreviousURL}
                    />
                );
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
                                                <img className="post-show-header-img" src={user.profilePhoto} alt={user.username} />
                                            </Link>
                                            <div>
                                                <div className="post-show-follow-bar">
                                                    <Link to={`/user/${user.id}`}>
                                                        <strong>{user.username}</strong>
                                                    </Link>
                                                    {followBtn}
                                                </div>
                                                <p className ="post-author-info-p">{post.location}</p>
                                            </div>
                                        </div>
                                        {/* <img className="post-show-header-img" src="/images/ellipsis.png" alt="edit post" id="ellipsis-img"
                                            onClick={() => {this.changeSelected(this.props.post.id)}}
                                        /> */}
                                        {actionBtn}
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
                                            <CommentIndexContainer post={this.props.post} />
                                        </div>
                                    </div>

                                    <LikeBar postId={this.props.post.id} />
                                    {/* <p className="post-create-date-detailed">{reformatDate(formatCreatedAt(this.props.post.updated_at)).toUpperCase()}</p> */}
                                    <p className="created-date-detailed">{reformatCreatedAt(this.props.post.updated_at).toUpperCase()}</p>
                                    <CreateCommentFormContainer postId={this.props.post.id} currentUserId={this.props.currentUserId} />
                                </div>   
                                {this.renderPopUp()}
                                {this.renderEditForm()}  
                                {this.askDeleteQuestion()}                       
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
