export const controller = async () => {
  const supported = 'startViewTransition' in document;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  let currentTransition = document.documentElement.dataset.transition || 'slide';
  const notOnDesktop = ['slide', 'flip'];
  if(matchMedia('screen and (min-width: 1024px)').matches && notOnDesktop.includes(currentTransition)) {
    document.documentElement.dataset.transition ='cross-fade';
    currentTransition = 'cross-fade';
  }

  const transitionType = document.querySelector('[name="transition-type"]');
  const currentRadio = document.querySelector(`material-radiobutton[value="${currentTransition}"]`);

  if(!supported) {
    transitionType.setAttribute('disabled', '');
  }

  if(currentRadio) {
    currentRadio.checked = true;
  }

  transitionType.addEventListener('change', ({detail}) => {
    const {value} = detail;
    document.documentElement.dataset.transition = value;
  });
}
