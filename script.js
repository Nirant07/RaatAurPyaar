const DEFAULT_PLAYLIST_ID = 'PLjxsdvPZH24OZoxZSnuEqrW1crVtceCNG';
let activePlaylistId = DEFAULT_PLAYLIST_ID;
const $ = (id) => document.getElementById(id);
let player = null;
let progressTimer = null;
let ready = false;
let playlistEntries = [];
let currentPlaylistTitle = 'Raat aur Pyaar';
let playlistLoadAttempts = 0;
let playlistLoadTimer = null;

function formatTime(seconds) {
  const s = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function updateRange(el, value, max) {
  const pct = max > 0 ? Math.min(100, Math.max(0, value / max * 100)) : 0;
  el.style.background = `linear-gradient(90deg, rgba(244,242,237,.92) 0% ${pct}%, rgba(255,255,255,.12) ${pct}% 100%)`;
}

function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('show');
  window.clearTimeout(toast._timer);
  toast._timer = window.setTimeout(() => el.classList.remove('show'), 1500);
}

function syncTrackInfo() {
  if (!player || !ready) return;
  const data = player.getVideoData?.() || {};
  const title = data.title || 'Loading track…';
  const author = data.author || 'YouTube';
  const duration = Number(player.getDuration?.() || 0);

  $('trackTitle').textContent = title;
  $('trackArtist').textContent = author;
  updateActivePlaylistRow();
  $('duration').textContent = formatTime(duration);
  $('seekBar').max = Math.max(duration, 1);
  $('seekBar').value = 0;
  updateRange($('seekBar'), 0, Math.max(duration, 1));
}


function renderPlaylistLoading(message = 'Loading playlist…', detail = 'Fetching tracks from YouTube') {
  const list = $('playlistList');
  if (!list) return;
  list.innerHTML = `
    <div class="queue-note loading-row">
      <div class="queue-number">—</div>
      <div><strong>${message}</strong><small>${detail}</small></div>
    </div>`;
}

function updateActivePlaylistRow() {
  if (!player || !ready || !playlistEntries.length) return;
  const activeIndex = Number(player.getPlaylistIndex?.() ?? -1);
  document.querySelectorAll('.playlist-track').forEach((row, index) => {
    row.classList.toggle('is-active', index === activeIndex);
  });
}

function formatPlaylistTitle(title) {
  return String(title || 'Untitled track').replace(/\s+/g, ' ').trim();
}

