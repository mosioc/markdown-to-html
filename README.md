# markdown-to-html
Markdown to HTML using pure JS





### Regex Cheat Sheet for Reference 
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

(Formatted and Corrected by GPT4o - Tested)

--- 
..
..
..
..
..
..
..
..
### PS 

Add an arbitrary key for Local Storage in a file named `config.js`: 
```js 
const CONFIG = {
    STG_KEY: "Your_Key"
};

export default CONFIG; 
```
**OR** rename `config.example.js` file to `config.js` and put your key in `Your_Key`. 