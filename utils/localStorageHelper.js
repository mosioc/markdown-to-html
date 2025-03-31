import { CONFIG } from "../config.js";

// unique key for local storage
const STG_KEY = CONFIG.STG_KEY || 'defKey';

const saveSTG = (finalMarkdown) => {
    try {
        console.log('saveSTG', finalMarkdown);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

const loadSTG = () => {
    try {
        console.log('loadSTG called.');
    }
    catch (error) {
        console.error('Error loading from localStorage:', error);
        return '';
    }
}

const clearSTG = () => {
    try {
        return 0;
    } catch (error) {
        return -1;
    }
}