async function fetchVideoMeta(videoId) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`;
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error(`oEmbed ${response.status}`);
    const data = await response.json();
    return {
      title: formatPlaylistTitle(data.title),
      author: data.author_name || 'YouTube',
      thumbnail: data.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    };
  } catch (_) {
    return {
      title: 'YouTube video',
      author: 'Open on YouTube',
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    };
  }
}

async function fetchPlaylistMeta(playlistId) {
  const playlistUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`;
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(playlistUrl)}&format=json`, { mode: 'cors' });
    if (!response.ok) throw new Error(`oEmbed ${response.status}`);
    const data = await response.json();
    return formatPlaylistTitle(data.title || 'Your playlist');
  } catch (_) {
    return playlistId === DEFAULT_PLAYLIST_ID ? 'Raat aur Pyaar' : 'Your playlist';
  }
}

async function updatePlaylistHeading(playlistId) {
  const title = await fetchPlaylistMeta(playlistId);
  currentPlaylistTitle = title;
  const heading = document.querySelector('.queue h2');
  if (heading) heading.textContent = title;
}

async function loadPlaylistListing() {
  if (!player || !ready) return;
  const ids = player.getPlaylist?.() || [];
  if (!ids.length) {
    if (playlistLoadAttempts++ < 12) {
      clearTimeout(playlistLoadTimer);
      playlistLoadTimer = setTimeout(loadPlaylistListing, 500);
      return;
    }
    renderPlaylistLoading('Playlist could not be loaded', 'Try refreshing the page.');
    return;
  }

  clearTimeout(playlistLoadTimer);
  renderPlaylistLoading('Loading playlist…', `${ids.length} tracks found`);

  const results = new Array(ids.length);
  let cursor = 0;
  const workers = Math.min(6, ids.length);
  await Promise.all(Array.from({ length: workers }, async () => {
    while (cursor < ids.length) {
      const index = cursor++;
      const videoId = ids[index];
      const meta = await fetchVideoMeta(videoId);
      results[index] = { index, videoId, ...meta };
    }
  }));

  playlistEntries = results;
  const list = $('playlistList');
  list.innerHTML = '';

  results.forEach((item) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'queue-note playlist-track';
    row.setAttribute('data-index', String(item.index));
    row.innerHTML = `
      <div class="queue-number">${String(item.index + 1).padStart(2, '0')}</div>
      <div class="playlist-track-main">
        <div class="playlist-track-line">
          <img class="playlist-thumb" src="${item.thumbnail}" alt="" loading="lazy" />
          <div class="playlist-track-copy">
            <strong title="${item.title.replace(/"/g, '&quot;')}">${item.title}</strong>
            <small>${item.author}</small>
          </div>
          <span class="playlist-play-indicator" aria-hidden="true">▶</span>
        </div>
      </div>`;
    row.addEventListener('click', () => {
      if (!player || !ready) return;
      player.playVideoAt(item.index);
    });
    list.appendChild(row);
  });

  updateActivePlaylistRow();
}

function startProgressLoop() {
  window.clearInterval(progressTimer);
  progressTimer = window.setInterval(() => {
    if (!player || !ready) return;
    const current = Number(player.getCurrentTime?.() || 0);
    const duration = Number(player.getDuration?.() || 0);
    $('currentTime').textContent = formatTime(current);
    $('duration').textContent = formatTime(duration);
    $('seekBar').max = Math.max(duration, 1);
    $('seekBar').value = Math.min(current, duration || current);
    updateRange($('seekBar'), current, duration || 1);
  }, 250);
}

function stopProgressLoop() {
  window.clearInterval(progressTimer);
}


function extractPlaylistId(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  if (/^[A-Za-z0-9_-]{10,}$/.test(raw) && !raw.includes('/') && !raw.includes('?')) {
    return raw;
  }

  try {
    const url = new URL(raw);
    const list = url.searchParams.get('list');
    return list && /^[A-Za-z0-9_-]{10,}$/.test(list) ? list : '';
  } catch (_) {
    const match = raw.match(/[?&]list=([A-Za-z0-9_-]+)/);
    return match ? match[1] : '';
  }
}

function resetPlaylistListingState() {
  playlistEntries = [];
  playlistLoadAttempts = 0;
  window.clearTimeout(playlistLoadTimer);
  renderPlaylistLoading('Loading playlist…', 'Fetching tracks from YouTube');
}

function loadSelectedPlaylist(playlistId, sourceLabel = 'your playlist') {
  if (!player || !ready) return;

  activePlaylistId = playlistId;
  resetPlaylistListingState();
  currentPlaylistTitle = playlistId === DEFAULT_PLAYLIST_ID ? 'Raat aur Pyaar' : 'Your playlist';
  const heading = document.querySelector('.queue h2');
  if (heading) heading.textContent = currentPlaylistTitle;
  $('customPlaylistNote').textContent = `Now playing ${sourceLabel}. Refresh to return to Raat aur Pyaar.`;
  toast('Loading playlist');

  try {
    player.loadPlaylist({
      listType: 'playlist',
      list: playlistId,
      index: 0,
      startSeconds: 0
    });

    // The YouTube player updates its internal playlist asynchronously.
    // Refresh our playlist window after the new list has had time to load.
    playlistLoadAttempts = 0;
    window.clearTimeout(playlistLoadTimer);
    playlistLoadTimer = window.setTimeout(() => loadPlaylistListing(), 900);
    updatePlaylistHeading(playlistId);
  } catch (_) {
    $('customPlaylistNote').textContent = 'That playlist could not be loaded. Check the link and try again.';
    toast('Playlist could not be loaded');
  }
}

function handleCustomPlaylistSubmit(event) {
  event.preventDefault();
  const value = $('customPlaylistInput').value;
  const playlistId = extractPlaylistId(value);

  if (!playlistId) {
    $('customPlaylistNote').textContent = 'Please paste a valid public YouTube playlist link.';
    toast('Invalid playlist link');
    return;
  }

  loadSelectedPlaylist(playlistId, 'your playlist');
}

function onYouTubeIframeAPIReady() {
  const origin = window.location.origin;

  player = new YT.Player('youtube-player', {
    width: '200',
    height: '200',
    playerVars: {
      listType: 'playlist',
      list: activePlaylistId,
      controls: 1,
      playsinline: 1,
      rel: 0,
      modestbranding: 1,
      origin,
      enablejsapi: 1
    },
    events: {
      onReady: handlePlayerReady,
      onStateChange: handleStateChange,
      onError: handlePlayerError
    }
  });
}

function handlePlayerReady() {
  ready = true;
  player.setVolume(Number($('volumeBar').value));
  syncTrackInfo();
  startProgressLoop();
  $('playerNote').textContent = 'Ready — click Play to start audio.';
  toast('Player ready');
  loadPlaylistListing();
}

function handleStateChange(event) {
  if (!ready) return;
  const state = event.data;
  if (state === YT.PlayerState.CUED) {
    // A playlist change has finished cueing; refresh the visible list.
    window.clearTimeout(playlistLoadTimer);
    playlistLoadTimer = window.setTimeout(loadPlaylistListing, 250);
    syncTrackInfo();
    updatePlaylistHeading(activePlaylistId);
  }
  if (state === YT.PlayerState.PLAYING) {
    $('playBtn').textContent = '❚❚';
    $('playerNote').textContent = 'Playing from YouTube.';
    syncTrackInfo();
    updateActivePlaylistRow();
  } else if (state === YT.PlayerState.PAUSED) {
    $('playBtn').textContent = '▶';
    $('playerNote').textContent = 'Paused.';
  } else if (state === YT.PlayerState.ENDED) {
    $('playBtn').textContent = '▶';
  } else if (state === YT.PlayerState.BUFFERING) {
    $('playerNote').textContent = 'Buffering…';
  }
}

function handlePlayerError(event) {
  const code = event.data;
  const message = {
    2: 'Invalid YouTube request.',
    5: 'HTML5 player error.',
    100: 'Video unavailable.',
    101: 'Embedding is disabled for this video.',
    150: 'Embedding is disabled for this video.'
  }[code] || `YouTube player error (${code}).`;

  $('playerNote').textContent = message + ' Trying the next playlist item…';
  toast('Skipping unavailable video');

  // Let YouTube manage playlist navigation instead of trying to extract video IDs.
  window.setTimeout(() => {
    try {
      player.nextVideo();
    } catch (_) {
      // Ignore if the player is not yet able to navigate.
    }
  }, 700);
}

$('playBtn').addEventListener('click', () => {
  if (!player || !ready) return;
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

$('nextBtn').addEventListener('click', () => {
  if (!player || !ready) return;
  player.nextVideo();
});

$('prevBtn').addEventListener('click', () => {
  if (!player || !ready) return;
  player.previousVideo();
});

$('seekBar').addEventListener('input', (event) => {
  if (!player || !ready) return;
  const value = Number(event.target.value);
  player.seekTo(value, true);
  $('currentTime').textContent = formatTime(value);
});

$('volumeBar').addEventListener('input', (event) => {
  const value = Number(event.target.value);
  if (player && ready) player.setVolume(value);
  updateRange($('volumeBar'), value, 100);
});

$('customPlaylistForm').addEventListener('submit', handleCustomPlaylistSubmit);

$('openPlaylist').addEventListener('click', () => {
  window.open(`https://www.youtube.com/playlist?list=${activePlaylistId}`, '_blank', 'noopener,noreferrer');
});

function updateClock() {
  $('clock').textContent = new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    timeZone: 'Asia/Kolkata'
  }).format(new Date());
}

setInterval(updateClock, 1000);
updateClock();
updateRange($('volumeBar'), Number($('volumeBar').value), 100);

// Small ambient listener-count animation for the visual design only.
setInterval(() => {
  const base = 1284;
  const variation = Math.floor(Math.sin(Date.now() / 45000) * 53 + Math.random() * 13);
  $('listenerCount').textContent = (base + variation).toLocaleString('en-IN');
}, 4200);

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
