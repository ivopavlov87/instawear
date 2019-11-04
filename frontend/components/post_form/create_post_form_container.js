import CreatePostForm from './create_post_form';
import { createPost } from '../../actions/post_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ session, entities: { users } }) => ({
    post: {
        caption: '',
        location: '',
        photo: null,
        preview: null
    },
    currentUser: users[session.id],
    formType: "create",
    formTitle: "New Post",
    btnText: "Upload",
});

const mapDispatchToProps = dispatch => ({
    action: post => dispatch(createPost(post))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePostForm)); 