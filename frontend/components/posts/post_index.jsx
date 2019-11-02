import React from 'react';
import PostIndexItem from './post_index_item';
import NavBarContainer from '../nav_bar/nav_bar_container';
import { Link } from 'react-router-dom';


class PostIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, selected: null };
        this.renderPosts = this.renderPosts.bind(this);
        this.renderPopUp = this.renderPopUp.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllPosts()
            .then(() => this.setState({ loading: false }));
    }

    // componentDidUpdate() {
    //     this.props.fetchAllPosts()
    //         .then(() => this.setState({ loading: false }));
    // }

    renderPopUp() {
        let { currentUser } = this.props;
        let deleteBtn = currentUser.postIds.includes(this.state.selected) ? (
            <div onClick={this.handleDelete}>
                <p>Delete Post</p>
            </div>
        ) : <div></div>;

        return (
            this.state.selected === null ? <div></div> : (
                <div>
                    <div className="popup-frame">
                        {deleteBtn}
                        <div onClick={() => this.changeSelected(null)}>
                            <Link to={`/posts/${this.state.selected}`}>
                                Go to Post
                            </Link>
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

    handleDelete() {
        let { removePost, posts } = this.props;
        let post = posts[this.state.selected];
        debugger
        removePost(post).then(this.changeSelected(null));
    }

    changeSelected(id) {
        this.setState({ selected: id });
    }

    renderPosts() {
        const posts = Object.values(this.props.posts);

        if (posts.length === 0) {
            return (
                <div className="grid-content no-posts-div">
                    {/* <img src={`${asset_url}('path/to/no_posts.png')`} /> */}
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
                            changeSelected={this.changeSelected}
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
        } else {
            return (
                <div>
                    <NavBarContainer />
                    <section className="feed-posts-section">
                        {this.renderPosts()}
                    </section>
                    {this.renderPopUp()}
                </div>    
            );
        }
    }
}

export default PostIndex;