export const countWords = (text) => {
    if (!text || text.trim() === '') return 0;

    // removing multiline code /code blocks + inline code
    let cleanText = text
        .replace(/```([\s\S]*?)```/g, '') 
        .replace(/`([^`]+)`/g, '');      
        
        
    console.info('cleanText', cleanText);

    // count words 
    return cleanText.trim().split(/\s+/).filter(Boolean).length;
};

export const updateWordCount = (text, element) => {
    element.textContent = `Words: ${countWords(text)}`;
};