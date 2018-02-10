"use strict";
var cacheName = "sample-cache-v1";

var urlsToCache = ["api/nav"];
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // Open a cache and cache our files
      console.log("cache service loaded loaded");
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("activate", function(event) {
  console.log("activating");
});

//returned cached copy instead of server copy
self.addEventListener("fetch", function(event) {
  if (urlsToCache.find(itm => event.request.url.includes(itm))) {
    //console.log("CSW: attempting cache load", event.request.url);
    event.respondWith(
      caches.open(cacheName).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          console.log(
            "%cCSW: cache " + (response ? "hit" : "miss"),
            "color: " + (response ? "green" : "red"),
            event.request.url
          );
          return (
            response ||
            fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            })
          );
        });
      })
    );
  }
});

self.addEventListener("message", function(event) {
  if (event.data && event.data.action && event.data.action === "clearCache") {
    caches.open(cacheName).then(function(cache) {
      cache.delete(event.data.cacheEntry).then(function() {
        event.ports[0].postMessage(event.data.cacheEntry + " Cleared");
      });
    });
  }
});
