const playButton = document.getElementById('play');
const searchInput = document.getElementById('search-send');
import { SoundProperties, statePlay } from './modules/client.js';
const sound = new SoundProperties();

let audioTrack = new Audio();
let currentTrack = {
    "url": null,
    "title": null,
    "artist": null,
    "duration": null,
};


const playTrack = () => {
    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            var value = searchInput.value;
            var isNewUrl = `../assets/music/${value}.mp3`;
            if (currentTrack.url !== isNewUrl) {
                currentTrack.url = isNewUrl;
                console.log(currentTrack.url)
                if (audioTrack) {
                    audioTrack.src = currentTrack.url;
                    eAudioListerners();
                };
            };
        };
    });

    playButton.addEventListener('click', () => {

        if (playButton.classList.contains('bi-play')) {
            playButton.classList.remove('bi-play');
            playButton.classList.add('bi-pause');
        }
        else {
            playButton.classList.remove('bi-pause');
            playButton.classList.add('bi-play');
        }
        if (audioTrack && statePlay.connection.cache.nowevent === "ready") {
            audioTrack.play();
            sound.setEvent("play");
        }
        else if (audioTrack && statePlay.connection.cache.nowevent === "play") {
            audioTrack.pause();
            sound.setEvent("ready");
        }
        console.log(statePlay.connection.cache.nowevent);
    });
}

const eAudioListerners = () => {
    audioTrack.addEventListener('canplay', () => {
        sound.setEvent("ready");
    });


    audioTrack.addEventListener('abort', () => {
        if (playButton.classList.contains('bi-pause') || currentTrack.url) {
            playButton.classList.remove('bi-pause')
            playButton.classList.add('bi-play');
        }
    })
}

playTrack();
