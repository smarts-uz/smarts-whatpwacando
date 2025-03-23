export const template = `
  </section>

      <footer id="main-footer">
        <section class="content">
          <a href="default.htm">
            <i class="material-icons" translate="no">home</i>
            <span>Home</span>
          </a>
          <a href="audit">
            <i class="material-icons" translate="no">task</i>
            <span>Audit</span>
          </a>
          <a href="email-list">
            <i class="material-icons" translate="no">email</i>
            <span>Email list</span>
          </a>
          <a href="../https@github.com/DannyMoerkerke/whatpwacando.today" target="_blank">
            <li class="ion-social-github" data-pack="social" data-tags="connect"></li>
            <span>Bugs</span>
          </a>
          <a>
            <i class="material-icons" translate="no" id="reload">refresh</i>
            <span>Reload</span>
          </a>
        </section>
      </footer>
    </main>

    <dialog id="install-dialog">
      <section>
        <header>
          <img src="src/img/pwalogo.webp">
          <div class="heading">
            <span>What PWA Can Do Today</span>
            <span>A showcase of what is possible with Progressive Web Apps today</span>
          </div>
          <div class="close">
            <button type="button" id="close-install-dialog">
              <img src="src/img/install/close.svg">
            </button>
          </div>
        </header>

        <div class="screenshots">
          <div class="back">
            <button type="button" id="back-button">
              <img src="src/img/install/arrow-forward.svg">
            </button>
          </div>
          <div class="scroll-div">
            <div>
              <img src="src/img/screenshots/shot1.png" class="narrow">
              <img src="src/img/screenshots/shot2.png" class="narrow">
              <img src="src/img/screenshots/shot3.png" class="narrow">
              <img src="src/img/screenshots/shot4.png" class="narrow">
              <img src="src/img/screenshots/shot5.png" class="narrow">
              <img src="src/img/screenshots/shot6.png" class="narrow">
              <img src="src/img/screenshots/shot7.png" class="wide">
              <img src="src/img/screenshots/shot8.png" class="wide">
            </div>
          </div>
          <div class="forward">
            <button type="button" id="forward-button">
              <img src="src/img/install/arrow-forward.svg">
            </button>
          </div>
        </div>
      </section>
    </dialog>

    <dialog id="sensor-dialog">
      <section>

        <footer>
          <material-button id="close-sensor-dialog" label="Close"></material-button>
        </footer>
      </section>
    </dialog>


    <dialog id="geolocation-dialog">
      <section>

        <footer>
          <material-button id="close-geolocation-dialog" label="Close" raised></material-button>
        </footer>
      </section>
    </dialog>

    <script type="module" src="app.js"></script>
    <script src="sw-registration.js"></script>
    <script src="src/lib/prism.js"></script>
    
    <!--[script]-->
  </body>
</html>
`;
