import PostForm from './post_form';
import { updatePost } from '../../actions/post_actions';
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
    formType: "edit",
    formTitle: "Edit Photo",
    btnText: "Save",
});

const mapDispatchToProps = dispatch => ({
    action: post => dispatch(updatePost(post))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm)); 