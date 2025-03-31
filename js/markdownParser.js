/**
 * Converts markdown text to HTML
 * @param {string} inputMarkdown - The markdown text to convert
 * @returns {string} The converted HTML
 */
export function markdownToHTML(inputMarkdown) {
    if (!inputMarkdown) return "";
    
    let html = inputMarkdown;
    
    // Headings (h1, h2, h3)
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    // Italic text
    html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Code blocks with language detection for syntax highlighting
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
        if (lang) {
            return `<pre><code class="language-${lang}">${code}</code></pre>`;
        }
        return `<pre><code>${code}</code></pre>`;
    });
    
    // Fallback for code blocks without language specification
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Unordered list
    html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
    
    // Ordered list
    html = html.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n)+/g, function (match) {
        // convert to <ol> if its not in <ul>
        if (!match.startsWith('<ul>')) {
            return '<ol>' + match + '</ol>';
        }
        return match;
    });
    
    return html;
}