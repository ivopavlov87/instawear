import React from 'react';
import PostIndexItem from './post_index_item';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SharePostForm from '../post_form/share_post_form';
import { Link, withRouter } from 'react-router-dom';


class PostIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, selected: null, currentPostId: null, sharing: false, deleting: false };
        this.renderPosts = this.renderPosts.bind(this);
        this.renderPopUp = this.renderPopUp.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleHistoryPush = this.handleHistoryPush.bind(this);
        this.askDeleteQuestion = this.askDeleteQuestion.bind(this);
        this.changeDeleting = this.changeDeleting.bind(this);
        this.savePostId = this.savePostId.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllPosts()
            .then(() => this.setState({ loading: false }));
    }

    handleHistoryPush() {
        this.props.history.push(`/posts/${this.state.selected}`);
    }

    renderPopUp() {
        let { currentUser } = this.props;
        let deleteBtn = currentUser.postIds.includes(this.state.selected) ? (
            <div onClick={() => { this.savePostId(); this.changeSelected(null); this.changeDeleting(true); }}>
                <p>Delete Post</p>
            </div>
        ) : 
        null;

        return (
            this.state.selected === null ? <div></div> : (
                <div>
                    <div className="popup-frame" id="poppy">
                        {deleteBtn}
                        <div onClick={() => { this.changeSelected(null); this.handleHistoryPush() }}>
                            <p>Go to Post</p>
                        </div>
                        <div id="popup-cancel" onClick={() => this.changeSelected(null)}>
                            <p>Cancel</p>
                        </div>
                    </div>

                    <div className="screen"
                        onClick={() => this.changeSelected(null)}>
                    </div>
                </div>
            )
        );
    }

    savePostId() {
        this.setState({ currentPostId: this.state.selected });
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

    handleDelete(e) {
        let button = e.target;
        let parent = button.parentElement;
        let loading = document.createElement('div');
        loading.innerText = 'Deleting...';
        loading.classList.add('loader-delete-btn');
        parent.removeChild(button);
        parent.appendChild(loading); 

        let { removePost, posts } = this.props;
        let post = posts[this.state.currentPostId];
        removePost(post).then(() => this.changeDeleting(false));
    }

    changeSelected(id) {
        this.setState({ selected: id });
    }

    changeDeleting(bool) {
        this.setState({ deleting: bool });
    }

    renderPosts() {
        const posts = Object.values(this.props.posts);

        if (posts.length === 0) {
            return (
                <div className="grid-content no-posts-div">
                </div>
            );
        } else {
            const postItems = posts.map((post, idx) => {
                let user = this.props.users[post.user_id]
                return (
                    <figure className="item" key={`feed-figure-${idx}`}>
                        <PostIndexItem
                            key={idx}
                            post={post}
                            user={user}
                            userId={user.id}
                            changeSelected={this.changeSelected}
                            currentUser={this.props.currentUser}
                        />
                    </figure>
                )
            });

            return (
                <div className="posts">
                    {postItems}
                </div>
            );
        }
    }
    
    render() {
        if (this.state.loading === true) {
            return (
                <div className="loading">
                    <i className="fab fa-instagram" />
                </div>
            );
        } 
        else {
            return (
                <div>
                    <NavBarContainer />
                    <section className="feed-posts-section">
                        {this.renderPosts()}
                    </section>
                    {this.renderPopUp()}
                    {this.askDeleteQuestion()}
                </div>    
            );
        }
    }
}

export default withRouter(PostIndex);