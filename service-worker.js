var cacheName = 'app-core-value-cache-6';
var filesToCache = [
    './',
    './manifest.json',
    './service-worker.js',
    './index.html',
    './assets/audio/Procession.mp3',
    './assets/css/common.css',
    './assets/css/font.css',
    './assets/font/Dimbo-Italic.ttf',
    './assets/font/Dimbo-Regular.ttf',
    './assets/font/VTCAllSkratchedUpOne.ttf',
    './assets/images/Back-Button.png',
    './assets/images/Blue-Boy.png',
    './assets/images/Game-1-Ending-Congratulation.png',
    './assets/images/Game-1-Ending-Home-Button.png',
    './assets/images/Game-1-Ending.png',
    './assets/images/Green-Boy.png',
    './assets/images/Home-Volume-Button.png',
    './assets/images/Homepage-Background.png',
    './assets/images/Icon128.png',
    './assets/images/Icon144.png',
    './assets/images/Icon152.png',
    './assets/images/Icon192.png',
    './assets/images/Icon256.png',
    './assets/images/Icon512.png',
    './assets/images/Journey-Character-Fail-Level-1-blue.png',
    './assets/images/Journey-Character-Fail-Level-1-green.png',
    './assets/images/Journey-Character-Fail-Level-1-red.png',
    './assets/images/Journey-Character-Fail-Level-1-yellow.png',
    './assets/images/Journey-Character-Fail-Level-2-blue.png',
    './assets/images/Journey-Character-Fail-Level-2-green.png',
    './assets/images/Journey-Character-Fail-Level-2-red.png',
    './assets/images/Journey-Character-Fail-Level-2-yellow.png',
    './assets/images/Journey-Character-Fail-Level-3-blue.png',
    './assets/images/Journey-Character-Fail-Level-3-green.png',
    './assets/images/Journey-Character-Fail-Level-3-red.png',
    './assets/images/Journey-Character-Fail-Level-3-yellow.png',
    './assets/images/Journey-Character-Success-Level-1-blue.png',
    './assets/images/Journey-Character-Success-Level-1-green.png',
    './assets/images/Journey-Character-Success-Level-1-red.png',
    './assets/images/Journey-Character-Success-Level-1-yellow.png',
    './assets/images/Journey-Character-Success-Level-2-blue.png',
    './assets/images/Journey-Character-Success-Level-2-green.png',
    './assets/images/Journey-Character-Success-Level-2-red.png',
    './assets/images/Journey-Character-Success-Level-2-yellow.png',
    './assets/images/Journey-Character-Success-Level-3-blue.png',
    './assets/images/Journey-Character-Success-Level-3-green.png',
    './assets/images/Journey-Character-Success-Level-3-red.png',
    './assets/images/Journey-Character-Success-Level-3-yellow.png',
    './assets/images/Journey-Correct.png',
    './assets/images/Journey-End-Game-blue.png',
    './assets/images/Journey-End-Game-green.png',
    './assets/images/Journey-End-Game-red.png',
    './assets/images/Journey-End-Game-yellow.png',
    './assets/images/Journey-Ending-Banner-blue.png',
    './assets/images/Journey-Ending-Banner-green.png',
    './assets/images/Journey-Ending-Banner-red.png',
    './assets/images/Journey-Ending-Banner-yellow.png',
    './assets/images/Journey-Incorrect.png',
    './assets/images/Journey-Intro.png',
    './assets/images/Journey-Level-1-Avatar.png',
    './assets/images/Journey-Level-1-Fail.png',
    './assets/images/Journey-Level-1-Success.png',
    './assets/images/Journey-Level-2-Fail.png',
    './assets/images/Journey-Level-2-Success.png',
    './assets/images/Journey-Level-3-Fail.png',
    './assets/images/Journey-Level-3-Success.png',
    './assets/images/Journey-Line.png',
    './assets/images/Journey-Play-Again.png',
    './assets/images/Journey-Question-Frame-1.png',
    './assets/images/Journey-Question-Frame-2.png',
    './assets/images/Journey-Question-Frame-3.png',
    './assets/images/Journey-Select-Character.png',
    './assets/images/Journey-Stage-Home-1.png',
    './assets/images/Journey-Stage-Home-2.png',
    './assets/images/Journey-Stage-Home-3.png',
    './assets/images/Know-Your-School-Values-Home.png',
    './assets/images/Leaf-1.png',
    './assets/images/Leaf-10.png',
    './assets/images/Leaf-11.png',
    './assets/images/Leaf-12.png',
    './assets/images/Leaf-2.png',
    './assets/images/Leaf-3.png',
    './assets/images/Leaf-4.png',
    './assets/images/Leaf-5.png',
    './assets/images/Leaf-6.png',
    './assets/images/Leaf-7.png',
    './assets/images/Leaf-8.png',
    './assets/images/Leaf-9.png',
    './assets/images/Leaf-Back.png',
    './assets/images/Leaf.png',
    './assets/images/Live-Correct-Answer.png',
    './assets/images/Live-Game-0.png',
    './assets/images/Live-Game-1.png',
    './assets/images/Live-Game-2.png',
    './assets/images/Live-Game-3.png',
    './assets/images/Live-Game-4.png',
    './assets/images/Live-Game-5.png',
    './assets/images/Live-Incorrect-Answer.png',
    './assets/images/Next-Stage-Timer.png',
    './assets/images/Red-Girl.png',
    './assets/images/School-Value-Live-Instruction-Background.png',
    './assets/images/School-Value-Mean-Game-Background.png',
    './assets/images/School-Value-Mean-Instruction-Background.png',
    './assets/images/Yellow-Girl.png',
    './assets/images/Perfect-Match.png',
    './assets/images/Home-Volume-Button-Mute.png',
    './assets/js/jquery-3.3.1.min.js',
    './controllers/core.js',
    './models/journeymodel.js',
    './models/valuemodel.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});