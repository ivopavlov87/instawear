import { connect } from 'react-redux';
import { createComment } from '../../actions/comment_actions'; 
import CreateCommentForm from './create_comment_form';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
    createComment: comment => dispatch(createComment(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCommentForm);