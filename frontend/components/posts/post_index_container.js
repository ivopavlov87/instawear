import { fetchAllPosts, removePost, createPost } from "../../actions/post_actions";
import { connect } from "react-redux";
import PostIndex from "./post_index";
import { selectFolloweesPosts, selectFollowees } from "../../reducers/selectors";

const mapStateToProps = state => {
    // will select all the posts from the current user and the users that the current user follows in the future, that future is now here lolz
    // const posts = state.entities.posts;
    // const users = state.entities.users;
    const currentUser = state.entities.users[state.session.id];
    
    const followees = selectFollowees(state);
    const followeesPosts = selectFolloweesPosts(state, followees);

    return {
        users: followees,
        posts: followeesPosts,
        // users,
        // posts,
        currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    removePost: post => dispatch(removePost(post)),
    createPost: post => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);

