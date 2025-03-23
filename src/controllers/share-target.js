export const controller = () => {
  const {searchParams} = new URL(location.href);
  const title = searchParams.get('title');
  const text = searchParams.get('text');
  const url = searchParams.get('link');

  document.querySelector('#shared-content').innerHTML = `
    <h3 id="title">${title}</h3>
    <p id="text">${text}</p>
    <p id="url">${url}</p>
  `;
}
