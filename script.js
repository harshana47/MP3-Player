document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const playPauseButton = document.getElementById('playPauseButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const progressBar = document.getElementById('progressBar');
    const volumeControl = document.getElementById('volumeControl');
    const songList = document.querySelectorAll('.song-list-card .list-group-item');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const progressBarContainer = document.getElementById('progressBarContainer');

    let currentTrackIndex = 0;
    const tracks = [
        { title: 'You are My Sunshine', src: 'lib/mp3/sunshine.mp3' },
        { title: 'Song 2', src: 'song2.mp3' },
        { title: 'Song 3', src: 'song3.mp3' },
        { title: 'Song 4', src: 'song4.mp3' }
    ];

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    }

    function loadTrack(index) {
        const track = tracks[index];
        audioSource.src = track.src;
        audioPlayer.load();
        document.getElementById('currentSongTitle').textContent = track.title;
        document.getElementById('currentSongArtist').textContent = "Artist Name";
    }

    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.innerHTML = '<i class="bi bi-pause-circle"></i>';
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = '<i class="bi bi-play-circle"></i>';
        }
    }

    function updateProgress() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        progressBar.style.width = (currentTime / duration) * 100 + '%';
        currentTimeDisplay.textContent = formatTime(currentTime);
        totalTimeDisplay.textContent = formatTime(duration);
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
    }

    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
    }

    volumeControl.addEventListener('input', () => {
        audioPlayer.volume = volumeControl.value;
    });

    songList.forEach((songItem, index) => {
        songItem.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            audioPlayer.play();
        });
    });

    progressBarContainer.addEventListener('click', (event) => {
        const rect = progressBarContainer.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const progressBarWidth = progressBarContainer.offsetWidth;
        const newTime = (clickPosition / progressBarWidth) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    });

    playPauseButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);

    audioPlayer.addEventListener('timeupdate', updateProgress);

    loadTrack(currentTrackIndex);
});
