export const controller = () => {
  const supported = document.createElement('a').relList.supports('ar');

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
    document.querySelector('a[rel="ar"]').classList.add('disabled');
  }
  document.querySelector('.image-model').addEventListener('load', () => {
    document.querySelector('#ar-loader').style.display = 'none';
  });
}
