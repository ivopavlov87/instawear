import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LikeBar from './like_bar';
import { selectPostLikes, selectPostLikers } from '../../reducers/selectors';

import { 
    createLike, 
    deleteLike 
} from '../../actions/like_actions';


const mapStateToProps = (state, ownProps) => ({
        likes: selectPostLikes(state, ownProps),
        likedByCurrentUser: selectPostLikers(state, ownProps).includes(state.session.id), 
        currentUserId: state.session.id,
});


const mapDistpatchToProps = dispatch => ({
    createLike: like => dispatch(createLike(like)),
    deleteLike: like => dispatch(deleteLike(like))
});

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(LikeBar));