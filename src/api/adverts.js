import client from './client';

const advertsPath = '/api/v1/adverts';

const castToFormData = ({ name, sale, price, tags, photo }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('sale', sale);
  formData.append('price', price);
  formData.append('tags', tags);
  if (photo) formData.append('photo', photo);
  return formData;
};

const mapAdvert = ({ photo, ...advert }) => ({
  ...advert,
  photo: photo ? `${process.env.REACT_APP_API_BASE_URL}${photo}` : photo,
});

export const getTags = () => {
  return client.get(`${advertsPath}/tags`);
};

export const getAdverts = () => {
  return client.get(`${advertsPath}`);
};

export const getAdvert = advertId => {
  return client.get(`${advertsPath}/${advertId}`).then(mapAdvert);
};

export const deleteAdvert = advertId => {
  return client.delete(`${advertsPath}/${advertId}`);
};

export const createAdvert = newAdvert => {
  return client.post(advertsPath, castToFormData(newAdvert));
};
