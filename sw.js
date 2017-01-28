importScripts('/assets/js/cache-polyfill.js');

var APP_NAME = 'Harp';
var APP_VERSION = '5';
var CACHE_NAME = APP_NAME + '-v' + APP_VERSION;
var CACHE_FILES = [
    '/',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/offline.html'
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(CACHE_FILES);
        })
        .then(function() {
            console.log('WORKER: install completed');
        })
    );
});

self.addEventListener("fetch", function(event) {
    if (event.request.method !== 'GET') {
        console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
        return;
    }

    event.respondWith(
        caches
        .match(event.request)
        .then(function(cached) {
            var networked = fetch(event.request)
                .then(fetchedFromNetwork, unableToResolve)
                .catch(unableToResolve);

            console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
            return cached || networked;

            function fetchedFromNetwork(response) {

                var cacheCopy = response.clone();

                console.log('WORKER: fetch response from network.', event.request.url);

                caches
                    .open(CACHE_NAME)
                    .then(function add(cache) {
                        cache.put(event.request, cacheCopy);
                    })
                    .then(function() {
                        console.log('WORKER: fetch response stored in cache.', event.request.url);
                    });

                return response;
            }

            function unableToResolve() {

                console.log('WORKER: fetch request failed in both cache and network.');
                return caches.match('/offline.html');
            }
        })
    );
});

self.addEventListener("activate", function(event) {
    
    console.log('WORKER: activate event in progress.');

    event.waitUntil(
        caches
        .keys()
        .then(function(keys) {
            return Promise.all(
                keys
                .filter(function(key) {                   
                    return !key.startsWith('harp-');
                })
                .map(function(key) {                    
                    return caches.delete(key);
                })
            );
        })
        .then(function() {
            console.log('WORKER: activate completed.');
        })
    );
});
