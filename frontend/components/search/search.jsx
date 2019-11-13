import React from 'react';
import SearchItem from './search_item';
// import {
//     Route,
//     Redirect,
//     Switch,
//     Link,
//     HashRouter
// } from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchedUsername: "", rendering: false };

        this.update = this.update.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.renderUsersList = this.renderUsersList.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.changeRendering = this.changeRendering.bind(this);
    }

    update(e) {
        e.stopPropagation(); 
        // change the icon to loading 
        // setTimeout and change the rendering to true
        let loading = document.getElementById("search-box").children[3];
        loading.src = "/images/loading.gif"; 
        this.setState({ searchedUsername: e.target.value }, () => {
            setTimeout(() => this.handleQuery(), 500)
        });
    }

    clearSearch(e) {
        e.stopPropagation(); 
        this.setState({ searchedUsername: "", rendering: false })
    }

    changeRendering(bool) {
        this.setState({ rendering: bool });
    }

    handleQuery() {
        let loading = document.getElementById("search-box").children[3];
        loading.src = "/images/cancel.png"; 

        let users = document.getElementsByClassName('search-users')[0];
        if (this.state.searchedUsername !== "") {
            this.props.searchUsers(this.state.searchedUsername)
                .then(() => { this.changeRendering(true) });
        } else if (users && this.state.rendering === true) {
            this.changeRendering(false);
        }
    } 

    renderUsersList() {
        let users = Object.values(this.props.users);
        // debugger
        return (
            this.state.rendering === false ? <></> : (
                this.state.searchedUsername === "" ? <div className="search-users empty-search-query"></div> : (
                    <div>
                        {/* <div className="triangle"></div> */}
                        <div className="search-users">
                            {users.map((user, idx) => {
                                return <SearchItem
                                    user={user}
                                    key={`search-user-${idx}`}
                                    changeRendering={this.changeRendering}
                                />
                            })}
                        </div>
                        <div className="screen search-screen"
                            onClick={() => this.changeRendering(false)}>
                        </div>
                    </div>
                )
            )
        );
    }


    render() {
        return (
            <div>
                <div className="search-container" id="search-box">
                    <i className="fas fa-search search-icon"></i>
                    <div className="vertical-devider search-vertical-devider"></div>
                    <input
                        // id="search-input"
                        type="text"
                        className="search-container-input"
                        placeholder="Search"
                        value={this.state.searchedUsername}
                        onChange={this.update}
                    />
                    <img src="/images/cancel.png" onClick={this.clearSearch} className="cancel-icon" />
                    {this.renderUsersList()}
                </div>
                {/* <div className="screen search-screen"
                    onClick={() => this.changeRendering(false)}>
                </div> */}
            </div>
        )
    }
    
}

export default Search;