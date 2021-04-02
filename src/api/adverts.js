import client from './client';

const advertsPath = '/api/v1/adverts';

const castToFormData = ({ name, sale, price, tags, photo }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('sale', sale);
  formData.append('price', price);
  tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
  if (photo) formData.append('photo', photo);
  return formData;
};

export const getTags = () => {
  return client.get(`${advertsPath}/tags`);
};

export const createAdvert = newAdvert => {
  return client.post(advertsPath, castToFormData(newAdvert));
};
