const devConfig = {
    APP_NAME: 'Harp',
    SPOTIFY_CLIENT_ID: '42d45b0f27634aed90d764226f9e5495',
    SPOTIFY_CLIENT_SECRET: 'ef8af4f78f3a48159a0451d1b682ba03',
    SPOTIFY_BASE_API: 'https://api.spotify.com',
    SPOTIFY_AUTH_API: 'https://accounts.spotify.com',
    SPOTIFY_REDIRECT_URI: `${window.location.origin}/callback_spotify`,
    SPOTIFY_AUTH_SCOPES: 'user-top-read user-follow-modify user-library-read user-follow-read'
}

const prodConfig = {
    APP_NAME: 'Harp',
    SPOTIFY_CLIENT_ID: 'edb1bd9e725b47198ff75320b9866bb4',
    SPOTIFY_CLIENT_SECRET: 'cac02b9f1bc54ab2828ae5e078ee90aa',
    SPOTIFY_BASE_API: 'https://api.spotify.com',
    SPOTIFY_AUTH_API: 'https://accounts.spotify.com',
    SPOTIFY_REDIRECT_URI: `${window.location.origin}/callback_spotify`,
    SPOTIFY_AUTH_SCOPES: 'user-top-read user-follow-modify user-library-read user-follow-read'
}

const config = (process.env.NODE_ENV == 'development') ? devConfig : prodConfig;

export default config;
