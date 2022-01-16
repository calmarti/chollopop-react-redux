export const isLoggedSelector = (state) => state.auth;
export const advertsSelector = (state) => state.adverts.data;
export const loadedSelector = (state) => state.adverts.loaded;
export const advertSelector = (state, advertId) => state.adverts.data.find(advert => advert.id === advertId)
export const uiSelector = (state) => state.ui;
