import React from 'react';
import Search from "../search/search_container";
import ProfileDropdown from "../profile_dropdown/profile_dropdown";
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    render() {
        return <div>
            <button onClick={this.handleLogout}>
                Log out
            </button>
        </div>
    }

}
   
export default NavBar;