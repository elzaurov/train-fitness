import {storage} from '../config';

export default async (url) => {
  const uri = await storage
    .refFromURL(url)
    .getDownloadURL()
    .catch((error) => {
      console.error(error);
    });

  return uri;
};
