import { saveSTG, loadSTG, clearSTG } from '../utils/localStorageHelper.js';
import { addState, undo, redo } from '../utils/historyManager.js';
import { updateWordCount } from '../utils/wordCounter.js';
import { initThemeManager } from '../utils/themeManager.js';
import { markdownToHTML } from './markdownParser.js';

// Run after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    initThemeManager();
    
    // DOM elements
    const elements = {
        editor: document.getElementById('markdown-editor'),
        preview: document.getElementById('html-preview'),
        clearBtn: document.getElementById('clear-btn'),
        storageBtn: document.getElementById('storage-clear-btn'),
        undoBtn: document.getElementById('undo-btn'),
        redoBtn: document.getElementById('redo-btn'),
        wordCount: document.getElementById('word-count')
    };
    
    // Update HTML preview based on markdown input
    const updateHTMLPreview = () => {
        const inputMarkdown = elements.editor.value;
        
        // Update word count
        updateWordCount(inputMarkdown, elements.wordCount);
        
        // Save to localStorage
        saveSTG(inputMarkdown);
        
        // Save to history
        addState(inputMarkdown);
        
        // Update preview
        try {
            if (!inputMarkdown) {
                elements.preview.innerHTML = "You haven't written anything.";
            } else {
                elements.preview.innerHTML = markdownToHTML(inputMarkdown);
            }
        } catch (error) {
            console.error("Error converting markdown to HTML:", error);
            elements.preview.innerHTML = "Error converting markdown to HTML.";
        }
    };
    
    // Retrieve from localStorage
    const savedContent = loadSTG();
    if (savedContent) {
        elements.editor.value = savedContent;
        updateWordCount(savedContent, elements.wordCount);
        addState(savedContent);
        updateHTMLPreview();
    }
    
    // Event listeners
    elements.editor.addEventListener('input', updateHTMLPreview);
    
    elements.undoBtn.addEventListener('click', () => {
        const previousState = undo();
        if (previousState && typeof previousState === 'string') {
            elements.editor.value = previousState;
            updateWordCount(previousState, elements.wordCount);
            elements.preview.innerHTML = markdownToHTML(previousState);
          
        }
    });
    
    elements.redoBtn.addEventListener('click', () => {
        const nextState = redo();
        if (nextState && typeof nextState === 'string') {
            elements.editor.value = nextState;
            updateWordCount(nextState, elements.wordCount);
            elements.preview.innerHTML = markdownToHTML(nextState);
        }
    });
    
    elements.clearBtn.addEventListener('click', () => {
        elements.editor.value = "";
        updateHTMLPreview();
    });
    
    elements.storageBtn.addEventListener('click', () => {
        elements.editor.value = "";
        updateHTMLPreview();
        clearSTG();
    });
    
    // Initial update
    updateHTMLPreview();
});