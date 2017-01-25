import fetch from 'isomorphic-fetch';
import config from './config';

export default class ApiBridge {

    static makeUrl(urlSegment, prefixUrl, params) {
        return `${prefixUrl}${urlSegment}?${params.join('&')}`;
    }

    static makeFetchRequest(url, options) {
        return fetch(url, options);
    }

    static makeFetchRequestWithAuth(url, options) {
        let headers = options['headers'] || new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('SPOTIFY_ACCESS_TOKEN')}`);
        options['headers'] = headers;

        return fetch(url, options);
    }

    static makeGet(url, params = [], options = {}, isAuthorized, isAccountUrl) {
        options['method'] = 'GET';
        let prefix = isAccountUrl ? config.SPOTIFY_AUTH_API : config.SPOTIFY_BASE_API;
        let url = ApiBridge.makeUrl(url, prefix, params);
        return isAuthorized ? ApiBridge.makeFetchRequestWithAuth(url, options) : ApiBridge.makeFetchRequest(url, options);
    }

    static makePost(url, params = [], options = {}, isAuthorized, isAccountUrl) {
        options['method'] = 'POST';
        let prefix = isAccountUrl ? config.SPOTIFY_AUTH_API : config.SPOTIFY_BASE_API;
        let url = ApiBridge.makeUrl(url, prefix, params);
        return isAuthorized ? ApiBridge.makeFetchRequestWithAuth(url, options) : ApiBridge.makeFetchRequest(url, options);
    }

    static makePut(url, params = [], options = {}, isAuthorized, isAccountUrl) {
        options['method'] = 'PUT';
        let prefix = isAccountUrl ? config.SPOTIFY_AUTH_API : config.SPOTIFY_BASE_API;
        let url = ApiBridge.makeUrl(url, prefix, params);
        return isAuthorized ? ApiBridge.makeFetchRequestWithAuth(url, options) : ApiBridge.makeFetchRequest(url, options);
    }

    static makeDelete(url, params = [], options = {}, isAuthorized, isAccountUrl
) {
        options['method'] = 'DELETE';
        let prefix = isAccountUrl ? config.SPOTIFY_AUTH_API : config.SPOTIFY_BASE_API;
        let url = ApiBridge.makeUrl(url, prefix, params);
        return isAuthorized ? ApiBridge.makeFetchRequestWithAuth(url, options) : ApiBridge.makeFetchRequest(url, options);
    }
}
