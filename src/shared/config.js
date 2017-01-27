const config = {
    APP_NAME: 'Harp',
    SPOTIFY_CLIENT_ID: '42d45b0f27634aed90d764226f9e5495',
    SPOTIFY_CLIENT_SECRET: 'ef8af4f78f3a48159a0451d1b682ba03',
    SPOTIFY_BASE_API: 'https://api.spotify.com',
    SPOTIFY_AUTH_API: 'https://accounts.spotify.com',
    SPOTIFY_REDIRECT_URI: `${window.location.origin}/callback_spotify`,
    SPOTIFY_AUTH_SCOPES: 'user-top-read'
}

export default config;
