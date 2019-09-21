import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import LikeBar from '../likes_bar/like_bar_container';

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push(`/posts/${this.props.post.id}`);
    }


    handleOnMouseEnter(e) {
        // let num_likes = document.getElementsByClassName("num-likes");
        // num_likes.classList.add("hide");
        // debugger
        // if (num_likes_blank) num_likes_blank.classList.add("hide");

        // let num_likes_filled = document.querySelector("num-likes");
        // if (num_likes_filled) num_likes_filled.classList.add("hide");
        // debugger

        let likes = e.currentTarget.lastElementChild;
        likes.classList.remove("hide");
        likes.children[1].children[0].children[1].classList.add("hide");
        // let overlay = document.querySelector("post-overlay");
        // overlay.classList.remove("hide");
    }

    handleOnMouseLeave(e) {
        let likes = e.currentTarget.lastElementChild;
        likes.classList.add("hide");
        // let overlay = document.querySelector("post-overlay");
        // overlay.classList.add("hide");
    }

    stopMouseOver(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div className="profile-post-item" onClick={this.handleOnClick} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
                <div className="img-wrapper">
                    <img src={this.props.post.photoUrl} />
                </div>

                <div className="post-likes hide">
                    <Link onClick={this.stopMouseOver} to={`/profile/${this.props.user.id}`}>
                        <h3>{this.props.user.username}</h3>
                    </Link>    
                    {/* <div id="post-overlay" className="post-item-overlay"></div> */}
                    {/* <img src="/images/like-white.png"/> */}
                    {/* <img src="/images/like-pink.png"/> */}
                    <div className="icons">
                        <LikeBar postId={this.props.post.id} />
                        <img src="/images/comment-white.png" />
                    </div>
                </div>
            </div>

        );
    }
}

// export default withRouter(ProfilePostItem);
export default withRouter(PostIndexItem);