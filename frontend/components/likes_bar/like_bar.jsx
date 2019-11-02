import React from 'react';

class LikeBar extends React.Component {
    constructor(props) {
        super(props);

        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.pushToPostShow = this.pushToPostShow.bind(this);
    }

    unlike(e) {
        e.stopPropagation();
        let likes = this.props.likes;
        let like = likes.filter(like => like.user_id === this.props.currentUserId);
        if (like) this.props.deleteLike(like[0]);
    }

    like(e) {
        e.stopPropagation();
        const postId = this.props.postId;
        this.props.createLike({ post_id: postId});
    }

    pushToPostShow() {
        if (this.props.history.location.pathname === '/feed') {
            this.props.history.push(`/posts/${this.props.postId}`);
        } else {
            document.getElementsByTagName('textarea')[0].focus();
        }
    }

    render() {
        let likes_num = "";
        if (this.props.likes.length === 1) {
            likes_num = "1 like";
        } else if (this.props.likes.length > 0) {
            likes_num = this.props.likes.length + " " + "likes";
        } else {
            likes_num = <span className="like-sgs">Be the first to <strong className="like-sgs-strong">like this</strong></span>
        }

        if (this.props.likedByCurrentUser) {
            return (
                <div className="like-icon">
                    <img src="/images/red-like.png"
                        onClick={this.unlike}/>
                    <img src="/images/feed-comment.png" alt="leave a comment" onClick={this.pushToPostShow} />
                    <p className="num-likes">{likes_num}</p>
                </div>
            );
        } else {
            return (
                <div className="like-icon">
                    <img src="/images/feed-like.png"
                        onClick={this.like} />
                    <img src="/images/feed-comment.png" alt="leave a comment" onClick={this.pushToPostShow} />
                    <p className="num-likes">{likes_num}</p>
                </div>
            );
        }
    }
} 

export default LikeBar;