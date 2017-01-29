import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
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
    require('./modules/home/components/About');
    require('./modules/login/Login');
    require('./modules/categories/Categories');
    require('./modules/categories/components/CategoryPlaylists');
    require('./modules/categories/components/FeaturedPlaylists');
    require('./modules/playlist/Playlist');
    require('./modules/album/Album');
    require('./modules/new-releases/NewReleases');
    require('./modules/artist/Artist');
}

const routes = 
    (<Route component={App}>
            <Route path="/"
              getComponent={(nextState, cb) => {
                require.ensure([], require => {
                  cb(null, require('./modules/home/Home').default);
                });
              }}>
                <IndexRedirect to="categories" />
                <Route path="categories" getComponent={(nextState, cb) => {
                    require.ensure([], require => {
                      cb(null, require('./modules/categories/Categories').default);
                    });
                }} />
                <Route path="categories/:id" getComponent={(nextState, cb) => {
                    require.ensure([], require => {
                      cb(null, require('./modules/categories/components/CategoryPlaylists').default);
                    });
                }} />
                <Route path="featured-playlists" getComponent={(nextState, cb) => {
                    require.ensure([], require => {
                      cb(null, require('./modules/categories/components/FeaturedPlaylists').default);
                    });
                }} />
                <Route path="playlist/:userId/:playlistId" getComponent={(nextState, cb) => {
                    require.ensure([], require => {
                      cb(null, require('./modules/playlist/Playlist').default);
                    });
                }} />
                <Route path="album/:albumId" getComponent={(nextState, cb) => {
                    require.ensure([], require => {
                      cb(null, require('./modules/album/Album').default);
                    });
                }} />
                <Route path="artist/:artistId" getComponent={(nextState, cb) => {
                    require.ensure([], require => {
                      cb(null, require('./modules/artist/Artist').default);
                    });
                }} />
                <Route path="new-releases" getComponent={(nextState, cb) => {
                    require.ensure([], require => {
                      cb(null, require('./modules/new-releases/NewReleases').default);
                    });
                }} />
                <Route path="about" getComponent={(nextState, cb) => {
                    require.ensure([], require => {
                      cb(null, require('./modules/home/components/About').default);
                    });
                }} />
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
