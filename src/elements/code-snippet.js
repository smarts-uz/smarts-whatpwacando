export class CodeSnippet extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../src/css/prism.css">
      
      <style>
        :host {
          display: block;
        }
        
        summary {
          font-size: var(--h3-font-size);
          margin-bottom: 0.7em;
          font-weight: bold;
        }
        
        details pre {
          overflow-x: scroll;
        }
        
        #container {
          position: relative;
          margin-top: 1.5em;
        }
        
        .copy-code {
          position: absolute;
          top: 0;
          right: 0;
          --button-color: transparent;
        }
        
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
      </style>
            
      <div id="container">
        <material-button class="copy-code">
          <i class="material-icons" slot="left-icon">content_copy</i>
        </material-button>
        
        <details open>
          <summary>Code</summary>
          
        </details>
      </div>
    `;
  }

  connectedCallback() {
    this.details = this.shadowRoot.querySelector('details');

    const lang = this.getAttribute('lang');
    const subBlocks = this.querySelectorAll('[lang]');

    if(subBlocks.length) {
      subBlocks.forEach(block => {
        const code = block.textContent;
        const lang = block.getAttribute('lang');

        this.addCodeBlock(code, lang);
      })
    }
    else {
      this.addCodeBlock(this.textContent, lang);
    }

    const copyCode = this.shadowRoot.querySelector('.copy-code');

    copyCode.addEventListener('click', async () => {
      const code = [...this.details.querySelectorAll('code')].reduce((acc, item) => {
        return `${acc}${item.textContent}`;
      }, ``);

      try {
        await navigator.clipboard.writeText(code);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });

    const toggleCopyButton = () => copyCode.style.display = this.details.open ? 'block' : 'none';

    this.details.addEventListener('toggle', toggleCopyButton);

    toggleCopyButton();

    Prism.highlightAllUnder(this.shadowRoot);
  }

  addCodeBlock(code, lang) {
    this.details.insertAdjacentHTML('beforeend', `<pre class="language-${lang}"><code class="language-${lang}"></code></pre>`);

    const codeBlock = this.details.querySelector('pre:last-of-type > code');

    codeBlock.textContent = code;
  }
}

customElements.define('code-snippet', CodeSnippet);
