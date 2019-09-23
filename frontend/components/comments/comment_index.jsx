import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';

class CommentIndex extends React.Component {

    constructor(props) {
        super(props)
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
                        slicedComments.map((comment, idx) =>
                            <CommentIndexItemContainer
                                key={idx}
                                comment={comment}
                                deleteComment={deleteComment} 
                            />)
                    }
                </div>
            </div>
        );
    }
}

export default CommentIndex;