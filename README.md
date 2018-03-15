# sw-postmessage-crash
Reproduces a service worker crashing a chrome tab via `postMessage` between an installing and active worker. The issue is intermittent, and chances of it happening seem to be increased by using `skipWaiting()`. Issue is reproduced in `Version 65.0.3325.162 (Official Build) (64-bit)`, but not Canary.

`python -m SimpleHTTPServer 8000`

Open `http://localhost:8000/` and open a bunch of tabs. Increment the version in `sw.js` and manually update if chrome doesn't do it for you.

[Screencast video of issue reproduction](https://www.youtube.com/watch?v=yCNtFGevQ5M)

The Chrome logs show this error:
```
[34853:46083:0314/181649.900791:ERROR:bad_message.cc(25)] Terminating renderer for bad IPC message, reason 67
```

Which appears to be: [SWDH_DECREMENT_WORKER_BAD_HANDLE](https://cs.chromium.org/chromium/src/content/browser/bad_message.h?type=cs&q=SWDH_DECREMENT_WORKER_BAD_HANDLE&sq=package:chromium&l=94)

The only code path that invokes this message was removed in [this commit](https://chromium.googlesource.com/chromium/src/+/fa23f2ad198386c864ec998452d9f6d916b2219a).