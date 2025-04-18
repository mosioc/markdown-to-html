const history = [];
let currentIndex = -1;

// track current index of the history array
export const addState = (state) => {
    if (history[currentIndex] !== state) {

        history.splice(currentIndex + 1);
        history.push(state);
        currentIndex = history.length - 1;
    }
}

export const undo = () => {
    if (currentIndex > 0) {
        currentIndex--;

        // return the previous state
        return history[currentIndex];
    }
    return null;
}

export const redo = () => {
    if (currentIndex < history.length - 1) {
        currentIndex++;

        // return the next state
        return history[currentIndex];
    }
    return null;
}

export const clearHistory = () => {
    history.length = 0;
    currentIndex = -1;
}