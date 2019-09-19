import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
// import configureStore from './store/store';
// import * as APIUtil from './util/session_api_util';


document.addEventListener('DOMContentLoaded', () => {
    // let store;
    // if (window.currentUser) {
    //     const preloadedState = {
    //         session: { id: window.currentUser.id },
    //         entities: {
    //             users: { [window.currentUser.id]: window.currentUser }
    //         }
    //     };
    //     store = configureStore(preloadedState);
    //     window.getState = store.getState;
    //     delete window.currentUser;
    // } else {
    //     store = configureStore();
    // }
    // window.logout = APIUtil.logout;
    const root = document.getElementById('root');
    // ReactDOM.render(<Root store={store} />, root);
    ReactDOM.render(<Root />, root);
});