import beautify from 'js-beautify';
import hljs from 'highlight.js/lib/core';
import languageXML from 'highlight.js/lib/languages/xml';
import languageJavaScript from 'highlight.js/lib/languages/javascript';
import languageCSS from 'highlight.js/lib/languages/css';
import languageJSON from 'highlight.js/lib/languages/json';

const languageToBeautify = {
  html: 'html',
  xml: 'html',
  css: 'css',
  javascript: 'js',
  json: 'js'
};

const codeToBeFormatted = new Map();

// Register highlight.js languages
hljs.registerLanguage('xml', languageXML);
hljs.registerLanguage('html', languageXML);
hljs.registerLanguage('javascript', languageJavaScript);
hljs.registerLanguage('css', languageCSS);
hljs.registerLanguage('json', languageJSON);

function beautifyCode(code, language) {
  if (!beautify || !languageToBeautify[language]) return code;
  return beautify[languageToBeautify[language]](code, { indent_size: 2 });
}

function highlightCode(code, language) {
  return hljs.highlight(code, { language }).value;
}

function setupCodeBlock(textarea, language) {
  const codeBlock = document.createElement('pre');
  const highlightedCode = document.createElement('code');

  codeBlock.className = `hljs language-${language}`;
  highlightedCode.className = `language-${language}`;
  highlightedCode.innerHTML = highlightCode(textarea.value, language);
  codeBlock.appendChild(highlightedCode);

  textarea.parentNode.appendChild(codeBlock);

  // Assign this data to the textarea in the map
  codeToBeFormatted.set(textarea, {
    highlightedCode,
    language,
  });

  // Sync highlighting on input
  textarea.addEventListener('input', () => {
    highlightedCode.innerHTML = highlightCode(textarea.value, language);
  });

  // Sync scroll positions
  textarea.addEventListener('scroll', () => {
    highlightedCode.scrollTop = textarea.scrollTop;
    highlightedCode.scrollLeft = textarea.scrollLeft;
  }, { passive: true });

  // Reset scroll positions
  [textarea, highlightedCode].forEach((el) => {
    el.scrollTop = 0;
    el.scrollLeft = 0;
  });
}

// Find all the action buttons
DomObserver.observe('.btn-toolbar button[type="submit"]', (buttons) => {
  buttons.forEach((button) => {
    // When a submit button is clicked, format / beautify the code
    button.addEventListener('click', (e) => {
      codeToBeFormatted.forEach(({ highlightedCode, language }, textarea) => {
        // Beautify the code
        const formattedCode = beautifyCode(textarea.value, language);
        // Update the textarea value
        textarea.value = formattedCode;
        // Update the highlighted code
        highlightedCode.innerHTML = highlightCode(formattedCode, language);
      });
    });
  });
});

DomObserver.observe('textarea[data-language]', (textareas) => {
  textareas.forEach((textarea) => {
    let language = textarea.getAttribute('data-language');
    setupCodeBlock(textarea, language || 'html');
  });
});
