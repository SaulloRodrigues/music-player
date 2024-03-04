let statePlay = {
    'connection': {
        'cache': {
            nowevent: null,
        }
    },
    'tooltip': {
        'cache': {
            size: null,
        }
    },
}

class SoundProperties {

    setEvent(event) {
        statePlay.connection.cache.nowevent = event;
    }

    setAttribute(string) {
        statePlay.tooltip.cache.size = string;
    }
}

export { SoundProperties, statePlay }