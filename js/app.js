const playButton = document.getElementById('play');
const searchInput = document.getElementById('search-send');
import { SoundProperties, statePlay } from './modules/client.js';
import { dataTracks } from './modules/availableTracks.js';
const sound = new SoundProperties();

let audioTrack = new Audio();
let currentTrack = {
    "url": null,
    "title": null,
    "artist": null,
    "duration": null,
};

const levenshteinDistance = (s1, s2) => {
    const len1 = s1.length;
    const len2 = s2.length;

    const matrix = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = (s1.charAt(i - 1) === s2.charAt(j - 1)) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[len1][len2];
}

let bestMatchData = null;

const playTrack = () => {
    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            var value = searchInput.value.toLowerCase();

            let bestMatch = null;
            let minDistance = Infinity;

            for (let trackName in dataTracks) {
                const normalizedTrackName = trackName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                const distance = levenshteinDistance(normalizedTrackName, normalizedValue);

                if (distance < minDistance) {
                    minDistance = distance;
                    bestMatch = trackName;
                }
            }

            if (minDistance <= 3) {
                bestMatchData = dataTracks[bestMatch];
                var isNewUrl = `../assets/tracks/${bestMatchData.url}`;
                if (currentTrack.url !== isNewUrl) {
                    currentTrack.url = isNewUrl;
                    console.log(currentTrack.url);
                    if (audioTrack) {
                        audioTrack.src = currentTrack.url;
                        eAudioListeners();
                    }
                    const imgElement = document.getElementById('imagem-da-musica');
                    imgElement.classList.remove('opacity-100');
                    setTimeout(() => {
                        imgElement.src = bestMatchData.imgurl;
                        imgElement.classList.add('opacity-100');
                    }, 100);
                    const statusContainer = document.getElementById('status-container');
                    statusContainer.classList.remove('animate-pulse');
                }
            } else {
                throw new Error('A música desejada não foi encontrada.');
            }
        }
    });

    const eAudioListeners = () => {
        audioTrack.addEventListener('canplay', () => {
            sound.setEvent("ready");
            document.getElementById('imagem-da-musica').classList.add('loaded');
        });

        audioTrack.addEventListener('abort', () => {
            if (playButton.classList.contains('bi-pause') || currentTrack.url) {
                playButton.classList.remove('bi-pause');
                playButton.classList.add('bi-play');
            }
        })
    }

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

playTrack();
