import {isTouchScreen, isOffline} from 'utils.js';
import {handleOffline, handleOnline} from 'app.js';

let activeUrl;
export const router = ({outlet, nav, routes, onAfterRender}) => {
  const domain = location.origin;

  outlet.addEventListener('animationend', e => {
    if(e.animationName === 'fadeout') {
      const curView = outlet.querySelector('.current');
      curView.classList.add('active');
      curView.classList.remove('current');
    }
  });

  const navLinks = nav ? [...nav.querySelectorAll('a')].map(link => {
    link.dataset.href = link.href.replace(domain, '');

    return link;
  }) : [];

  const getMatchedRoute = u => routes.reduce((matched, route) => {
    const url = new URL(u);
    const parameters = route.url.match(/(:([a-z]+))/g);
    const routeUrl = parameters ? route.url.replace(/(:[a-z]+)/g, '(.+)') : route.url;
    const routeParams = parameters ? parameters.map(param => param.substr(1)) : [];
    const routeRegex = new RegExp(`^${routeUrl}\/?$`);
    const result = routeRegex.exec(url.pathname);
    const query = url.search;

    if(result) {
      const paramValues = result.slice(1).map(param => param.split('?').shift());

      route.params = routeParams.reduce((acc, key, index) => {
        acc[key] = paramValues[index];
        return acc;
      }, {});

      if(url.search.length) {
        url.searchParams.forEach((value, key) => route.params[key] = value);
      }

      return Object.assign({}, route, {url: result[0]});
    }
    return matched;
  });

  const supportsViewTransitions = 'startViewTransition' in document;
  const supportsNavigationAPI = 'navigation' in window;

  document.addEventListener('visibilitychange', () => {
    if(document.visibilityState === 'hidden' && isTouchScreen()) {
      const activeView = document.querySelector('.view.active');

      const activeUrl = activeView ? activeView.dataset.view : null;

      if(activeUrl) {
        const activeRoute = routes.find(route => route.url === activeUrl);

        if(activeRoute.onExit && 'exitOnHidden' in activeRoute && activeRoute.exitOnHidden) {
          activeRoute.onExit();
        }
      }
    }
  });

  window.addEventListener('pagehide', () => {
    console.log('pagehide');
    const activeView = document.querySelector('.view.active');

    const activeUrl = activeView ? activeView.dataset.view : null;

    if(activeUrl) {
      const activeRoute = routes.find(route => route.url === activeUrl);

      if(activeRoute.onExit && 'exitOnHidden' in activeRoute && activeRoute.exitOnHidden) {
        activeRoute.onExit();
      }
    }
  })

  const hasView = url => outlet.querySelector(`div[data-view="${url}"]`) !== null;

  const addView = (url, template, reload = false) => {
    const container = document.createElement('div');
    container.insertAdjacentHTML('beforeend', template);
    const view = container.querySelector('.view');

    view.dataset.view = url;
    view.classList.add('active');

    if(reload) {
      view.classList.remove('next-screen');
    }

    if(url === '/') {
      view.classList.add('prev-screen');
    }

    const position = url === 'default.htm' ? 'afterbegin' : 'beforeend';
    outlet.insertAdjacentElement('beforeend', view);
  };

  const renderTemplate = async ({matchedRoute, reload, UATransition}) => {
    const {template, url} = matchedRoute;
    const backNavigation = url === 'default.htm' && !reload;

    if(supportsViewTransitions) {
      if(backNavigation && !UATransition) {
        document.documentElement.classList.add('back-transition');
      }

      if(reload) {
        document.documentElement.classList.add('reload-transition');
      }
      const updatePage = () => {
        // makes sure new page is scrolled to top on forward navigation
        if(!backNavigation) {
          window.scrollTo(0, 0);
        }
        outlet.innerHTML = template;
        const view = outlet.querySelector('.view');

        if(view) {
          view.dataset.view = matchedRoute.url;
        }

      };
      const updatePageWithUATransition = () => {
        updatePage();

        return {
          finished: Promise.resolve()
        }
      }
      const transition = UATransition ? updatePageWithUATransition() : document.startViewTransition(updatePage);

      try {
        await transition.finished;

        if(matchedRoute.controller) {
          const {controller} = await import(matchedRoute.controller);
          controller(matchedRoute.params);
        }
      }
      finally {
        document.documentElement.classList.remove('back-transition', 'reload-transition');

        if('onLine' in navigator) {
          if(navigator.onLine) {
            handleOnline();
          }
          else {
            handleOffline();
          }
        }
      }
    }
    else {
      if(outlet.querySelector('[data-shell-content]')) {
        outlet.querySelectorAll('[data-shell-content]').forEach(el => el.remove());
      }

      if(!hasView(url)) {
        addView(url, template, reload);
      }

      const prevView = outlet.querySelector('.view.active');
      const nextView = outlet.querySelector(`div[data-view="${url}"]`);

      setTimeout(async () => {
        if(prevView === nextView) {
          prevView.classList.remove('next-screen');
        }
        else {
          const prevViewClass = nextView.classList.contains('next-screen') ? 'prev-screen' : 'next-screen';
          const nextViewClass = nextView.classList.contains('prev-screen') ? 'current' : 'active';
          prevView.classList.remove('active');
          prevView.classList.add(prevViewClass);
          nextView.classList.add(nextViewClass);
          nextView.classList.remove(prevViewClass === 'next-screen' ? 'prev-screen' : 'next-screen');

          if(matchedRoute.controller) {
            const {controller} = await import(matchedRoute.controller);
            controller(matchedRoute.params);
          }
          if(onAfterRender && typeof onAfterRender === 'function') {
            onAfterRender();
          }
        }
      }, 10);
    }
  };

  const setActiveLink = url => {
    activeUrl = url;

    navLinks.forEach(link => {
      if(link.dataset.href === 'default.htm' && link.dataset.href === url || link.dataset.href !== 'default.htm' && url.indexOf(link.dataset.href) === 0) {
        link.classList.add('active');
      }
      else {
        link.classList.remove('active');
      }
    });
  };

  const activateRoute = async ({matchedRoute, reload = false, UATransition = false}) => {
    renderTemplate({matchedRoute, reload, UATransition});
    setActiveLink(matchedRoute.url);

    // if(route.controller) {
    //   const {controller} = await import(route.controller);
    //
    //   controller(route.params);
    // }

    document.querySelector('meta[property="og:url"]').setAttribute('content', location.href);

    if(matchedRoute.title) {
      document.querySelector('meta[name="app-title"]').setAttribute('content', matchedRoute.title);
    }
  };

  const matchRoute = async ({url, reload = false, UATransition = false}) => {
    const matchedRoute = getMatchedRoute((url));

    if(matchedRoute) {
      const {template} = matchedRoute.template.includes('<') ? matchedRoute : await import(matchedRoute.template);

      matchedRoute.template = template;

      const state = {template, url};

      if(!reload) {
        history.pushState(state, null, url);
      }

      const activeView = document.querySelector('.view.active');

      const activeUrl = activeView ? activeView.dataset.view : null;

      if(activeUrl) {
        const activeRoute = routes.find(route => route.url === activeUrl);

        if(activeRoute.onExit) {
          activeRoute.onExit();
        }
      }

      activateRoute({matchedRoute, reload, UATransition});
    }
  };

  const isInternalLink = el => el.href && (
    (el.href.includes(domain) && !el.href.endsWith('.usdz')) && !el.href.replace(location.href, '').startsWith('#') 
  );
  const isBackLink = el => el.classList && el.classList.contains('back');

  const handleClick = e => {
    const path = e.composedPath();
    const backLink = path.find(isBackLink);
    const internalLink = path.find(isInternalLink);
    const openInSameTab = !e.ctrlKey && !e.metaKey;

    if(backLink) {
      history.back();
    }
    else {
      if(internalLink && openInSameTab) {
        e.preventDefault();

        matchRoute({url: internalLink.href});

        return false;
      }
      else if(!internalLink && isOffline()) {
        e.preventDefault();
      }
    }
  };

  if(supportsViewTransitions && supportsNavigationAPI) {
    const isBackNavigation = (e) => {
      const {navigationType, destination} = e;
      if (navigationType === 'push' || navigationType === 'replace') {
        return false;
      }
      return destination.index !== -1 &&
        destination.index < navigation.currentEntry.index;

    };

    navigation.addEventListener('navigate', e => {
      const currentRoute = getMatchedRoute(location.href);

      if(currentRoute.onExit && currentRoute.exitOnHidden) {
        currentRoute.onExit();
      }

      const event = new e.constructor(e.type, e);
      window.dispatchEvent(new CustomEvent('navigate', {detail: {event}}));

      const {url} = e.destination;
      const path = url.replace(location.href, '');
      const {navigationType} = e;

      if(url === location.href && navigationType !== 'reload') {
        e.preventDefault();
        return;
      }

      if(path.startsWith('#')) {
        return;
      }

      const backNavigation = isBackNavigation(e);

      if(backNavigation) {
        document.documentElement.classList.add('back-transition');
      }

      if(navigationType === 'reload') {
        document.documentElement.classList.add('reload-transition');
      }

      e.intercept({
        scroll: 'manual', // makes sure home page opens scrolled to top on back navigation
        async handler() {
          const matchedRoute = getMatchedRoute(url);
          if(matchedRoute) {
            document.querySelector('meta[property="og:url"]').setAttribute('content', location.href);

            if(matchedRoute.title) {
              document.querySelector('meta[name="app-title"]').setAttribute('content', matchedRoute.title);
            }

            const {template} = await import(matchedRoute.template);
            const transition = document.startViewTransition(async () => {
              // makes sure new page is scrolled to top on forward navigation
              if(!backNavigation) {
                window.scrollTo(0, 0);
              }
              outlet.innerHTML = template;
              const view = outlet.querySelector('.view');

              if(view) {
                view.dataset.view = matchedRoute.url;
              }

              if(matchedRoute.controller) {
                const {controller} = await import(matchedRoute.controller);
                controller(matchedRoute.params);
              }
            });

            try {
              await transition.finished;
            }
            finally {
              document.documentElement.classList.remove('back-transition', 'reload-transition');

              if('onLine' in navigator) {
                if(navigator.onLine) {
                  handleOnline();
                }
                else {
                  handleOffline();
                }
              }
            }
          }
        }
      });
    });

    document.body.addEventListener('click', async e => {
      const path = e.composedPath();
      const backLink = path.find(isBackLink);

      if(backLink) {
        try {
          await navigation.back().finished;
        }
        catch(e) {
          navigation.navigate('/');
        }
      }
    });

    const loadRoute = async () => {
      const matchedRoute = getMatchedRoute(location.href);

      if(matchedRoute) {
        const {template} = await import(matchedRoute.template);
        outlet.innerHTML = template;
      }
    }

    if(!document.documentElement.hasAttribute('ssg')) {
      loadRoute();
    }
    document.documentElement.removeAttribute('ssg');
  }
  else {
    outlet.addEventListener('click', handleClick);

    // document.querySelectorAll('a')
    // .forEach(link => link.addEventListener('click', handleClick));

    window.addEventListener('popstate', e => {
      const UATransition = e.hasUAVisualTransition ?? false;

      if(e.state && e.state.url) {
        const matchedRoute = getMatchedRoute(e.state.url);
        matchedRoute.template = e.state?.template ?? matchedRoute.template;

        activateRoute({matchedRoute, UATransition});
      }
      else if(activeUrl !== `/`) {
        e.preventDefault();
        matchRoute({url: location.origin, UATransition});
      }
    });

    if(!document.documentElement.hasAttribute('ssg')) {
      matchRoute({url: location.href, reload: true});
    }
    document.documentElement.removeAttribute('ssg');

    const url = new URL(location.href);
    const activeView = document.querySelector(`div[data-view="${url.pathname}"]`);
    const nextView = document.querySelector(`.next-screen`);

    if(activeView) {
      activeView.classList.add('active');
    }
    if(nextView) {
      nextView.classList.replace('next-screen', 'active');
    }
  }
};

// https://stackoverflow.com/questions/19662434/in-ios-7-safari-how-do-you-differentiate-popstate-events-via-edge-swipe-vs-the
