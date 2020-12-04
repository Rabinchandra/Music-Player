const playBtn = document.querySelector(".play-btn");
const prevBtn = document.querySelector(".fa-backward");
const nextBtn = document.querySelector(".fa-forward");
const audio = document.querySelector("audio");
const cover = document.querySelector(".music-cover img");
const progressContainer = document.querySelector(".progress-container");
const progressEl = document.querySelector(".progress");
const progressBar = document.querySelector(".progress div");
const musicInfo = document.querySelector(".music-info");

const songs = ["ukulele", "hey", "summer"];
let songIndex = 0;

// Load song
function loadSong() {
  audio.paused ? playSong() : pauseSong();
}

// play song
function playSong() {
  musicInfo.innerText = songs[songIndex];
  playBtn.classList.remove("fa-play");
  playBtn.classList.add("fa-pause");
  progressContainer.classList.add("play");
  cover.classList.add("rotate");

  audio.play();
}

// pause song
function pauseSong() {
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  progressContainer.classList.remove("play");
  cover.classList.remove("rotate");

  audio.pause();
}

// previous song
function prevSong() {
  songIndex--;
  songIndex < 0 ? (songIndex = songs.length - 1) : null;
  updateSong();
}

// next song
function nextSong() {
  songIndex++;
  songIndex > songs.length - 1 ? (songIndex = 0) : null;
  updateSong();
}

// Update song when prev or next click
function updateSong() {
  audio.src = `./music/${songs[songIndex]}.mp3`;
  cover.src = `./img/${songs[songIndex]}.jpg`;

  playSong();
}

// Update progress
function updateProgress() {
  progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;

  // play next music when current music finish
  if (audio.currentTime == audio.duration) {
    nextSong();
  }
}

function setProgress(e) {
  const width = progressEl.offsetWidth;
  const clickX = e.offsetX;

  const percent = (clickX / width) * 100;

  audio.currentTime = (percent * audio.duration) / 100;
}

// Event Listeners
playBtn.addEventListener("click", loadSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", updateProgress);

progressEl.addEventListener("click", (e) => setProgress(e));
