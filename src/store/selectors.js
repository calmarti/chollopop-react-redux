export const isLoggedSelector = (state) => state.auth;
export const loadAdvertsSelector = (state) => state.adverts.data;
export const loadedSelector = (state) => state.adverts.loaded;
export const loadAdvertSelector = (state, advertId) =>
  state.adverts.data.find((advert) => advert.id === advertId);
  
export const deleteAdvertSelector = (state, advertId) =>
  state.adverts.data.filter((advert) => advert.id !== advertId);

export const uiSelector = (state) => state.ui;
