import React from 'react';

class LikeBar extends React.Component {
    constructor(props) {
        super(props);

        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
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

    render() {
        if (this.props.likedByCurrentUser) {
            return (
                <div className="like-icon">
                    <img src="/images/like-pink.png"
                        onClick={this.unlike}/>
                    <p className="num-likes">{this.props.likes.length}</p>
                </div>
            );
        } else {
            return (
                <div className="like-icon">
                    <img src="/images/like-white-pink.png"
                        onClick={this.like} />
                    <p className="num-likes">{this.props.likes.length}</p>
                </div>
            );
        }
    }
} 

export default LikeBar;