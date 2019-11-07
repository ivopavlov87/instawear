# Instawear
[Live Demo](https://instawear.herokuapp.com/)

## Technologies
- [ ] Ruby on Rails
- [ ] PostgreSQL
- [ ] Redux
- [ ] React 
- [ ] JavaScript
- [ ] AWS S3

## Overview
Instawear is a single-page application inspired by Instagram. In Instwear, users can share, comment, and like posts, as well as follow other users. It has been created for fashionistas to share their passion for fashion style.
![](/public/images/overview.png)

## Current Features
* User Authentication
* Post CRUD Feature
* Comments
* Likes
* Follows
* User Search
* Profile Edit
* AWS S3 Image Uploading

## Code Snippets
* Follows Functionality
    #utilized Rails associations to load the followers and followings of the current user 
        - app/models/follow.rb
            ```
            belongs_to :follower, 
            foreign_key: :follower_id, 
            class_name: :User

            belongs_to :following, 
            foreign_key: :following_id, 
            class_name: :User
            ```
        - app/models/user.rb
            ```
            has_many :all_following_relations,
            foreign_key: :follower_id,
            class_name: :Follow,
            dependent: :destroy

            has_many :following, 
            through: :all_following_relations, 
            source: :following  

            has_many :all_follower_relations,
            foreign_key: :following_id,
            class_name: :Follow,
            dependent: :destroy

            has_many :followers, 
            through: :all_follower_relations, 
            source: :follower 
            ```
* Search Component
    #employed setTimeout to render the user list with loading effect 
        - search.jsx
        ```
        import React from 'react';
        import SearchItem from './search_item';

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
                return (
                    this.state.rendering === false ? <></> : (
                        this.state.searchedUsername === "" ? <div className="search-users empty-search-query"></div> : (
                            <div>
                                <div className="triangle"></div>
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
                            <input
                                type="text"
                                className="search-container-input"
                                placeholder="Search"
                                value={this.state.searchedUsername}
                                onChange={this.update}
                            />
                            <img src="/images/cancel.png" onClick={this.clearSearch} className="cancel-icon" />
                            {this.renderUsersList()}
                        </div>
                    </div>
                );
            } 
        }

        export default Search;
        ```

## Future Features 
* Saved Posts
* Post Sharing 
* Hashtags





