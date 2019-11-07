import { searchUsers } from '../../actions/user_actions';
import { connect } from 'react-redux';
import Search from './search';

const mapStateToProps = state => { 
    return {
        users: state.entities.userSearch
    };
};

const mapDispatchToProps = dispatch => ({
    searchUsers: username => dispatch(searchUsers(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search); 
