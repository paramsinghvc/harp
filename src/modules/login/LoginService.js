import config from '../../shared/config';
import { BehaviorSubject } from 'rxjs/Rx';

const POPUP_WIDTH = 450;
const POPUP_HEIGHT = 500;

export default class LoginService {
    static accessToken$ = new BehaviorSubject();

    static makeAuthUrl() {
        return `${config.SPOTIFY_AUTH_API}/authorize?client_id=${config.SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(config.SPOTIFY_REDIRECT_URI)}&response_type=token`;
    }
    static initHandlers() {
        LoginService.attachMessageEvent();
    }
    static launchPopup() {
        let left = (screen.width / 2) - (POPUP_WIDTH / 2),
            top = (screen.height / 2) - (POPUP_HEIGHT / 2);
        let w = window.open(
            LoginService.makeAuthUrl(),
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + POPUP_WIDTH + ', height=' + POPUP_HEIGHT + ', top=' + top + ', left=' + left
        );
    }

    static attachMessageEvent() {
        window.addEventListener("message", function(event) {
            let hash = event.data;
            if (hash.type == 'access_token_spotify') {
                let token = hash.access_token
                localStorage.setItem('SPOTIFY_ACCESS_TOKEN', token);
                LoginService.accessToken$.next(token);
            } else if (hash.type == 'error') {
                LoginService.accessToken$.error(hash.message);
            }
        }, false);

        let callback = function(token) {

        };
    }

    static parseRouteHash(hash) {
        let hashFragments = hash.replace(/^#\/?/, '').split('&');
        let tokenHashFragments = hashFragments.filter(hf => /^access_token=\S+/.test(hf));
        let accessToken = tokenHashFragments.length > 0 ? tokenHashFragments[0].split('=')[1] : null;
        LoginService.processAccessToken(accessToken);
    }

    static processAccessToken(token) {
        if (!token) {
            window.opener.postMessage({
                type: 'error',
                message: 'No Access Token Found.'
            }, window.location.origin);
            window.close();
            return;
        };
        window.opener.postMessage({
            type: 'access_token_spotify',
            access_token: token
        }, window.location.origin);
        window.close();
    }
}
