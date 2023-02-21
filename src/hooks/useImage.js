import {mapIcon} from '../utils';

export const useImage = (name, uri) => {
  const source = mapIcon(name);
  if (source) {
    return source;
  }
  return {uri};
};
