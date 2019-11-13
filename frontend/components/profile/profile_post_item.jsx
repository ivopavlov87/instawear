import React from 'react';
import { withRouter } from 'react-router-dom';
import Shimmer from "react-shimmer-effect";

class ProfilePostItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push(`/posts/${this.props.post.id}`);
    }

    stopMouseOver(e) {
        e.stopPropagation();
    }

    handleOnMouseEnter(e) {
        let likes = e.currentTarget.lastElementChild;
        likes.classList.remove("hide");
    }

    handleOnMouseLeave(e) {
        let likes = e.currentTarget.lastElementChild;
        likes.classList.add("hide");
    }

    render() {
        if(this.props.post === undefined) {
            return <div></div>
        }
        return (
            <div className="profile-post-item" 
                onClick={this.handleOnClick} 
                onMouseEnter={this.handleOnMouseEnter} 
                onMouseLeave={this.handleOnMouseLeave}
                >
                <img src={this.props.post.photoUrl} />
                {/* <div className="post-img-profile">
                    <img src={this.props.post.photoUrl}
                        onLoad={(e) => {
                            let loader = e.target.parentElement.children[1];
                            loader.classList.add("hide");
                        }}
                    />
                    <div className="shimmer-container-profile">
                        <Shimmer>
                            <div className="rect-profile"></div>
                        </Shimmer>
                    </div>
                </div> */}
                <div className="post-likes hide">
                    {/* <LikeBar postId={this.props.post.id} /> */}
                    <div className="icons">
                        <div className="profile-like-icon">
                            <img src="/images/profile-like.png" />
                            <p>{this.props.post.like_ids.length}</p>
                        </div>
                        <div className="profile-comment-icon">
                            <img src="/images/profile-comment.png" />
                            <p>{this.props.post.comment_ids.length}</p>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

export default withRouter(ProfilePostItem);