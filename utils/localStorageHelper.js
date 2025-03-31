import { CONFIG } from "../config.js";

// unique key for local storage
const locSTG_KEY = CONFIG.STG_KEY || 'defKey';


export const saveSTG = (outputHTML) => {
    try {
        console.log('saveSTG:', outputHTML);
        localStorage.setItem(locSTG_KEY, outputHTML);
        console.info('outputHTML saved');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

export const loadSTG = () => {
    try {
        console.log('loadSTG called.');
        return localStorage.getItem(locSTG_KEY);
    }
    catch (error) {
        console.error('Error loading from localStorage:', error);
        return '';
    }
}

export const clearSTG = () => {
    try {
        localStorage.removeItem(locSTG_KEY);
        console.info('Storage cleared ');
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}