export const controller = async () => {
  const url = new URL(location.href);
  const params = url.searchParams;
  const type = params.get('type');

  const page = type.split(':/').pop();
  location.replace(page)
}


