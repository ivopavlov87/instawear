import { connect } from 'react-redux';
import CommentIndex from './comment_index';
import { deleteComment } from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom';
import { selectPostComments } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => { 
    let comments = ownProps.post.comment_ids.map(
        id => state.entities.comments[id]);
    return {
    comments,
};
}
const mapDistpatchToProps = dispatch => ({
    deleteComment: id => dispatch(deleteComment(id))
});

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(CommentIndex));