import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';
import { formatCreatedAt, reformatCreatedAt } from "../../util/date_util";

class CommentIndex extends React.Component {

    constructor(props) {
        super(props);
        this.renderLatestCommentDate = this.renderLatestCommentDate.bind(this);
    }

    renderLatestCommentDate() {
        if (this.props.match.path === "/feed" && this.props.comments.length >= 1) {
            let lastCommentDate =
                this.props.comments[this.props.comments.length - 1].created_at;
            let date = reformatCreatedAt(lastCommentDate).toUpperCase();
            return (
                <p className="created-date-detailed">{date}</p>
            );
        }
    }

    render() {
        let viewAllComments, slicedComments;
        let { history, post, match, comments, deleteComment } = this.props;

        if (comments.length > 2 && match.path === "/feed") {
            slicedComments = comments.slice(comments.length - 2);
            viewAllComments = (
                <p className="view-all-comments" onClick={() =>
                    history.push(`/posts/${post.id}`)}>
                    View all {comments.length} comments
                </p>
            );
        } else {
            slicedComments = comments;
        }

        return (
            <div className="comments-container">
                {viewAllComments}
                <div className="comments-wrap">
                    {
                        slicedComments.map((comment, idx) => {
                            return <CommentIndexItemContainer
                                key={idx}
                                comment={comment}
                                deleteComment={deleteComment}
                            />
                        }) 
                    }
                </div>
                {this.renderLatestCommentDate()}
            </div>
        );
    }
}

export default CommentIndex;