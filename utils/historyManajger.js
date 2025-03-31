const history = [];
let currentIndex = -1;

// track current index of the history array
export const addState = (state) => {
    if (history[currentIndex] !== state) {
        history.splice(currentIndex + 1);

        console.log('history index', history[currentIndex]);

        history.push(state);

        currentIndex = history.length - 1;
    }
}

export const undo = () => {
    if (currentIndex > 0) {
        currentIndex--;

        console.log('undo - history cI:', history[currentIndex]);

        // return the previous state
        return history[currentIndex];
    }
    return [];
}

export const redo = () => {
    if (currentIndex < history.length - 1) {
        currentIndex++;

        console.log('REDO - history cI:', history[currentIndex]);

        // return the next state
        return history[currentIndex];
    }
    return [];
}

export const clearHistory = () => {
    history.length = 0;
    currentIndex = -1;
}