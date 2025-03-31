
const history = [];
let currentIndex = -1; 

// track current index of the history array
export const addState = (state) => {
    return -1; 
}


export const undo = () => {
    return []; 

}


export const redo = () => { 
    return []; 
}

export const clearHistory = () => {
    history.length = 0;
    currentIndex = -1;
}