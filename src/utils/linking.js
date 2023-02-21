import {prefixes} from '../constants';

const getQuery = (screens, params) => {
  const [screen, ...other] = screens;
  if (screen && !other.length) {
    return {
      screen,
      params,
      initial: false,
    };
  }
  return getQuery(other, {
    screen,
    params,
    initial: false,
  });
};

const getQueryParams = (query) => {
  if (query) {
    return query
        .split('&')
        .filter(Boolean)
        .reduce((acc, item) => {
          const [key, value] = item.split('=');
          return {
            ...acc,
            ...(key && value ? {[key]: value} : {}),
          };
        }, {});
  }
  return {};
};

const sanitizeUrl = (url) => {
  if (url) {
    let route = '';
    prefixes.forEach((item) => {
      if (url.startsWith(item)) {
        route = url.replace(item, '');
      }
    });
    if (route.startsWith('/app/')) {
      route = route.replace('/app/', '');
    }
    if (route.startsWith('/app')) {
      route = route.replace('/app', '');
    }
    if (route.startsWith('app/')) {
      route = route.replace('app/', '');
    }
    const [path = '', query = ''] = route.split('?');
    return [path, getQueryParams(query)];
  }
  return ['', {}];
};

export const parseLinkingUrl = (url) => {
  const [path, query] = sanitizeUrl(url);
  if (path) {
    const [source = '', ...screens] = path.split('/').filter(Boolean);
    return {
      screen: source,
      params: screens.length ? getQuery(screens.reverse(), query) : query
    };
  }
  return null;
};
