import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

// import SearchItem from './search_item';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchString: ""};

        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({ searchString: e.target.value });
    }


    render() {
        return (
            <div className="search-container">
                <input
                    id="search-input"
                    type="search"
                    className="search--container-input"
                    placeholder="Search"
                    onChange={this.update}
                />
                <div className="search-icon">
                    <i></i>
                </div>
            </div>
        )
    }
    
}

export default Search;