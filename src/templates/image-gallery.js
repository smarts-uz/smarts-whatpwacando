import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'lib/image-gallery.js';

export const template = `
<div class="view next-screen" id="image-gallery-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Image gallery</h2>
    
    <p>When this page is captured for screen sharing, the gallery below can be controlled by the capturing application.</p>
    <p>The benefit of this is that the user doesn't need to switch from the capturing application to this page to control 
    the gallery.</p>
    <p>This is especially useful when sharing a presentation. The presentation can then be controlled from the 
    capturing application so the presenter doesn't need to switch between this application and the presentation.</p>
    <image-gallery thumbs>
      <img src="src/img/gallery/IMG_0791.webp" slot="image">
      <img src="src/img/gallery/IMG_0829.webp" slot="image">
      <img src="src/img/gallery/IMG_0848.webp" slot="image">
      <img src="src/img/gallery/IMG_0860.webp" slot="image">
      <img src="src/img/gallery/IMG_0924.webp" slot="image">
      <img src="src/img/gallery/IMG_0927.webp" slot="image">
      <img src="src/img/gallery/IMG_0955.webp" slot="image">
    </image-gallery>

  </div>
</div>
`;
