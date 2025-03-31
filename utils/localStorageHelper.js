import CONFIG from "../config.js";

// unique key for local storage
const STG_KEY = CONFIG.STG_KEY || 'defKey';

if (STG_KEY == 'defKey') {
    console.info('Local Storage Key is set to default value!!!');
}

export const saveSTG = (outputHTML) => {
    try {
        console.log('saveSTG:', outputHTML);
        localStorage.setItem(STG_KEY, outputHTML);
        console.info('outputHTML saved');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

export const loadSTG = () => {
    try {
        console.log('loadSTG called.');
        return localStorage.getItem(STG_KEY) || 'defKey';
    }
    catch (error) {
        console.error('Error loading from localStorage:', error);
        return '';
    }
}

export const clearSTG = () => {
    try {
        localStorage.removeItem(STG_KEY);
        console.info('Storage cleared ');
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}