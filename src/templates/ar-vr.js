import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-loader.js';
import 'src/elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="ar-vr-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Augmented reality</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
  
    <p>
      Augmented reality enables apps to place virtual objects in reality. On a supporting device, tap the image below, 
      after which the camera will open and place the robot in the view.
    </p>
    
    
    <div id="ar-container">
      <material-loader size="64" id="ar-loader"></material-loader>
      <a href="src/img/robot_walk_idle.usdz" rel="ar">
        <img class="image-model" src="src/img/robot.webp" 
            alt="Robot" data-hires-status="pending">
      </a>
    </div>
    
    <code-snippet>
      <span lang="html">
&lt;a href="src/img/robot_walk_idle.usdz" rel="ar"&gt;
  &lt;img class="image-model" src="src/img/robot.webp" 
      alt="Robot" data-hires-status="pending"&gt;
&lt;/a&gt;
      </span>
      
      <span lang="js">
document.querySelector('.image-model').addEventListener('load', () => {
  document.querySelector('#ar-loader').style.display = 'none';
});
      </span>
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@webkit.org/blog/8421/viewing-augmented-reality-assets-in-safari-for-ios/default.htm" target="_blank" rel="noopener">
        Viewing augmented reality assets on webkit.org
      </a>
      
      <h3>Browser support</h3>
      <p>
        Augmented reality is available in Safari on iOS12+.
      </p>
    </section>
  </div>
</div>
`;
