# markdown-to-html
Markdown to HTML using pure JS


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

- To use a specific port (e.g., `3000`), run:

    ```bash 
    http-server -p 3000
    ```

> [!IMPORTANT] 
> NOTICE: USE `http-server -c-1` TO PREVENT CACHING. 

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

--- 
..
..
..
..
..
..
..
..
## PS 

Add an arbitrary key for Local Storage in a file named `config.js`: 
```js 
export const CONFIG = {
    STG_KEY: "Your_Key"
};

```
**OR** rename `config.example.js` file to `config.js` and put your key in `Your_Key`. 
(Or if you know the basics, use .env)