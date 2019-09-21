import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';

class CommentIndex extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { comments, deleteComment } = this.props;
        return (
            <div className="comments-container">
                <div className="comments-info">
                    <p>Comments</p>
                    <div className="dot-separator"></div>
                    <span>{comments.length}</span>
                </div>
                <div className="comments-wrap">
                    {
                        comments.map((comment, idx) =>
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