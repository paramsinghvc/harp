import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/app/App';
import LoginService from './modules/login/LoginService';

if (typeof require.ensure !== 'function') {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}

// const lazyLoadComponent = (path) => (nextState, callback) => {
//     require.ensure([], require => callback(null, require(path).default));
// };

if (process.env.NODE_ENV == 'development') {
    require('./modules/home/Home');
}

const routes = 
    (<Route component={App}>
            <Route path="/"
              getComponent={(nextState, cb) => {
                require.ensure([], require => {
                  cb(null, require('./modules/home/Home').default);
                });
              }}
            >
            </Route>
            <Route path="/login" getComponent={(nextState, cb) => {
                require.ensure([], require => {
                  cb(null, require('./modules/login/Login').default);
                });
              }}
            />
            <Route path="/callback_spotify" onEnter={(nextState, replace, callback) => {
                LoginService.parseRouteHash(nextState.location.hash);
            }} />
            {/*<Route
              path="/posts/:slug-:cuid"
              getComponent={(nextState, cb) => {
                require.ensure([], require => {
                  cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
                });
              }}
            />*/}
    </Route>
    );

export default routes;
