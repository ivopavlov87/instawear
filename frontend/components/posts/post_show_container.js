import { connect } from 'react-redux';
import { removePost, updatePost, fetchPost } from '../../actions/post_actions';
import { selectPost } from '../../reducers/selectors';
import PostShow from './post_show';

const mapStateToProps = (state, ownProps) => {
    let post = selectPost(state, ownProps);
    let user = post ? state.entities.users[post.user_id] : null; 
    return {
        currentUserId: state.session.id,
        post,
        user
    };
}

const mapDispatchToProps = dispatch => ({
    fetchPost: id => dispatch(fetchPost(id)),
    removePost: post => dispatch(removePost(post)), 
    updatePost: post => dispatch(updatePost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);