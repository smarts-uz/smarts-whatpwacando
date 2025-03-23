import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-radiobutton-group.js';
import '_40dannymoerkerke/material-webcomponents/src/material-radiobutton.js';
import 'src/elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="view-transitions-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>View Transitions</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The View Transitions API enables app-like transitions between pages that can be defined using only CSS animations 
      and transitions.
    </p>
    
    <p>
      A transition can be defined for the whole view or separate HTML elements on the page. By default, a cross-fade 
      animation is applied if the transition is not customized with CSS. If an element is present in both views but has 
      a different position or different dimensions in the views this will also be animated by the browser automatically.
    </p>
    
    <p>
      On a supporting device, choose a transition type and then navigate to another page to see the transition.
    </p>
    
    <material-radiobutton-group name="transition-type">
      <material-radiobutton name="transition-type" slot="radio" label="Slide" value="slide"></material-radiobutton>
      <material-radiobutton name="transition-type" slot="radio" label="Cross-fade" value="cross-fade"></material-radiobutton>
      <material-radiobutton name="transition-type" slot="radio" label="Flip" value="flip"></material-radiobutton>
      <material-radiobutton name="transition-type" slot="radio" label="Scale" value="scale"></material-radiobutton>
      <material-radiobutton name="transition-type" slot="radio" label="Scale & slide" value="scale-slide"></material-radiobutton>
      <material-radiobutton name="transition-type" slot="radio" label="Enlarging icons" value="icon-enlarge"></material-radiobutton>
    </material-radiobutton-group>
  
    <code-snippet>
      <span lang="js">
// wrapping the function that updates the DOM in document.startViewTransition will animate the change 
document.startViewTransition(() => updateDOM());
      </span>
      <span lang="css">
/* here we customize the transition, these are the shared styles for the old and new view*/      
::view-transition-new(root),
::view-transition-old(root) {
  animation-duration: 300ms;
  animation-timing-function: ease-out;
  animation-direction: normal;
}

/* old view slides out to the left */
::view-transition-old(root) {
  animation-name: slide-out;
}

/* new view slides in from the right */
::view-transition-new(root) {
  animation-name: slide-in;
  mix-blend-mode: normal;
}

/* class "back-transition" is added to the html element 
 * to customize the back transition 
 * new view
 */
.back-transition::view-transition-new(root) {
  animation-name: slide-out-reverse;
}

/* customized back transition for old view */
.back-transition::view-transition-old(root) {
  animation-name: slide-in-reverse;
  mix-blend-mode: normal;
  z-index: 1;
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-20%);
  }
}

@keyframes slide-out-reverse {
  from {
    transform: translateX(-20%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-in-reverse {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}      
      </span>
    
    </code-snippet>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API" target="_blank" rel="noopener">
          View Transitions API on MDN
        </a>
      </p>
      
      <h3>Browser support</h3>
      <a href="../https@caniuse.com/@search=View%20Transition%20API" target="_blank" rel="noopener">
        View Transitions API on caniuse.com
      </a>
    </section>
  </div>
</div>
`;

