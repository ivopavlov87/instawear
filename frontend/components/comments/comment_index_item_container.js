import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/user_actions';


const mapStateToProps = (state, ownProps) => { 
    return {
        user: (ownProps.comment === undefined) ? undefined : state.entities.users[ownProps.comment.user_id],
        currentUserId: state.session.id,
    }
};

const mapDistpatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id))
});

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(CommentIndexItem));