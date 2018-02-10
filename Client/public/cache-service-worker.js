"use strict";
var cacheName = "sample-cache-v1";

var urlsToCache = ["api/nav"];

//Runs on service worker start, pre-cache the nav
self.addEventListener("install", function(event) {
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});
//Runs when SW is activated
self.addEventListener("activate", function(event) {
  console.log("CSW: activating");
  event.waitUntil(self.clients.claim()); // Become available to all pages
});

//returned cached copy instead of server copy
self.addEventListener("fetch", function(event) {
  //fetch listens to all fetch requests, I only watch to cache ones I am interested in
  if (urlsToCache.find(itm => event.request.url.includes(itm))) {
    event.respondWith(
      //load our sample cache
      caches.open(cacheName).then(function(cache) {
        //check to see if the request is already in cache
        return cache.match(event.request).then(function(response) {
          //response will be undefined if cache is not present
          //log if he are going to hit or miss the cache
          console.log(
            "%cCSW: cache " + (response ? "hit" : "miss"),
            "color: " + (response ? "green" : "red"),
            event.request.url
          );
          //if response is defined(ie cached) we return it otherwise cetch it from the server
          return (
            response ||
            fetch(event.request).then(function(response) {
              //put the request into the cache, it is not recomended to re-use the same response
              //(other response is going back to the original requestor)
              cache.put(event.request, response.clone());
              return response;
            })
          );
        });
      })
    );
  }
});

//represents messages from the rest of the applicaiton
self.addEventListener("message", function(event) {
  //filter out only events I am interested in "clearCache"
  if (event.data && event.data.action && event.data.action === "clearCache") {
    //open up my cache list
    caches.open(cacheName).then(function(cache) {
      //remove the entry passed in that was requested to clear
      cache.delete(event.data.cacheEntry).then(function() {
        //respond back to the original requestor that cache is cleared
        event.ports[0].postMessage(event.data.cacheEntry + " Cleared");
      });
    });
  }
});
