const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const togglePlay = () => video[video.paused ? 'play' : 'pause']();

const updateButton = () => toggle.textContent = video.paused ? '►' : '❚ ❚';

function skip() {video.currentTime += parseFloat(this.dataset.skip);}

function handleRangeUpdate() {video[this.name] = this.value;};

function handleProgress() {
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

let scrub = (e) => video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;


video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e)); 
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);