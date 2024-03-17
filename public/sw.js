/* eslint-disable no-restricted-globals */
const STATIC_CACHE_VERSION = `static-v1`;
const DYNAMIC_CACHE_VERSION = `dynamic-v1`;

self.addEventListener("install", (e) => {
  console.log("Installing Service Worker");
  e.waitUntil(
    caches.open(STATIC_CACHE_VERSION).then((cache) => {
      cache.addAll(staticAssets);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("Activating Service Worker");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(deleteOutdatedCache(keyList));
    })
  );

  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) return res;
      else return fetchRequest(e.request);
    })
  );
});

const deleteOutdatedCache = (keyList) => {
  return keyList.map((key) => {
    if (key !== STATIC_CACHE_VERSION && key !== DYNAMIC_CACHE_VERSION) return caches.delete(key);
  });
};

const fetchRequest = async (req) => {
  try {
    const res = await fetch(req);
    const cache = await caches.open(DYNAMIC_CACHE_VERSION);
    if (res.status === 200) cache.put(req.url, res.clone());
    return res;
  } catch (err) {
    console.log(err);
  }
};

const staticAssets = [
  "/",
  "/game",
  "/leaderboard",
  "/favicon.ico",
  "/static/js/bundle.js",
  "/manifest.json",
  "/assets/dice/128x128/dice-1.webp",
  "/assets/dice/128x128/dice-2.webp",
  "/assets/dice/128x128/dice-3.webp",
  "/assets/dice/128x128/dice-4.webp",
  "/assets/dice/128x128/dice-5.webp",
  "/assets/dice/128x128/dice-6.webp",
  "assets/dice/512x512/dice-3.webp",
  "/assets/yahtzee-letters/100x189/Y.webp",
  "/assets/yahtzee-letters/100x189/A.webp",
  "/assets/yahtzee-letters/100x189/H.webp",
  "/assets/yahtzee-letters/100x189/T.webp",
  "/assets/yahtzee-letters/100x189/Z.webp",
  "/assets/yahtzee-letters/100x189/E.webp",
  "/static/media/background_1-720x1208.ccfdda54b08bdd9c3282.webp",
  "/static/media/background_1-800x600.f0c63754b6c3037f41e9.webp",
  "/static/media/background_1-1920x1080.96b63acae6a292c4519f.webp",
  "/static/media/background_1-2560x1440.6ecb65f76130010775e7.webp",
  "/static/media/background_1-3840x2160.82b6f600642bd3017566.webp",
  "/assets/background/desktop/video_background-1080p",
  "/assets/background/mobile/video_background-720p",
  "/assets/background/mobile/video_background-480p",
  "/assets/sfx/roll-1.mp3",
  "/assets/sfx/roll-2.mp3",
  "/assets/sfx/roll-3.mp3",
  "/assets/sfx/lock-die.mp3",
  "/assets/sfx/lock-room-category-1.mp3",
  "/assets/sfx/lock-room-category-2.mp3",
  "/assets/sfx/lock-room-category-3.mp3",
  "/assets/sfx/lock-room-category-4.mp3",
  "/assets/sfx/yahtzee-bonus.mp3",
  "/assets/sfx/yahtzee-celebration.mp3",
  "https://fonts.googleapis.com/css2?family=Monoton&family=Press+Start+2P&family=Tilt+Neon&display=swap",
  "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivNm4I81.woff2",
  "https://fonts.gstatic.com/s/tiltneon/v10/E21L_d7gguXdwD9LEFY2WCeElCNtd-eBqpHp1TzrkJSmwpj5ndxquUK6UOeHIsDTJGc.woff2",
];
