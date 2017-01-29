import fetch from 'isomorphic-fetch';
import config from './config';

export default class ApiBridge {

    static makeUrl(urlSegment, prefixUrl, params) {
        let suffix = params.length > 0 ? `?${params.join('&')}` : '';
        return `${prefixUrl}${urlSegment}${suffix}`;
    }

    static createFetch(url, options) {
        return fetch(url, options).then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json()
        })
    }

    static makeFetchRequest(url, options) {
        return ApiBridge.createFetch(url, options);
    }

    static makeFetchRequestWithAuth(url, options) {
        let headers = options['headers'] || new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('SPOTIFY_ACCESS_TOKEN')}`);
        options['headers'] = headers;
        return ApiBridge.createFetch(url, options);
    }

    static makeGet(url, params = [], options = {}, isAuthorized, isAccountUrl) {
        options['method'] = 'GET';
        let prefix = isAccountUrl ? config.SPOTIFY_AUTH_API : config.SPOTIFY_BASE_API;
        let uri = ApiBridge.makeUrl(url, prefix, params);
        return isAuthorized ? ApiBridge.makeFetchRequestWithAuth(uri, options) : ApiBridge.makeFetchRequest(uri, options);
    }

    static makePost(url, params = [], options = {}, isAuthorized, isAccountUrl) {
        options['method'] = 'POST';
        let prefix = isAccountUrl ? config.SPOTIFY_AUTH_API : config.SPOTIFY_BASE_API;
        let uri = ApiBridge.makeUrl(url, prefix, params);
        return isAuthorized ? ApiBridge.makeFetchRequestWithAuth(uri, options) : ApiBridge.makeFetchRequest(uri, options);
    }

    static makePut(url, params = [], options = {}, isAuthorized, isAccountUrl) {
        options['method'] = 'PUT';
        let prefix = isAccountUrl ? config.SPOTIFY_AUTH_API : config.SPOTIFY_BASE_API;
        let uri = ApiBridge.makeUrl(url, prefix, params);
        return isAuthorized ? ApiBridge.makeFetchRequestWithAuth(uri, options) : ApiBridge.makeFetchRequest(uri, options);
    }

    static makeDelete(url, params = [], options = {}, isAuthorized, isAccountUrl) {
        options['method'] = 'DELETE';
        let prefix = isAccountUrl ? config.SPOTIFY_AUTH_API : config.SPOTIFY_BASE_API;
        let uri = ApiBridge.makeUrl(url, prefix, params);
        return isAuthorized ? ApiBridge.makeFetchRequestWithAuth(uri, options) : ApiBridge.makeFetchRequest(uri, options);
    }
}
