export const isLoggedSelector = (state) => state.auth;
export const advertsSelector = (state) => state.adverts;
export const advertSelector = (state, advertId) => state.adverts.find(advert => advert.id === advertId)
export const uiSelector = (state) => state.ui;
