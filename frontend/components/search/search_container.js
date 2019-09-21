import { searchUsers } from '../../actions/user_actions';
import { connect } from 'react-redux';
import Search from './search';

const mapStateToProps = state => ({
    searchResults: state.entities.users
});

const mapDispatchToProps = dispatch => ({
    searchUsers: username => dispatch(searchUsers(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search); 
