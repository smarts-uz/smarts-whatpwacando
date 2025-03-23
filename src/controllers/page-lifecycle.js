export const controller = () => {
  const getState = () => {
    return document.visibilityState === 'hidden' ? 'hidden' :
      document.hasFocus() ? 'active' : 'passive';
  };

  const logOutput = document.querySelector('.log');

  const log = msg => logOutput.insertAdjacentHTML('beforeend', `<p>${msg}</p>`);
  // Stores the initial state using the `getState()` function (defined above).
  let state = getState();

  // Accepts a next state and, if there's been a state change, logs the
  // change to the console. It also updates the `state` value defined above.
  const logStateChange = (nextState, type) => {
    const prevState = state;

    if(nextState !== prevState) {
      const msg = `[${type}] State change: ${prevState} >>> ${nextState}`;
      console.log(msg);
      log(msg);
      // log(`discarded: ${document.wasDiscarded}`)
      state = nextState;
    }
  };

  // These lifecycle events can all use the same listener to observe state
  // changes (they call the `getState()` function to determine the next state).
  ['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach((type) => {
    window.addEventListener(type, () => logStateChange(getState(), type), {capture: true});
  });

  document.addEventListener('visibilitychange', () => logStateChange(getState(), 'visibilitychange'), {capture: true});

  // The next two listeners, on the other hand, can determine the next
  // state from the event itself.
  window.addEventListener('freeze', () => {
    // In the freeze event, the next state is always frozen.
    logStateChange('frozen');
  }, {capture: true});

  window.addEventListener('pagehide', (event) => {
    if(event.persisted) {
      // If the event's persisted property is `true` the page is about
      // to enter the page navigation cache, which is also in the frozen state.
      logStateChange('frozen');
    }
    else {
      // If the event's persisted property is not `true` the page is
      // about to be unloaded.
      logStateChange('terminated');
    }
  }, {capture: true});
}
