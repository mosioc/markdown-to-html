# Markdown to HTML Editor

A responsive, browser-based Markdown editor with live HTML preview. This project implements a lightweight Markdown-to-HTML converter using pure JavaScript, with syntax highlighting, themes, and local storage functionality.

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

## Implementation Details

### Architecture

The project follows a modular JavaScript architecture with separate components handling distinct functionality:

1. **Core Converter**: Regex-based Markdown parser in the main script
2. **Theme Management**: Light/dark mode with system preference detection
3. **Storage Handling**: Persistent storage with configurable keys
4. **History Tracking**: State management for undo/redo operations
5. **Word Counter**: Text analysis with code block exclusion

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

**Solution**: Tested on a development server (http-server; using NodeJS NPM) to properly serve modules and avoid CORS issues.

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

## Future Enhancements

Planned features for future versions:
- Full syntax highlighting in the editor
- Support for more Markdown features (tables, checkboxes)
- Export functionality (HTML, PDF)

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

(Formatted and corrected by GPT4o - Tested personally.)

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
