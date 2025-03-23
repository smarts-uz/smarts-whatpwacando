export class SpeechSynthesis extends HTMLElement {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;  /* Preferred icon size */
          display: inline-block;
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
  
          /* Support for all WebKit browsers. */
          -webkit-font-smoothing: antialiased;
          /* Support for Safari and Chrome. */
          text-rendering: optimizeLegibility;
  
          /* Support for Firefox. */
          -moz-osx-font-smoothing: grayscale;
  
          /* Support for IE. */
          font-feature-settings: 'liga';
        }
        select {
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #a0a0a0;
          border-radius: 5px;
          font-size: 1em;
          background-color: var(--main-background);
          color: var(--base-font-color);
          outline: none;
          width: 100%;
        }
        material-button {
          --font-color: var(--base-font-color);
          --button-color: var(--base-3);
        }
        material-textfield {
          --margin: 2rem 0 1.3rem 0;
        }
        .label {
          margin: 0 0 5px 0;
        }
      </style>
            
      <material-textfield 
      type="text" 
      label="Text" 
      id="text"
      value="This is a demo of Web Speech Synthesis"></material-textfield>
      
      <p class="label">Choose a language</p>     
      <select id="language-select"></select>
      
      <p class="label">Choose a voice</p>     
      <select id="voices"></select>
       
      <material-button id="speak" label="Speak" raised></material-button>
    `;
  }

  connectedCallback() {
    this.synth = speechSynthesis;
    this.language = 'en';

    const text = this.shadowRoot.querySelector('#text');
    const voicesSelect = this.shadowRoot.querySelector('#voices');
    const languageSelect = this.shadowRoot.querySelector('#language-select');
    const speakButton = this.shadowRoot.querySelector('#speak');

    speakButton.addEventListener('click', () => {
      this.speak(text.value);
    });


    const id = setInterval(() => {
      if(this.voices.length) {
        clearInterval(id);

        this.voice = this.voices[0].voiceURI;
        languageSelect.innerHTML = this.languageList;
        voicesSelect.innerHTML = this.voicesList;

        voicesSelect.addEventListener('change', (e) => {
          this.voice = e.target.selectedOptions[0].value;
        });

        languageSelect.addEventListener('change', (e) => {
          this.language = e.target.selectedOptions[0].value;
          voicesSelect.innerHTML = this.voicesList;
        });
      }
    }, 200);
  }

  attributeChangedCallback(attr, oldVal, newVal) {

  }

  set voice(id) {
    this._voice = this.voices.find(({voiceURI}) => voiceURI === id);
  }

  get voices() {
    return this.synth.getVoices().filter(({lang}) => lang.includes(this.language));
  }

  get voicesList() {
    return this.voices.reduce((acc, {voiceURI, name}) => `${acc}<option value="${voiceURI}" ${voiceURI === this._voice.voiceURI ? `selected` : ``}>${name}</option>`,
      `<option>-- pick a voice --</option>`);
  }

  get languages() {
    const separator = this.synth.getVoices()[0].lang.includes('-') ? '-' : '_';
    return [...new Set(this.synth.getVoices().map(({lang}) => lang.split(separator).shift()))].sort();
  }

  get languageList() {
    return this.languages.reduce((acc, lang) => `${acc}<option value="${lang}" ${lang === this.language ? `selected` : ``}>${lang}</option>`,
      `<option>-- pick a language --</option>`);
  }

  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this._voice;
    utterance.lang = this.language;

    this.synth.speak(utterance);
  }
}

customElements.define('speech-synthesis', SpeechSynthesis);
