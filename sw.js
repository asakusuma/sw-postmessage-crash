// Change the version to create a new worker version
const version = '15.0.0';

function onInstall() {
  return new Promise((resolve) => {
    const channel = new MessageChannel();

    if (self.registration.active) {
      self.registration.active.postMessage({
        request: 'version'
      }, [channel.port2]);
  
      channel.port1.onmessage = function handleSignatureResponse(e) {
        console.log('previous version', e.data.version);
        resolve(self.skipWaiting());
      };
    } else {
      resolve();
    }
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(onInstall());
});

self.addEventListener('message', (e) => {
  e.ports[0].postMessage({
    version
  });
});