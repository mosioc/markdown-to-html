# Markdown to HTML Editor

A responsive, browser-based Markdown editor with live HTML preview. This project implements a lightweight Markdown-to-HTML converter using pure JavaScript, with syntax highlighting, themes, and local storage functionality. Try it out: [https://mosioc.github.io/markdown-to-html/](https://mosioc.github.io/markdown-to-html/). 

## Table of Contents

- [Project Overview](#project-overview)
  - [Supported Markdown Features](#supported-markdown-features)
- [Project Structure & Architecture](#project-structure--architecture)
  - [Directory Structure](#directory-structure)
  - [Architectural Design](#architectural-design)
  - [Key Components](#key-components)
  - [Data Flow](#data-flow)
  - [Technical Solutions](#technical-solutions)
- [Technical Challenges & Solutions](#technical-challenges--solutions)
  - [Challenge 1: Nested Markdown Structure](#challenge-1-nested-markdown-structure)
  - [Challenge 2: History Management](#challenge-2-history-management)
  - [Challenge 3: Word Count Accuracy](#challenge-3-word-count-accuracy)
  - [Challenge 4: Cross-Browser Compatibility](#challenge-4-cross-browser-compatibility)
- [Code Quality Principles](#code-quality-principles)
- [Requirements](#requirements)
  - [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Regex Cheat Sheet](#regex-cheat-sheet-for-reference)
- [PS](#ps)

## Project Overview

This project allows users to:
- Write Markdown in a text editor
- See the HTML result in real-time
- Toggle between light and dark themes
- Save content automatically to localStorage
- Track editing history with undo/redo functionality (each time)
- Count words in the document
- View syntax-highlighted code blocks in the preview

### Supported Markdown Features:

- Headings (H1-H3)
- Text formatting (bold, italic)
- Ordered and unordered lists
- Hyperlinks
- Code blocks (multiline + inline)

## Project Structure & Architecture

### Directory Structure

```
markdown-to-html/
├── css/
│   └── style.css              # Main stylesheet for the application
├── js/
│   ├── app.js                 # Main application script
│   └── markdownParser.js      # Markdown conversion logic
├── utils/
│   ├── historyManager.js      # State history for undo/redo
│   ├── localStorageHelper.js  # Local storage operations
│   ├── themeManager.js        # Theme switching functionality
│   └── wordCounter.js         # Word counting utilities
├── index.html                 # Main HTML file
├── config.example.js          # Configuration template
└── README.md                  # Project documentation
```

### Architectural Design

The project follows a **modular JavaScript architecture** with clean separation of concerns. Each component is responsible for a specific functionality and communicates with other components through well-defined interfaces.

#### Core Architectural Principles:

1. **Separation of Concerns**: Each JavaScript module handles a distinct responsibility.
2. **Modularity**: All functionality is encapsulated in purpose-built modules.
3. **Minimal Dependencies**: Modules have clear, minimal dependencies on each other.
4. **Clean Interfaces**: Components interact through simple, well-defined interfaces.
5. **DRY Principle**: Common functionality is abstracted to avoid repetition.

### Key Components

#### 1. Core Application (app.js)
The central orchestrator that initializes the application, sets up event listeners, and coordinates between modules. It:
- Initializes the application when the DOM is loaded
- Manages DOM element references
- Coordinates interactions between different components
- Sets up event handling for user interactions

#### 2. Markdown Parser (markdownParser.js)
A pure function-based module that transforms Markdown text into HTML:
- Uses regex patterns to identify Markdown syntax
- Applies transformations to convert Markdown to HTML
- Handles special cases like code blocks with language detection
- Maintains a sequential transformation approach

#### 3. Utility Modules
Specialized functionality is separated into utility modules:

**Theme Manager (themeManager.js)**
- Handles light/dark theme switching
- Detects system preferences
- Persists theme choices in localStorage
- Updates UI elements when themes change

**Local Storage Helper (localStorageHelper.js)**
- Abstracts storage operations behind a clean API
- Handles storage errors gracefully
- Uses configurable keys from config.js

**History Manager (historyManager.js)**
- Implements the state management pattern
- Provides undo/redo functionality
- Maintains an efficient history stack
- Prevents duplicate state entries

**Word Counter (wordCounter.js)**
- Counts words while ignoring markdown syntax
- Excludes code blocks from counting
- Provides utility for updating the UI

### Data Flow

The application follows a unidirectional data flow:

1. **User Input** → User types in the Markdown editor
2. **Event Handling** → Input events trigger state updates
3. **State Processing** → Changes are processed (saved to history/storage)
4. **Markdown Processing** → Text is converted to HTML
5. **DOM Updates** → UI is updated with new content
6. **Side Effects** → Word count is updated, highlighting is applied

This approach creates a predictable and maintainable application state.

### Technical Solutions

#### Markdown Parsing

The parsing engine uses carefully crafted regular expressions to identify Markdown syntax and convert it to equivalent HTML. Each pattern is processed sequentially to avoid conflicts between similar patterns.

```javascript
// Example of the regex-based Markdown parser
html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
```

#### Responsive Design

The interface is fully responsive with Bootstrap integration and custom CSS media queries:
- Desktop: Side-by-side editor and preview
- Tablet: Adjusted spacing and button layout
- Mobile: Stacked interface with optimized controls

#### Theme Management

The theme engine uses CSS variables, Bootstrap or class-based styling that can be toggled via JavaScript:

```javascript
export const setTheme = (theme) => {
    document.body.className = theme;
    localStorage.setItem(THEME_KEY, theme);
    // Update UI elements
};
```

## Technical Challenges & Solutions

### Challenge 1: Nested Markdown Structure

**Problem**: Handling nested elements (e.g., lists within lists) proved difficult with simple regex.

**Solution**: Implemented a sequential transformation approach that first converts individual elements and then wraps related elements in container tags.

### Challenge 2: History Management

**Problem**: Implementing undo/redo (history) functionality without excessive memory usage.

**Solution**: Created a simple state management system that tracks document changes efficiently and maintains a history stack with controlled growth.

### Challenge 3: Word Count Accuracy

**Problem**: Accurately counting words while ignoring markdown syntax and code blocks.

**Solution**: Developed a specialized word counter that strips code blocks and markdown syntax before counting.

```javascript
export const countWords = (text) => {
    // Remove code blocks before counting
    let cleanText = text
        .replace(/```([\s\S]*?)```/g, '')
        .replace(/`([^`]+)`/g, '');
    
    return cleanText.trim().split(/\s+/).filter(Boolean).length;
};
```

### Challenge 4: Cross-Browser Compatibility

**Problem**: Ensuring consistent behavior across different browsers, especially with module imports.

**Solution**: Used a development server (http-server; NodeJS NPM) to properly serve modules and avoid CORS issues.

## Code Quality Principles

This project adheres to several code quality principles:

1. **Single Responsibility Principle**: Each module does one thing and does it well
2. **Immutability**: Functions avoid modifying their inputs directly
3. **Defensive Programming**: Code validates inputs and handles errors gracefully
4. **Progressive Enhancement**: Core functionality works even if some features aren't available
5. **Accessibility**: ARIA attributes and semantic HTML ensure accessibility
6. **Performance Optimization**: Efficient DOM operations and event handling

## Requirements

Modern browsers block JavaScript module imports (import { } from ...) when opening an HTML file directly from the filesystem (file://). This is due to CORS (Cross-Origin Resource Sharing) restrictions.

### Prerequisites

* Install [Node.js](https://nodejs.org/) (includes `npm`)

* Install `http-server` globally using:

  ```bash
  npm install -g http-server
  ```

- - -

## Getting Started

### Running the Project

1. Open a terminal and navigate to the project folder containing `index.html`:

   ```bash
   cd path/to/your/project
   ```

2. Start the local server:

   ```bash
   http-server
   ```

3. After running `http-server`, you will see output like:

   ```bash
   Starting up http-server, serving ./
   Available on:
     http://127.0.0.1:8080
     http://192.168.x.x:8080
   ```

4. Open `http://127.0.0.1:8080/index.html` OR anything else displayed in terminal in your browser. (`Ctrl + Click`)

#### Running on a Custom Port

* To use a specific port (e.g., `3000`), run:

    ```bash
    http-server -p 3000
    ```

> [!IMPORTANT]
> NOTICE: USE `http-server -c-1` TO PREVENT CACHING.

## Deployment

This project is automatically deployed to GitHub Pages on every push to the main branch using GitHub Actions.

You can view the live version at: [https://mosioc.github.io/markdown-to-html/](https://mosioc.github.io/markdown-to-html/)

## Future Enhancements

Planned features for future versions:
- Full syntax highlighting in the editor
- Support for more Markdown features (tables, checkboxes)
- Export functionality (PDF, ...)

## Regex Cheat Sheet for Reference

| Markdown Syntax           | Regex Pattern                           | Description                               |
|---------------------------|-----------------------------------------|-------------------------------------------|
| `# Heading`               | `^# (.*)$`                              | h1                         |
| `## Heading`              | `^## (.*)$`                             | h2                         |
| `### Heading`             | `^### (.*)$`                            | h3                         |
| `**bold**`                | `\*\*(.*?)\*\*`                         | bold                         |
| `*italic*`                | `\*(.*?)\*`                             | italic                       |
| `[text](url)`             | `\[(.*?)\]\((.*?)\)`                    | links                            |
| ```code```                | ```([\s\S]*?)```                 | multiline/code blocks            |
| `` `inline code` ``       | `` `([^`]+)` ``                         | inline code                      |
| `- item`                  | `^- (.*$)`                              | unordered list              |
| `1. item`                 | `^\d+\.(.*$)`                           | ordered list                |

(Formatted and corrected by GPT4o - Tested personally and used it in this project.)

## PS

Add an arbitrary key for Local Storage in a file named `config.js`:

```js
export const CONFIG = {
    STG_KEY: "Your_Key"
};
```

**OR** rename `config.example.js` file to `config.js` and put your key in `Your_Key`.
(Or if you know the basics, use .env)

And in the end: Thank You! :D
