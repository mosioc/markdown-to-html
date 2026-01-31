import { saveSTG, loadSTG, clearSTG } from "../utils/localStorageHelper.js";
import { addState, undo, redo } from "../utils/historyManager.js";
import { updateWordCount } from "../utils/wordCounter.js";
import { initThemeManager } from "../utils/themeManager.js";
import { markdownToHTML } from "./markdownParser.js";

// Run after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme manager
  initThemeManager();

  // DOM elements
  const elements = {
    editor: document.getElementById("markdown-editor"),
    preview: document.getElementById("html-preview"),
    clearBtn: document.getElementById("clear-btn"),
    storageBtn: document.getElementById("storage-clear-btn"),
    undoBtn: document.getElementById("undo-btn"),
    redoBtn: document.getElementById("redo-btn"),
    wordCount: document.getElementById("word-count"),
    copyBtn: document.getElementById("copy-btn"),
  };

  // Copy preview HTML to clipboard
  const copyPreview = async () => {
    if (
      elements.preview.innerHTML === "You haven't written anything." ||
      !elements.preview.innerHTML.trim()
    ) {
      alert("Nothing to copy!");
      return;
    }

    if (!navigator.clipboard?.writeText) {
      alert("Clipboard not available in this browser/context.");
      return;
    }

    try {
      await navigator.clipboard.writeText(elements.preview.innerHTML);
      showCopyFeedback();
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy to clipboard");
    }
  };

  // Show visual feedback when copied
  const showCopyFeedback = () => {
    const originalText = elements.copyBtn.textContent;
    elements.copyBtn.textContent = "✓ Copied!";
    elements.copyBtn.classList.add("btn-success");
    elements.copyBtn.classList.remove("btn-outline-success");
    setTimeout(() => {
      elements.copyBtn.textContent = originalText;
      elements.copyBtn.classList.remove("btn-success");
      elements.copyBtn.classList.add("btn-outline-success");
    }, 2000);
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
  elements.editor.addEventListener("input", updateHTMLPreview);

  // Copy button click
  elements.copyBtn.addEventListener("click", copyPreview);

  // Keyboard shortcut: Press 'C' to copy
  document.addEventListener("keydown", (e) => {
    if (e.key === "c" || e.key === "C") {
      // Check if not typing in the editor
      if (document.activeElement !== elements.editor) {
        copyPreview();
      }
    }
  });

  elements.undoBtn.addEventListener("click", () => {
    const previousState = undo();
    if (previousState && typeof previousState === "string") {
      elements.editor.value = previousState;
      updateWordCount(previousState, elements.wordCount);
      elements.preview.innerHTML = markdownToHTML(previousState);
    }
  });

  elements.redoBtn.addEventListener("click", () => {
    const nextState = redo();
    if (nextState && typeof nextState === "string") {
      elements.editor.value = nextState;
      updateWordCount(nextState, elements.wordCount);
      elements.preview.innerHTML = markdownToHTML(nextState);
    }
  });

  elements.clearBtn.addEventListener("click", () => {
    elements.editor.value = "";
    updateHTMLPreview();
  });

  elements.storageBtn.addEventListener("click", () => {
    elements.editor.value = "";
    updateHTMLPreview();
    clearSTG();
  });

  // Initial update
  updateHTMLPreview();
});
